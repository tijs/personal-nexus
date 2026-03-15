import React from "https://esm.sh/react@18";
import { KofiSupport } from "./KofiSupport.tsx";

export function OpenSourceSection() {
  const projects = [
    {
      name: "attic",
      url: "https://github.com/tijs/attic",
      description:
        "Back up your iCloud Photos library to S3-compatible storage",
    },
    {
      name: "ladder",
      url: "https://github.com/tijs/ladder",
      description:
        "macOS CLI to export original photos and videos from Photos using PhotoKit",
    },
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
      name: "atproto-oauth",
      url: "https://github.com/tijs/atproto-oauth",
      description: "Framework-agnostic OAuth integration for AT Protocol",
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
      name: "atproto-sessions",
      url: "https://github.com/tijs/atproto-sessions",
      description: "Framework-agnostic session management for AT Protocol",
    },
    {
      name: "atproto-storage",
      url: "https://github.com/tijs/atproto-storage",
      description: "Storage implementations for AT Protocol OAuth",
    },
    {
      name: "fastlane-plugin-translate",
      url: "https://github.com/tijs/fastlane-plugin-translate",
      description: "Fastlane plugin for translating app metadata",
    },
    {
      name: "kipclip-cli",
      url: "https://github.com/tijs/kipclip-cli",
      description: "CLI tool for kipclip bookmarks on AT Protocol",
    },
    {
      name: "oauth-client-deno",
      url: "https://github.com/tijs/oauth-client-deno",
      description: "OAuth client implementation for Deno",
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
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-bottom: 2rem;
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
          padding: 1.25rem;
          background: var(--color-bg-card);
          border-radius: var(--radius);
          transition: all var(--transition);
          height: 100%;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--color-border);
        }

        .project-item:hover .project-card {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: rgba(93, 45, 110, 0.15);
        }

        .project-item:active .project-card {
          transform: translateY(0);
        }

        .project-name {
          font-weight: 600;
          color: var(--color-text);
          margin-bottom: 0.3rem;
          font-size: 0.95rem;
        }

        .project-description {
          color: var(--color-text-muted);
          font-size: 0.85rem;
          line-height: 1.45;
        }

        .projects-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 1.25rem;
        }

        .projects-link {
          color: var(--color-text-muted);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          transition: color var(--transition);
        }

        .projects-link:hover {
          color: var(--color-accent);
          text-decoration: none;
        }
      `}
      </style>

      <div className="projects-header">
        <h2 id="projects-heading">Open Source</h2>
        <a
          href="https://github.com/tijs"
          target="_blank"
          rel="noopener noreferrer"
          className="projects-link"
        >
          More on GitHub &rarr;
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
