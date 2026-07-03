import React from "https://esm.sh/react@18";
import { renderToString } from "https://esm.sh/react-dom@18/server";
import { App } from "./App.tsx";
import { AtpAgent } from "npm:@atproto/api@0.12.29";
import type { Beacon } from "./types.ts";

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

interface Identity {
  did: string;
  pds: string;
}

// Resolves a handle or DID to both its DID and PDS in a single request
// (slingshot's resolveMiniDoc returns both, so callers never need two calls).
async function resolveIdentity(identifier: string): Promise<Identity> {
  const cacheKey = `identity-${identifier}`;
  const cached = cache.get(cacheKey);

  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const url =
      `https://slingshot.microcosm.blue/xrpc/com.bad-example.identity.resolveMiniDoc?identifier=${
        encodeURIComponent(identifier)
      }`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.did || !data.pds) {
      throw new Error("Incomplete identity response (missing did/pds)");
    }

    const identity: Identity = { did: data.did, pds: data.pds };
    cache.set(cacheKey, { data: identity, timestamp: Date.now() });
    return identity;
  } catch (error) {
    console.error(`Failed to resolve identity for ${identifier}:`, error);
    if (cached) {
      return cached.data;
    }
    throw error;
  }
}

async function fetchBookRecords(): Promise<{ books: Book[]; pdsUrl: string }> {
  const cacheKey = "book-records";
  const cached = cache.get(cacheKey);

  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const atprotoHandle = Deno.env.get("ATPROTO_HANDLE") || "tijs.org";
    const { did, pds: pdsUrl } = await resolveIdentity(atprotoHandle);
    const agent = new AtpAgent({ service: pdsUrl });

    const response = await agent.com.atproto.repo.listRecords({
      repo: did,
      collection: "buzz.bookhive.book",
      limit: 3,
    });

    const books = response.data.records.slice(0, 3);
    cache.set(cacheKey, { data: { books, pdsUrl }, timestamp: Date.now() });
    return { books, pdsUrl };
  } catch (error) {
    console.error("Failed to fetch book records:", error);
    if (cached) {
      return cached.data;
    }
    return { books: [], pdsUrl: "" };
  }
}

async function fetchCheckins(): Promise<Beacon[]> {
  const cacheKey = "checkins";
  const cached = cache.get(cacheKey);

  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const atprotoHandle = Deno.env.get("ATPROTO_HANDLE") || "tijs.org";
    const { did, pds: pdsUrl } = await resolveIdentity(atprotoHandle);
    const agent = new AtpAgent({ service: pdsUrl });

    const response = await agent.com.atproto.repo.listRecords({
      repo: did,
      collection: "app.beaconbits.beacon",
      limit: 3,
    });

    const beacons = response.data.records as Beacon[];
    cache.set(cacheKey, { data: beacons, timestamp: Date.now() });
    return beacons;
  } catch (error) {
    console.error("Failed to fetch beacon records:", error);
    if (cached) {
      return cached.data;
    }
    return [];
  }
}

async function handleBlobProxy(did: string, cid: string): Promise<Response> {
  try {
    const { pds: pdsUrl } = await resolveIdentity(did);
    const upstream = `${pdsUrl}/xrpc/com.atproto.sync.getBlob?did=${
      encodeURIComponent(did)
    }&cid=${encodeURIComponent(cid)}`;
    const res = await fetch(upstream);
    if (!res.ok) {
      return new Response(`upstream ${res.status}`, { status: res.status });
    }
    return new Response(res.body, {
      status: 200,
      headers: {
        "Content-Type": res.headers.get("Content-Type") ||
          "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (e) {
    console.error("blob proxy error:", e);
    return new Response("blob fetch failed", { status: 502 });
  }
}

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const blobMatch = url.pathname.match(
    /^\/blob\/(did:[^/]+)\/([^/]+)$/,
  );
  if (blobMatch) {
    return handleBlobProxy(blobMatch[1], blobMatch[2]);
  }

  // Only the homepage triggers the full render + upstream fetches.
  // Everything else (scanner probes for /wp-admin, /db.bak, /swagger.yaml,
  // etc.) gets a cheap 404 with no fetching or logging.
  if (url.pathname !== "/") {
    return new Response("Not found", { status: 404 });
  }

  const [posts, bookData, checkins] = await Promise.all([
    fetchBlogPosts(),
    fetchBookRecords(),
    fetchCheckins(),
  ]);

  const atprotoHandle = Deno.env.get("ATPROTO_HANDLE") || "tijs.org";
  const beaconBitsId = Deno.env.get("BEACONBITS_ID") ||
    "aq7owa5y7ndc2hzjz37wy7ma";

  const html = renderToString(
    <App
      posts={posts}
      books={bookData.books}
      checkins={checkins}
      handle={atprotoHandle}
      beaconBitsId={beaconBitsId}
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
        color: #2d1b33;
        background: #f5efe6;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
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
    <script src="https://rpg.actor/js/rpg-actor-widget.js"></script>
    <script>try{if(!sessionStorage.getItem("_swa")&&document.referrer.indexOf(location.protocol+"//"+location.host)!==0){fetch("https://counter.tijs.org/track?"+new URLSearchParams({site:"tijs",utcoffset:String(-(new Date().getTimezoneOffset()/60)),referrer:document.referrer,screen:screen.width+"x"+screen.height})).catch(function(){})};sessionStorage.setItem("_swa","1")}catch(e){}</script>
  </body>
</html>`,
    {
      headers: {
        "Content-Type": "text/html",
      },
    },
  );
}
