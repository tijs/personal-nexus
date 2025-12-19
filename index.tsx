import React from "https://esm.sh/react@18";
import { renderToString } from "https://esm.sh/react-dom@18/server";
import { App } from "./App.tsx";
import { AtpAgent } from "npm:@atproto/api@0.12.29";

interface Post {
  id: string;
  title: string;
  content_html: string;
  url: string;
  date_modified: string;
  summary?: string;
}

interface Book {
  uri: string;
  cid: string;
  value: {
    $type: "buzz.bookhive.book";
    title: string;
    authors?: string;
    hiveId: string;
    status: string;
    cover?: {
      $type: "blob";
      ref: {
        $link: string;
      };
      mimeType: string;
      size: number;
    };
    createdAt: string;
  };
}

// New geo structure (coordinates as strings for DAG-CBOR compliance)
interface Geo {
  latitude: string;
  longitude: string;
  altitude?: string;
  name?: string;
}

// New embedded address structure
interface AddressEmbedded {
  country: string; // Required
  name?: string;
  street?: string;
  locality?: string;
  region?: string;
  postalCode?: string;
}

// Legacy address record (for backward compatibility)
interface AddressRecord {
  uri: string;
  cid: string;
  value: {
    name: string;
    $type: "community.lexicon.location.address";
    region: string;
    country: string;
    locality: string;
    postalCode?: string;
  };
}

// Updated Checkin interface with both old and new format support
interface Checkin {
  uri: string;
  cid: string;
  value: {
    text: string;
    $type: "app.dropanchor.checkin";
    category?: string;
    createdAt: string;
    categoryIcon?: string;
    categoryGroup?: string;

    // NEW format (embedded)
    address?: AddressEmbedded;
    geo?: Geo;

    // OLD format (StrongRef) - for backward compatibility
    addressRef?: {
      cid: string;
      uri: string;
    };
    coordinates?: {
      latitude: number;
      longitude: number;
    };

    image?: {
      alt?: string;
      thumb: {
        $type: "blob";
        ref: {
          $link: string;
        };
        mimeType: string;
        size: number;
      };
      fullsize: {
        $type: "blob";
        ref: {
          $link: string;
        };
        mimeType: string;
        size: number;
      };
    };
  };
}

// Unified structure for display
interface CheckinWithAddress {
  checkin: Checkin;
  address: AddressEmbedded; // Always normalized to embedded format
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

interface JSONFeed {
  items: Post[];
}

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

async function fetchBlogPosts(): Promise<Post[]> {
  const cacheKey = "blog-posts";
  const cached = cache.get(cacheKey);

  // Check if we have cached data and it's not expired
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const feedUrl = Deno.env.get("LEAFLET_PUB_JSON") ||
      "https://tijs.leaflet.pub/json";
    console.log("Using LEAFLET_PUB_JSON:", feedUrl);

    const response = await fetch(feedUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const feed: JSONFeed = await response.json();
    // Sort posts by date_modified (most recent first) and get latest 3 posts
    const posts = feed.items
      .sort((a, b) =>
        new Date(b.date_modified).getTime() -
        new Date(a.date_modified).getTime()
      )
      .slice(0, 3);

    // Cache the results
    cache.set(cacheKey, {
      data: posts,
      timestamp: Date.now(),
    });

    return posts;
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    // Return cached data if available, even if expired
    if (cached) {
      return cached.data;
    }
    // Return empty array as fallback
    return [];
  }
}

async function resolveHandleToDID(handle: string): Promise<string> {
  const cacheKey = `did-${handle}`;
  const cached = cache.get(cacheKey);

  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    console.log(`Using cached DID for ${handle}:`, cached.data);
    return cached.data;
  }

  try {
    const url =
      `https://slingshot.microcosm.blue/xrpc/com.bad-example.identity.resolveMiniDoc?identifier=${
        encodeURIComponent(handle)
      }`;
    console.log(`Resolving DID for ${handle} via:`, url);

    const response = await fetch(url);
    if (!response.ok) {
      console.error(`DID resolution failed with status ${response.status}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const did = data.did;

    if (!did) {
      console.error("DID not found in response:", data);
      throw new Error("DID not found in response");
    }

    console.log(`Resolved DID for ${handle}:`, did);

    cache.set(cacheKey, {
      data: did,
      timestamp: Date.now(),
    });

    return did;
  } catch (error) {
    console.error("Failed to resolve DID for", handle, ":", error);
    if (cached) {
      console.log("Using stale cached DID:", cached.data);
      return cached.data;
    }
    throw error;
  }
}

async function resolvePDS(handle: string): Promise<string> {
  const cacheKey = `pds-${handle}`;
  const cached = cache.get(cacheKey);

  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    console.log(`Using cached PDS for ${handle}:`, cached.data);
    return cached.data;
  }

  try {
    const url =
      `https://slingshot.microcosm.blue/xrpc/com.bad-example.identity.resolveMiniDoc?identifier=${
        encodeURIComponent(handle)
      }`;
    console.log(`Resolving PDS for ${handle} via:`, url);

    const response = await fetch(url);
    if (!response.ok) {
      console.error(`PDS resolution failed with status ${response.status}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(
      `PDS resolution response for ${handle}:`,
      JSON.stringify(data, null, 2),
    );

    // Slingshot returns PDS directly in the pds field
    const pdsUrl = data.pds;

    if (!pdsUrl) {
      console.error(
        "PDS not found in response:",
        data,
      );
      throw new Error("PDS not found in response");
    }

    console.log(`Resolved PDS for ${handle}:`, pdsUrl);

    cache.set(cacheKey, {
      data: pdsUrl,
      timestamp: Date.now(),
    });

    return pdsUrl;
  } catch (error) {
    console.error("Failed to resolve PDS for", handle, ":", error);
    if (cached) {
      console.log("Using stale cached PDS:", cached.data);
      return cached.data;
    }
    throw error;
  }
}

async function fetchBookRecords(): Promise<{ books: Book[]; pdsUrl: string }> {
  const cacheKey = "book-records";
  const cached = cache.get(cacheKey);

  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    console.log(
      "Using cached book records:",
      cached.data.books.length,
      "books",
    );
    return cached.data;
  }

