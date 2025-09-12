# Tijs.org React Website

A modern React website for tijs.org with server-side rendering, optimized for
hosting on val.town.

## Features

- 📱 **Responsive Design** - Grid layouts optimized for desktop (3 columns) and
  mobile (1 column)
- 📝 **Dynamic Blog Posts** - Fetches latest posts from Leaflet publication JSON
  feed
- 📚 **AT Protocol Integration** - Displays book updates from Bookhive via AT
  Protocol records
- ⚡ **Server-Side Rendering** - Fast initial page loads with React SSR
- 🗃️ **Smart Caching** - 1-hour server-side cache for external data sources
- 🎨 **Component-Based Architecture** - Clean, reusable React components
- 🔧 **Environment Configuration** - Configurable via environment variables

## Structure

- `index.tsx` - Main server handler with SSR, data fetching, and caching
- `App.tsx` - Root app component with global styles
- `components/` - Reusable React components:
  - `ProfileHeader.tsx` - Profile image and personal info
  - `PostsSection.tsx` - Latest blog posts with Leaflet theme
  - `BookSection.tsx` - Recent book updates with Bookhive theme
  - `AppsSection.tsx` - Personal app showcase
  - `OpenSourceSection.tsx` - GitHub project highlights
  - `ExternalLinks.tsx` - Social media and contact links

## Environment Variables

Configure these in your val.town environment:

- `ATPROTO_HANDLE` - Your AT Protocol handle for book records (default:
  "tijs.org")
- `LEAFLET_PUB_JSON` - Your Leaflet publication JSON feed URL (default:
  "https://tijs.leaflet.pub/json")

## Data Sources

- **Blog Posts**: Fetched from Leaflet publication JSON feed
- **Book Updates**: Retrieved via AT Protocol from Bookhive records
- **GitHub Projects**: Curated list with links to repositories
- **Apps**: Static showcase of personal applications

## Deployment

Uses Deno with automated deployment:

```bash
deno task deploy  # Runs lint, format, and val.town push
```

## Tech Stack

- **React 18** with server-side rendering
- **Deno** runtime environment
- **AT Protocol API** for decentralized data
- **TypeScript** for type safety
- **CSS-in-JS** for component styling
- **Val.town** for hosting and deployment

## Color Schemes

- **Main Site**: Purple/pink theme (#ff0066, #6a0066, #934790, #e8d4b7)
- **Blog Posts**: Leaflet publication colors (blue accents)
- **Book Updates**: Bookhive colors (warm cream/brown theme)

## Architecture

The site uses a hybrid approach:

- Server-side rendering for fast initial loads
- Component-level caching for external API calls
- Responsive grid layouts for optimal viewing on all devices
- Environment-based configuration for easy customization
