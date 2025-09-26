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

interface Checkin {
  uri: string;
  cid: string;
  value: {
    text: string;
    $type: "app.dropanchor.checkin";
    category: string;
    createdAt: string;
    addressRef: {
      cid: string;
      uri: string;
    };
    coordinates: {
      latitude: number;
      longitude: number;
    };
    categoryIcon: string;
    categoryGroup: string;
  };
}

interface Address {
  uri: string;
  cid: string;
  value: {
    name: string;
    $type: "community.lexicon.location.address";
    region: string;
    country: string;
    locality: string;
  };
}

interface CheckinWithAddress {
  checkin: Checkin;
  address: Address;
}

interface JSONFeed {
  items: Post[];
}

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
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
    });

    const checkins = response.data.records.slice(0, 3) as Checkin[];

    // Fetch address records for each checkin
    const checkinsWithAddresses: CheckinWithAddress[] = [];

    for (const checkin of checkins) {
      try {
        console.log(
          "Fetching address for checkin:",
          checkin.value.addressRef.uri,
        );

        const addressResponse = await agent.com.atproto.repo.getRecord({
          repo: did,
          collection: "community.lexicon.location.address",
          rkey: checkin.value.addressRef.uri.split("/").pop()!,
        });

        const address = addressResponse.data as Address;
        checkinsWithAddresses.push({ checkin, address });

        console.log("Successfully fetched address:", address.value.name);
      } catch (error) {
        console.error(
          "Failed to fetch address for checkin:",
          checkin.uri,
          error,
        );
        // Skip this checkin if address fetch fails
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

async function fetchGitHubPinnedRepos(): Promise<GitHubRepo[]> {
  const cacheKey = "github-pinned";
  const cached = cache.get(cacheKey);

  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    console.log(
      "Using cached GitHub pinned repos:",
      cached.data.length,
      "repos",
    );
    return cached.data;
  }

  try {
    console.log("Fetching GitHub pinned repositories...");

    const username = Deno.env.get("GITHUB_USERNAME");
    if (!username) {
      throw new Error("GITHUB_USERNAME environment variable is required");
    }

    console.log("Using GITHUB_USERNAME:", username);

    // Hardcoded pinned repository names (update these when you change your pinned repos)
    // These match your current pinned repositories on GitHub
    const pinnedRepoData = [
      { owner: "dropanchorapp", name: "Anchor" },
      { owner: "tijs", name: "atproto-to-fediverse" },
      { owner: "tijs", name: "oauth-client-deno" },
      { owner: "dropanchorapp", name: "location-feed-generator" },
      { owner: "tijs", name: "book-explorer" },
      { owner: "tijs", name: "hono-oauth-sessions" },
    ];

    console.log(
      "Using hardcoded pinned repo list:",
      pinnedRepoData.map((r) => `${r.owner}/${r.name}`),
    );

    // Now fetch details for each pinned repo using the GitHub API
    const pinnedRepos: GitHubRepo[] = [];

    for (const repoData of pinnedRepoData) {
      try {
        const repoResponse = await fetch(
          `https://api.github.com/repos/${repoData.owner}/${repoData.name}`,
          {
            headers: {
              "User-Agent": "tijs-org-website",
              "Accept": "application/vnd.github.v3+json",
            },
          },
        );

        if (repoResponse.ok) {
          const repo: GitHubRepo = await repoResponse.json();
          pinnedRepos.push(repo);
          console.log(`Fetched details for ${repoData.owner}/${repoData.name}`);
        } else {
          console.warn(
            `Failed to fetch details for ${repoData.owner}/${repoData.name}: ${repoResponse.status}`,
          );
        }
      } catch (error) {
        console.warn(
          `Error fetching ${repoData.owner}/${repoData.name}:`,
          error,
        );
      }
    }

    cache.set(cacheKey, {
      data: pinnedRepos,
      timestamp: Date.now(),
    });

    console.log("Successfully cached", pinnedRepos.length, "pinned repos");
    return pinnedRepos;
  } catch (error) {
    console.error("Failed to fetch GitHub pinned repos:", error);
    if (cached) {
      console.log(
        "Using stale cached pinned repos:",
        cached.data.length,
        "repos",
      );
      return cached.data;
    }
    console.log("No cached data available, returning empty array");
    return [];
  }
}

export default async function handler() {
  console.log("=== Handler starting ===");
  const [posts, bookData, checkins, pinnedRepos] = await Promise.all([
    fetchBlogPosts(),
    fetchBookRecords(),
    fetchCheckins(),
    fetchGitHubPinnedRepos(),
  ]);

  console.log("=== FINAL HANDLER RESULTS ===");
  console.log("Posts fetched:", posts.length);
  console.log("Books fetched:", bookData.books.length);
  console.log("Checkins fetched:", checkins.length);
  console.log("Pinned repos fetched:", pinnedRepos.length);
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
      starredRepos={pinnedRepos}
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