  try {
    console.log("Fetching book records...");

    const atprotoHandle = Deno.env.get("ATPROTO_HANDLE") || "tijs.org";
    console.log("Using ATPROTO_HANDLE:", atprotoHandle);

    const pdsUrl = await resolvePDS(atprotoHandle);
    console.log("Creating AtpAgent with PDS:", pdsUrl);
    const agent = new AtpAgent({ service: pdsUrl });

    console.log("Requesting book records from collection: buzz.bookhive.book");
    const response = await agent.com.atproto.repo.listRecords({
      repo: atprotoHandle.startsWith("did:")
        ? atprotoHandle
        : await resolveHandleToDID(atprotoHandle),
      collection: "buzz.bookhive.book",
      limit: 3,
    });

    console.log("Book records response:", {
      recordCount: response.data.records.length,
      cursor: response.data.cursor,
      records: response.data.records.map((r) => ({
        uri: r.uri,
        title: (r.value as any)?.title,
        status: (r.value as any)?.status,
        hasCover: !!(r.value as any)?.cover,
        coverStructure: (r.value as any)?.cover ? "present" : "missing",
        fullRecord: r.value, // Log the full record to see what we're getting
      })),
    });

    const books = response.data.records.slice(0, 3);

    cache.set(cacheKey, {
      data: { books, pdsUrl },
      timestamp: Date.now(),
    });

    console.log("Successfully cached", books.length, "book records");
    return { books, pdsUrl };
  } catch (error) {
    console.error("Failed to fetch book records:", error);
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
    if (cached) {
      console.log(
        "Using stale cached book records:",
        cached.data.books.length,
        "books",
      );
      return cached.data;
    }
    console.log("No cached data available, returning empty array");
    return { books: [], pdsUrl: "" };
  }
}

/**
 * Normalize a checkin to unified format (handles both old and new lexicon)
 */
async function normalizeCheckin(
  checkin: Checkin,
  agent: AtpAgent,
  did: string,
): Promise<CheckinWithAddress | null> {
  const value = checkin.value;

  // Extract coordinates (new format uses geo, old uses coordinates)
  let coordinates: { latitude: number; longitude: number };

  if (value.geo) {
    // NEW format: geo object with string coordinates
    coordinates = {
      latitude: typeof value.geo.latitude === "number"
        ? value.geo.latitude
        : parseFloat(value.geo.latitude),
      longitude: typeof value.geo.longitude === "number"
        ? value.geo.longitude
        : parseFloat(value.geo.longitude),
    };
  } else if (value.coordinates) {
    // OLD format: coordinates object with number coordinates
    coordinates = {
      latitude: value.coordinates.latitude,
      longitude: value.coordinates.longitude,
    };
  } else {
    console.warn("Checkin missing coordinates/geo:", checkin.uri);
    return null;
  }

  // Validate parsed coordinates
  if (isNaN(coordinates.latitude) || isNaN(coordinates.longitude)) {
    console.warn("Invalid coordinates:", checkin.uri);
    return null;
  }

  // Extract address (new format is embedded, old needs fetching)
  let address: AddressEmbedded;

  if (value.address) {
    // NEW format: embedded address object
    address = value.address;
    console.log("Using embedded address for:", checkin.uri);
  } else if (value.addressRef) {
    // OLD format: fetch address record separately
    console.log(
      "Fetching legacy address for:",
      checkin.uri,
      value.addressRef.uri,
    );

    try {
      const addressResponse = await agent.com.atproto.repo.getRecord({
        repo: did,
        collection: "community.lexicon.location.address",
        rkey: value.addressRef.uri.split("/").pop()!,
      });

      const addressRecord = addressResponse.data as AddressRecord;

      // Convert old address format to new embedded format
      address = {
        name: addressRecord.value.name,
        locality: addressRecord.value.locality,
        region: addressRecord.value.region,
        country: addressRecord.value.country,
        postalCode: addressRecord.value.postalCode,
      };

      console.log(
        "Successfully fetched legacy address:",
        addressRecord.value.name,
      );
    } catch (error) {
      console.error(
        "Failed to fetch legacy address:",
        value.addressRef.uri,
        error,
      );
      return null;
    }
  } else {
    console.warn("Checkin missing address/addressRef:", checkin.uri);
    return null;
  }

  return {
    checkin,
    address,
    coordinates,
  };
}

