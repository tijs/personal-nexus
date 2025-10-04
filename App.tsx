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

interface AppProps {
  posts: Post[];
  books: Book[];
  checkins: CheckinWithAddress[];
  pdsUrl?: string;
  starredRepos: GitHubRepo[];
}

export function App(
  { posts, books, checkins, pdsUrl, starredRepos }: AppProps,
) {
  return (
    <div className="app">
      <style>
        {`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #6a0066;
          background: #e8d4b7;
        }

        .app {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        h1, h2, h3 {
          margin-bottom: 1rem;
          font-weight: 600;
        }

        h1 {
          font-size: 2rem;
          color: #6a0066;
        }

        h2 {
          font-size: 1.5rem;
          color: #cc0055;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        ul {
          list-style: none;
          padding-left: 0;
        }

        li {
          margin-bottom: 0.5rem;
        }

        a {
          color: #cc0055;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        p {
          margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
          .app {
            padding: 1rem 0.5rem;
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
        <OpenSourceSection starredRepos={starredRepos} />
      </main>
      <nav aria-label="External links">
        <ExternalLinks />
      </nav>
      <Footer />
    </div>
  );
}
