import React from "https://esm.sh/react@18";

export function OpenSourceSection() {
  const projects = [
    {
      name: "Anchor",
      url: "https://github.com/dropanchorapp/Anchor",
      description:
        "A system & app for doing location based checkins on ATProto a.k.a Bluesky",
    },
    {
      name: "atproto-to-fediverse",
      url: "https://github.com/tijs/atproto-to-fediverse",
      description:
        "Syncs just posts (not replies, reposts, etc) from atproto (Bluesky) to Mastodon",
    },
    {
      name: "oauth-client-deno",
      url: "https://github.com/tijs/oauth-client-deno",
      description:
        "A Deno-compatible AT Protocol OAuth client that serves as a drop-in replacement",
    },
    {
      name: "location-feed-generator",
      url: "https://github.com/dropanchorapp/location-feed-generator",
      description: "Location AppView with Feed Generation Capabilities",
    },
    {
      name: "book-explorer",
      url: "https://github.com/tijs/book-explorer",
      description:
        "Book explorer is a very simple alternate UI for the Bookhive.buzz social platform",
    },
    {
      name: "hono-oauth-sessions",
      url: "https://github.com/tijs/hono-oauth-sessions",
      description:
        "Storage-agnostic OAuth session management for AT Protocol applications",
    },
  ];

  return (
    <section>
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
          border-left: 3px solid #ff0066;
          background: rgba(255, 0, 102, 0.1);
          border-radius: 0 4px 4px 0;
          transition: all 0.2s ease;
          user-select: none;
        }

        .project-item:hover .project-card {
          background: rgba(255, 0, 102, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(255, 0, 102, 0.3);
        }

        .project-item:active .project-card {
          transform: translateY(0px);
          background: rgba(255, 0, 102, 0.25);
          box-shadow: 0 2px 4px rgba(255, 0, 102, 0.2);
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
      `}
      </style>

      <h2>Open Source</h2>
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
              <div className="project-description">{project.description}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