async function fetchCheckins(): Promise<CheckinWithAddress[]> {
  const cacheKey = "checkins";
  const cached = cache.get(cacheKey);

  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    console.log("Using cached checkins:", cached.data.length, "checkins");
    return cached.data;
  }

  try {
    console.log("Fetching checkin records...");

    const atprotoHandle = Deno.env.get("ATPROTO_HANDLE") || "tijs.org";
    const pdsUrl = await resolvePDS(atprotoHandle);
    const agent = new AtpAgent({ service: pdsUrl });

    const did = atprotoHandle.startsWith("did:")
      ? atprotoHandle
      : await resolveHandleToDID(atprotoHandle);

    console.log(
      "Requesting checkin records from collection: app.dropanchor.checkin",
    );
    const response = await agent.com.atproto.repo.listRecords({
      repo: did,
      collection: "app.dropanchor.checkin",
      limit: 3,
    });

    console.log("Checkin records response:", {
      recordCount: response.data.records.length,
      records: response.data.records.map((r) => ({
        uri: r.uri,
        text: (r.value as any)?.text,
        hasNewFormat: !!(r.value as any)?.geo && !!(r.value as any)?.address,
        hasOldFormat: !!(r.value as any)?.coordinates &&
          !!(r.value as any)?.addressRef,
      })),
    });

    const checkins = response.data.records as Checkin[];

    // Normalize checkins to unified format
    const checkinsWithAddresses: CheckinWithAddress[] = [];

    for (const checkin of checkins) {
      try {
        const normalized = await normalizeCheckin(checkin, agent, did);
        if (normalized) {
          checkinsWithAddresses.push(normalized);
        }
      } catch (error) {
        console.error(
          "Failed to normalize checkin:",
          checkin.uri,
          error,
        );
        // Skip this checkin if normalization fails
      }
    }

    cache.set(cacheKey, {
      data: checkinsWithAddresses,
      timestamp: Date.now(),
    });

    console.log(
      "Successfully cached",
      checkinsWithAddresses.length,
      "checkin records",
    );
    return checkinsWithAddresses;
  } catch (error) {
    console.error("Failed to fetch checkin records:", error);
    if (cached) {
      console.log(
        "Using stale cached checkins:",
        cached.data.length,
        "checkins",
      );
      return cached.data;
    }
    console.log("No cached data available, returning empty array");
    return [];
  }
}

export default async function handler() {
  console.log("=== Handler starting ===");
  const [posts, bookData, checkins] = await Promise.all([
    fetchBlogPosts(),
    fetchBookRecords(),
    fetchCheckins(),
  ]);

  console.log("=== FINAL HANDLER RESULTS ===");
  console.log("Posts fetched:", posts.length);
  console.log("Books fetched:", bookData.books.length);
  console.log("Checkins fetched:", checkins.length);
  console.log("PDS URL:", bookData.pdsUrl);

  if (bookData.books.length > 0) {
    console.log("First book details:", {
      title: bookData.books[0].value.title,
      status: bookData.books[0].value.status,
      hiveId: bookData.books[0].value.hiveId,
      hasCover: !!bookData.books[0].value.cover,
      coverCid: bookData.books[0].value.cover?.ref?.$link,
      uri: bookData.books[0].uri,
    });

    if (bookData.books[0].value.cover?.ref?.$link) {
      const did = bookData.books[0].uri.split("/")[2];
      const cid = bookData.books[0].value.cover.ref.$link;
      const blobUrl =
        `${bookData.pdsUrl}/xrpc/com.atproto.sync.getBlob?did=${did}&cid=${cid}`;
      console.log("Constructed blob URL:", blobUrl);
    }
  } else {
    console.log("❌ NO BOOKS FOUND");
  }

  const html = renderToString(
    <App
      posts={posts}
      books={bookData.books}
      checkins={checkins}
      pdsUrl={bookData.pdsUrl}
    />,
  );

  return new Response(
    `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tijs Teulings</title>
    <meta name="description" content="Software engineer building apps and contributing to open source">
    <meta name="author" content="Tijs Teulings">
    <link rel="icon" type="image/x-icon" href="https://github.com/tijs.png">
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Caprasimo&family=Outfit:wght@300;400;500;600;700&family=Lato:wght@400;700;900&display=swap');
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        line-height: 1.6;
        color: #6a0066;
        background: #e8d4b7;
      }
      .profile-name {
        font-family: 'Caprasimo', serif !important;
      }
      h2 {
        font-family: 'Lato', sans-serif !important;
      }
      .profile-title {
        font-family: 'Lato', sans-serif !important;
      }
    </style>
  </head>
  <body>
    ${html}
  </body>
</html>`,
    {
      headers: {
        "Content-Type": "text/html",
      },
    },
  );
}
