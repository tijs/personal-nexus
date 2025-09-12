import React from "https://esm.sh/react@18";
import { renderToString } from "https://esm.sh/react-dom@18/server";
import { App } from "./App.tsx";

interface Post {
  id: string;
  title: string;
  content_html: string;
  url: string;
  date_modified: string;
  summary?: string;
}

interface JSONFeed {
  items: Post[];
}

// Simple in-memory cache
const cache = new Map<string, { data: Post[]; timestamp: number }>();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

async function fetchBlogPosts(): Promise<Post[]> {
  const cacheKey = "blog-posts";
  const cached = cache.get(cacheKey);

  // Check if we have cached data and it's not expired
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetch("https://tijs.leaflet.pub/json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const feed: JSONFeed = await response.json();
    const posts = feed.items.slice(0, 3); // Get latest 3 posts

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

export default async function handler() {
  const posts = await fetchBlogPosts();
  const html = renderToString(<App posts={posts} />);

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
