import React from "https://esm.sh/react@18";
import { ProfileHeader } from "./components/ProfileHeader.tsx";
import { PostsSection } from "./components/PostsSection.tsx";
import { CheckinsSection } from "./components/CheckinsSection.tsx";
import { BookSection } from "./components/BookSection.tsx";
import { AppsSection } from "./components/AppsSection.tsx";
import { OpenSourceSection } from "./components/OpenSourceSection.tsx";
import { ExternalLinks } from "./components/ExternalLinks.tsx";
import { Footer } from "./components/Footer.tsx";

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

interface AppProps {
  posts: Post[];
  books: Book[];
  checkins: CheckinWithAddress[];
  pdsUrl?: string;
}

export function App(
  { posts, books, checkins, pdsUrl }: AppProps,
) {
  return (
    <div className="app">
      <style>
        {`
        :root {
          --color-bg: #f5efe6;
          --color-bg-card: #ffffff;
          --color-text: #2d1b33;
          --color-text-muted: #6b5a72;
          --color-primary: #5c2d6e;
          --color-accent: #c4365a;
          --color-accent-soft: rgba(196, 54, 90, 0.08);
          --color-border: rgba(93, 45, 110, 0.1);
          --color-shadow: rgba(45, 27, 51, 0.06);
          --radius: 10px;
          --shadow-sm: 0 1px 3px var(--color-shadow), 0 1px 2px var(--color-shadow);
          --shadow-md: 0 4px 16px var(--color-shadow), 0 2px 4px var(--color-shadow);
          --transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: var(--color-text);
          background: var(--color-bg);
        }

        .app {
          max-width: 1100px;
          margin: 0 auto;
          padding: 3rem 2rem;
        }

        h1, h2, h3 {
          margin-bottom: 1rem;
          font-weight: 600;
        }

        h1 {
          font-size: 2rem;
          color: var(--color-primary);
        }

        h2 {
          font-size: 1.25rem;
          color: var(--color-text);
          margin-top: 0;
          margin-bottom: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        ul {
          list-style: none;
          padding-left: 0;
        }

        li {
          margin-bottom: 0.5rem;
        }

        a {
          color: var(--color-accent);
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        p {
          margin-bottom: 1rem;
        }

        section {
          margin-bottom: 3rem;
        }

        @media (max-width: 768px) {
          .app {
            padding: 1.5rem 1rem;
          }

          section {
            margin-bottom: 2rem;
          }
        }
      `}
      </style>

      <ProfileHeader />
      <main>
        <PostsSection posts={posts} />
        <CheckinsSection checkins={checkins} pdsUrl={pdsUrl} />
        <BookSection books={books} pdsUrl={pdsUrl} />
        <AppsSection />
        <OpenSourceSection />
      </main>
      <nav aria-label="External links">
        <ExternalLinks />
      </nav>
      <Footer />
    </div>
  );
}
