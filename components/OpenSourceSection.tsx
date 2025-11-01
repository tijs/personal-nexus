import React from "https://esm.sh/react@18";
import { KofiSupport } from "./KofiSupport.tsx";

export function OpenSourceSection() {
  const projects = [
    {
      name: "Anchor",
      url: "https://github.com/dropanchorapp/Anchor",
      description: "Location-based social network built on AT Protocol",
    },
    {
      name: "atproto-to-fediverse",
      url: "https://github.com/tijs/atproto-to-fediverse",
      description: "Bridge AT Protocol content to the Fediverse",
    },
    {
      name: "oauth-client-deno",
      url: "https://github.com/tijs/oauth-client-deno",
      description: "OAuth 2.0 client library for Deno",
    },
    {
      name: "anchor-appview",
      url: "https://github.com/dropanchorapp/anchor-appview",
      description: "Custom appview for Drop Anchor social checkins",
    },
    {
      name: "book-explorer",
      url: "https://github.com/tijs/book-explorer",
      description: "Explore books on AT Protocol via Bookhive",
    },
    {
      name: "hono-oauth-sessions",
      url: "https://github.com/tijs/hono-oauth-sessions",
      description: "OAuth session management middleware for Hono",
    },
    {
      name: "fastlane-plugin-translate",
      url: "https://github.com/tijs/fastlane-plugin-translate",
      description: "Fastlane plugin for translating app metadata",
    },
    {
      name: "kipclip-appview",
      url: "https://github.com/tijs/kipclip-appview",
      description: "Custom appview for kipclip bookmarks on AT Protocol",
    },
  ];
  return (
    <section aria-labelledby="projects-heading">
      <style>
        {`
        .project-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        @media (min-width: 800px) {
          .project-list {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .project-list {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        .project-item {
          display: block;
          text-decoration: none;
          color: inherit;
        }

        .project-item:hover {
          text-decoration: none;
        }

        .project-card {
          padding: 1rem;
          border-left: 3px solid #cc0055;
          background: rgba(204, 0, 85, 0.1);
          border-radius: 0 4px 4px 0;
          transition: all 0.2s ease;
          user-select: none;
        }

        .project-item:hover .project-card {
          background: rgba(204, 0, 85, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(204, 0, 85, 0.3);
        }

        .project-item:active .project-card {
          transform: translateY(0px);
          background: rgba(204, 0, 85, 0.25);
          box-shadow: 0 2px 4px rgba(204, 0, 85, 0.2);
        }

        .project-name {
          font-weight: 600;
          color: #6a0066;
          margin-bottom: 0.25rem;
        }

        .project-description {
          color: #6a0066;
          opacity: 0.8;
          font-size: 0.9rem;
        }

        .projects-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .projects-link {
          color: #cc0055;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .projects-link:hover {
          text-decoration: underline;
        }
      `}
      </style>

      <div className="projects-header">
        <h2 id="projects-heading">My Open Source Projects</h2>
        <a
          href="https://github.com/tijs"
          target="_blank"
          rel="noopener noreferrer"
          className="projects-link"
        >
          More projects →
        </a>
      </div>

      <div className="project-list">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-item"
          >
            <div className="project-card">
              <div className="project-name">
                <span>{project.name}</span>
              </div>
              <div className="project-description">
                {project.description}
              </div>
            </div>
          </a>
        ))}
      </div>

      <KofiSupport />
    </section>
  );
}
