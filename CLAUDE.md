# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project Overview

Personal Nexus is a React SSR personal website that aggregates content from
multiple decentralized AT Protocol sources and platforms. It runs on Val.town
using Deno runtime with server-side rendering to create a unified personal hub.

## Commands

```bash
# Format code
deno fmt

# Lint code
deno lint

# Deploy to val.town (runs lint and format first)
deno task deploy
```

## Architecture

### Core Structure

- **Entry Point**: `index.tsx` - Main handler that fetches data and renders the
  React app
- **Main App**: `App.tsx` - Root React component with global styles and layout
- **Components**: `/components/` - Individual sections (ProfileHeader,
  PostsSection, etc.)

### Data Sources & Integration

The application fetches data from multiple sources in parallel:

1. **Leaflet Publication**: Blog posts via JSON feed (`fetchBlogPosts()`)
2. **AT Protocol Records**: Books and check-ins via @atproto/api
   (`fetchBookRecords()`, `fetchCheckins()`)
3. **Static Content**: Apps, open source projects, and external links

### AT Protocol Integration

- Uses `@atproto/api` AtpAgent to connect to Personal Data Servers (PDS)
- Resolves handles to DIDs and PDS URLs via Slingshot API
  (`slingshot.microcosm.blue`)
- Fetches records from collections: `buzz.bookhive.book`,
  `app.dropanchor.checkin`, `community.lexicon.location.address`
- Constructs blob URLs for book cover images from PDS

### Caching Strategy

- Simple in-memory cache with 1-hour duration (`CACHE_DURATION`)
- Caches API responses, DID/PDS resolutions, and external feed data
- Falls back to stale cache data on API failures
- Cache keys: `blog-posts`, `book-records`, `checkins`, `did-${handle}`,
  `pds-${handle}`

### Server-Side Rendering

- Uses React 18 `renderToString()` for SSR
- Inlines CSS and Google Fonts in generated HTML
- Returns complete HTML response with proper headers

## Environment Variables

- `ATPROTO_HANDLE`: Your AT Protocol handle (defaults to "tijs.org")
- `LEAFLET_PUB_JSON`: URL to your Leaflet publication JSON feed (defaults to
  "https://tijs.leaflet.pub/json")
- `GITHUB_USERNAME`: Your GitHub username for fetching pinned repositories
  (required)

## Development Notes

### Component Structure

Each component is self-contained with inline styles using CSS-in-JS. The design
uses:

- Purple/pink color scheme (#6a0066, #cc0055, #e8d4b7)
- Font stack: Caprasimo (headings), Lato (subheadings), Outfit (body)
- Responsive grid layouts (3 columns desktop, 1 mobile)
- Card-based UI with hover effects

### Error Handling

All data fetching includes comprehensive error handling with fallbacks:

- Returns cached data on API failures
- Returns empty arrays when no data available
- Logs detailed error information for debugging
- Graceful degradation for missing external services

### TypeScript Interfaces

Key interfaces defined in both `index.tsx` and `App.tsx`:

- `Post`: Blog post structure from JSON feed
- `Book`: Bookhive book record with cover blob support
- `Checkin`/`Address`: DropAnchor location data with address resolution
- `CheckinWithAddress`: Combined checkin and address data

### Val.town Deployment

Designed specifically for Val.town hosting platform with:

- Deno runtime compatibility
- ESM imports from CDNs (esm.sh, npm:)
- No Node.js dependencies
- Single-file deployment architecture
