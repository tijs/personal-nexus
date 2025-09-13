# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-09-13

### Added

- **React SSR Website**: Complete server-side rendered React website for
  val.town hosting
- **Dynamic Content Integration**:
  - Blog posts from Leaflet publication JSON feed
  - Check-ins from DropAnchor via AT Protocol
  - Book updates from Bookhive via AT Protocol
- **AT Protocol Integration**: Full integration with decentralized social
  protocols
  - PDS (Personal Data Server) resolution via Slingshot service
  - Address record resolution for check-in locations
  - Book cover image fetching via blob URLs
- **Responsive Design**:
  - CSS Grid layouts (3 columns desktop, 1 column mobile)
  - Card-based design system across all sections
  - Hover and active states for interactive elements
- **Typography & Design**:
  - Custom font stack: Caprasimo (name), Lato (headers), Outfit (body)
  - Purple/pink color palette with section-specific themes
  - Consistent visual hierarchy and spacing
- **Thumbnails**: App icons and book cover images
- **External Links**: Clickable links to detailed pages on respective platforms
- **Server-side Caching**: 1-hour cache for all external API calls
- **Environment Configuration**: Configurable via ATPROTO_HANDLE and
  LEAFLET_PUB_JSON

### Accessibility

- **WCAG 2.2 AA Compliance**: Fixed 34 color contrast issues
- **Semantic HTML**: Added proper landmarks and ARIA labels
- **Screen Reader Support**: Improved navigation with semantic structure
- **Color Contrast**: Updated all colors to meet 4.5:1 contrast ratio
  requirements

### Technical Features

- **Deno Runtime**: ESM imports and modern JavaScript features
- **Val.town Deployment**: Optimized for val.town hosting platform
- **Error Handling**: Graceful fallbacks for all external data sources
- **TypeScript**: Full type safety with interface definitions
- **Git Integration**: Proper version control with meaningful commit history

### Infrastructure

- **Clean Build Process**: Removed Node.js dependencies in favor of Deno-only
  setup
- **Deployment Pipeline**: Automated lint, format, and deploy process
- **Development Workflow**: Hot reloading and modern development experience

[1.0.0]: https://github.com/tijs/personal-nexus/releases/tag/v1.0.0
