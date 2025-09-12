# Tijs.org React Website

A React version of the tijs.org website, optimized for hosting on val.town.

## Structure

- `index.html` - Main HTML file with React app container
- `index.tsx` - React app entry point
- `App.tsx` - Main app component with global styles
- `components/` - Individual React components:
  - `ProfileHeader.tsx` - Header with profile image and intro
  - `AppsSection.tsx` - Showcases personal apps
  - `OpenSourceSection.tsx` - Open source contributions
  - `ExternalLinks.tsx` - Social and contact links

## Features

- 📱 Responsive design
- 🎨 Custom styling with CSS-in-JS
- ⚡ Fast loading with ESM imports
- 🔗 External links to projects and profiles
- 🎯 Optimized for val.town hosting

## Val.town Deployment

1. Upload all files to your val.town project
2. Set `index.html` as your main file
3. The site will automatically serve the React components

## Local Development

If you want to test locally:

```bash
npm install
npm run dev
```

## Styling

The site uses a pink/magenta color scheme matching the original:

- Primary: `#ff69ad`
- Secondary: `#e34198`
- Dark: `#461036`

All styling is done with CSS-in-JS for component isolation and val.town
compatibility.
