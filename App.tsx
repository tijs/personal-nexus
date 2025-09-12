import React from "https://esm.sh/react@18";
import { ProfileHeader } from "./components/ProfileHeader.tsx";
import { PostsSection } from "./components/PostsSection.tsx";
import { AppsSection } from "./components/AppsSection.tsx";
import { OpenSourceSection } from "./components/OpenSourceSection.tsx";
import { ExternalLinks } from "./components/ExternalLinks.tsx";

interface Post {
  id: string;
  title: string;
  content_html: string;
  url: string;
  date_modified: string;
  summary?: string;
}

interface AppProps {
  posts: Post[];
}

export function App({ posts }: AppProps) {
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
          color: #ff0066;
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
          color: #ff0066;
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
      <PostsSection posts={posts} />
      <AppsSection />
      <OpenSourceSection />
      <ExternalLinks />
    </div>
  );
}
