# Personal Nexus

> A modern personal website that connects all your decentralized content in one place.  
> *Not to be confused with the Torment Nexus from classic sci-fi literature.*

**Personal Nexus** is a React SSR website that serves as a central hub for your distributed digital identity, aggregating content from multiple AT Protocol sources and platforms into a beautiful, accessible personal website.

## ✨ Features

### 🌐 **Dynamic Content Integration**
- **Blog Posts**: Latest articles from Leaflet publication via JSON feed
- **Check-ins**: Location updates from DropAnchor via AT Protocol
- **Book Updates**: Reading activity from Bookhive via AT Protocol
- **Projects**: Showcase of apps and open source contributions

### 🎨 **Modern Design**
- **Responsive Grid Layouts**: 3 columns on desktop, 1 on mobile
- **Custom Typography**: Caprasimo, Lato, and Outfit font stack
- **Accessible Color Palette**: WCAG 2.2 AA compliant purple/pink theme
- **Card-based UI**: Consistent hover and interaction states
- **Thumbnails**: App icons and book cover images

### ♿ **Full Accessibility**
- **WCAG 2.2 AA Compliance**: 4.5:1 contrast ratios throughout
- **Semantic HTML**: Proper landmarks and ARIA labels
- **Screen Reader Support**: Optimized for assistive technologies
- **Keyboard Navigation**: Full keyboard accessibility

### 🔧 **Technical Excellence**
- **React 18 SSR**: Server-side rendering optimized for val.town
- **AT Protocol Integration**: Native support for decentralized protocols
- **Deno Runtime**: Modern ESM imports, no Node.js dependencies
- **TypeScript**: Full type safety with comprehensive interfaces
- **Server-side Caching**: 1-hour cache for all external API calls

## 🚀 Quick Start

```bash
# Format code
deno fmt

# Lint code  
deno lint

# Deploy to val.town
deno task deploy
```

## 🌍 Content Sources

The website automatically aggregates content from:

- **[Leaflet Publication](https://tijs.leaflet.pub/)** - Blog posts and articles
- **[DropAnchor](https://dropanchor.app/)** - Location check-ins via AT Protocol
- **[Bookhive](https://bookhive.buzz/)** - Book reading updates via AT Protocol
- **[GitHub](https://github.com/tijs)** - Open source projects and contributions

## ⚙️ Configuration

### Environment Variables

- `ATPROTO_HANDLE`: Your AT Protocol handle (defaults to "tijs.org")
- `LEAFLET_PUB_JSON`: URL to your Leaflet publication JSON feed

### Customization

The website is designed to be easily customizable:
- Update personal information in `components/ProfileHeader.tsx`
- Modify app showcase in `components/AppsSection.tsx`
- Adjust color themes in component stylesheets
- Configure external links in `components/ExternalLinks.tsx`

## 🏗️ Architecture

Personal Nexus uses **server-side rendering** to generate HTML with dynamic content from multiple decentralized sources:

1. **AT Protocol Integration**: Connects directly to your PDS (Personal Data Server)
2. **Data Aggregation**: Fetches and combines content from various platforms
3. **Server-side Caching**: Implements intelligent caching to reduce API calls
4. **Graceful Fallbacks**: Handles network issues and missing data elegantly

## 🛠️ Tech Stack

- **Frontend**: React 18 with server-side rendering
- **Runtime**: Deno with modern ESM imports
- **Hosting**: Val.town platform
- **Protocols**: AT Protocol (@atproto/api)
- **Languages**: TypeScript for type safety
- **Styling**: CSS-in-JS with responsive design

## 📋 Requirements

- Deno runtime
- Val.town account for hosting
- AT Protocol handle for decentralized content
- Optional: Custom domain setup

## 🤝 Contributing

This project demonstrates modern web development practices with decentralized protocols. Feel free to fork and adapt for your own personal website!

## 📄 License

Open source - feel free to use as inspiration for your own personal nexus.