import React from "https://esm.sh/react@18";
import { KofiSupport } from "./KofiSupport.tsx";

export function OpenSourceSection() {
  const projects = [
    {
      name: "attic",
      url: "https://github.com/tijs/attic",
      description:
        "Back up your iCloud Photos library to S3-compatible storage",
      tags: ["macos"],
    },
    {
      name: "ladder",
      url: "https://github.com/tijs/ladder",
      description: "PhotoKit export helper for iCloud Photos backup",
      tags: ["macos"],
    },
    {
      name: "atproto-to-fediverse",
      url: "https://github.com/tijs/atproto-to-fediverse",
      description: "Bridge AT Protocol content to the Fediverse",
      tags: ["atproto"],
    },
    {
      name: "atproto-oauth",
      url: "https://github.com/tijs/atproto-oauth",
      description: "Framework-agnostic OAuth integration for AT Protocol",
      tags: ["atproto"],
    },
    {
      name: "book-explorer",
      url: "https://github.com/tijs/book-explorer",
      description: "Explore books on AT Protocol via Bookhive",
      tags: ["atproto"],
    },
    {
      name: "atproto-sessions",
      url: "https://github.com/tijs/atproto-sessions",
      description: "Framework-agnostic session management for AT Protocol",
      tags: ["atproto"],
    },
    {
      name: "atproto-storage",
      url: "https://github.com/tijs/atproto-storage",
      description: "Storage implementations for AT Protocol OAuth",
      tags: ["atproto"],
    },
    {
      name: "fastlane-plugin-translate",
      url: "https://github.com/tijs/fastlane-plugin-translate",
      description: "Fastlane plugin for translating app metadata",
      tags: ["ios"],
    },
    {
      name: "kipclip-cli",
      url: "https://github.com/tijs/kipclip-cli",
      description: "CLI tool for kipclip bookmarks on AT Protocol",
      tags: ["atproto", "macos"],
    },
    {
      name: "oauth-client-deno",
      url: "https://github.com/tijs/oauth-client-deno",
      description: "OAuth client implementation for Deno",
      tags: ["atproto"],
    },
    {
      name: "kipclip-appview",
      url: "https://github.com/tijs/kipclip-appview",
      description: "Custom appview for kipclip bookmarks on AT Protocol",
      tags: ["atproto"],
    },
    {
      name: "boulder",
      url: "https://github.com/tijs/boulder",
      description: "Bouldering session tracker for Pebble smartwatches",
      tags: ["pebble"],
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

        .project-tags {
          display: flex;
          gap: 0.35rem;
          margin-top: 0.5rem;
          flex-wrap: wrap;
        }

        .project-tag {
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          padding: 0.1rem 0.45rem;
          border-radius: 5px;
          color: white;
        }

        .project-tag-atproto {
          background: #0085ff;
        }

        .project-tag-ios {
          background: #5856d6;
        }

        .project-tag-macos {
          background: #34c759;
        }

        .project-tag-pebble {
          background: #ff6b35;
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
              {project.tags && project.tags.length > 0 && (
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`project-tag project-tag-${tag}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </a>
        ))}
      </div>

      <KofiSupport />
    </section>
  );
}
