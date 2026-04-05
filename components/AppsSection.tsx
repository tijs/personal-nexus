import React from "https://esm.sh/react@18";

export function AppsSection() {
  const apps = [
    {
      name: "Kilowatt",
      tagline: "EV charging timer for iOS",
      url: "https://kilowattcharging.com",
      description: "Estimate the charging time for your EVs on iOS",
      icon:
        "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/d0/9e/a3/d09ea387-6f70-63e3-7c55-57a286dd8c74/AppIcon-0-0-1x_U007epad-0-1-85-220.png/540x540bb.jpg",
    },
    {
      name: "Drop Anchor",
      tagline: "Location-based social checkins",
      url: "https://dropanchor.app/",
      description: "Social checkin app built on AT Protocol",
      label: "alpha",
      icon:
        "https://res.cloudinary.com/dru3aznlk/image/upload/v1754747200/anchor-logo-transparent_nrw70y.png",
    },
    {
      name: "kipclip",
      tagline: "Find it, Kip it",
      url: "https://kipclip.com/",
      description:
        "Simple, open bookmarks app for AT Protocol. Save links, organize with tags, browse from any device.",
      icon:
        "https://res.cloudinary.com/dru3aznlk/image/upload/v1760692589/kip-vignette_h2jwct.png",
    },
    {
      name: "Attic",
      tagline: "Back up your iCloud Photos to your storage",
      url: "https://attic.photos/",
      description: "Back up your macOS Photos library to S3-compatible storage",
      icon: "https://attic.photos/attic-logo-transparent.png",
      label: "beta",
    },
    {
      name: "Floating Head",
      tagline: "Add some You to your video",
      url: "https://floatinghead.app",
      description:
        "Create a floating webcam panel that stays visible on screen for screencasts, tutorials, and live streams on Mac",
      icon:
        "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/30/77/90/30779057-8bba-1143-a1f9-8f7800101a79/AppIcon-0-0-85-220-0-5-0-2x.png/540x540bb.jpg",
    },
    {
      name: "Boulder",
      tagline: "Bouldering tracker for Pebble",
      url: "https://apps.repebble.com/boulder_04b314f4955845468a2fe9a3",
      description:
        "Track bouldering sessions from your wrist. Log climbs by grade, mark as flash, top, or try, and review your progress",
      icon:
        "https://appstore-api.repebble.com/api/assets/icons/04b314f4955845468a2fe9a3/large/20585f4c-4150-41d1-a747-e4de4d4b23b4.png",
    },
  ];

  return (
    <section aria-labelledby="apps-heading">
      <style>
        {`
        .app-list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }

        @media (max-width: 768px) {
          .app-list {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        .app-item {
          display: block;
          text-decoration: none;
          color: inherit;
        }

        .app-item:hover {
          text-decoration: none;
        }

        .app-card {
          padding: 1.25rem;
          background: var(--color-bg-card);
          border-radius: var(--radius);
          transition: all var(--transition);
          height: 100%;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--color-border);
        }

        .app-content {
          display: flex;
          gap: 1rem;
          height: 100%;
        }

        .app-icon {
          width: 56px;
          height: 56px;
          flex-shrink: 0;
          border-radius: 12px;
          object-fit: cover;
          background: var(--color-accent-soft);
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .app-details {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .app-item:hover .app-card {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: rgba(93, 45, 110, 0.15);
        }

        .app-item:active .app-card {
          transform: translateY(0);
        }

        .app-name {
          font-weight: 600;
          color: var(--color-text);
          margin-bottom: 0.2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
        }

        .app-label {
          background: var(--color-accent);
          color: white;
          padding: 0.1rem 0.45rem;
          border-radius: 5px;
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .app-label-archived {
          background: #9ca3af;
        }

        .app-item-archived .app-card {
          background: rgba(255, 255, 255, 0.5);
          border-color: rgba(0, 0, 0, 0.05);
          cursor: default;
        }

        .app-item-archived .app-icon {
          filter: grayscale(100%);
          opacity: 0.5;
        }

        .app-item-archived .app-name {
          color: var(--color-text-muted);
        }

        .app-item-archived .app-tagline,
        .app-item-archived .app-description {
          color: #9ca3af;
        }

        .app-tagline {
          color: var(--color-accent);
          font-size: 0.85rem;
          font-style: italic;
          margin-bottom: 0.2rem;
        }

        .app-description {
          color: var(--color-text-muted);
          font-size: 0.85rem;
          line-height: 1.45;
        }
      `}
      </style>

      <h2 id="apps-heading">Apps i've Made</h2>
      <div className="app-list">
        {apps.map((app, index) => {
          const isArchived = app.label === "archived";
          const cardContent = (
            <div className="app-card">
              <div className="app-content">
                <img
                  src={app.icon}
                  alt={`${app.name} icon`}
                  className="app-icon"
                  loading="lazy"
                />
                <div className="app-details">
                  <div className="app-name">
                    <span>{app.name}</span>
                    {app.label && (
                      <span
                        className={`app-label${
                          isArchived ? " app-label-archived" : ""
                        }`}
                      >
                        {app.label}
                      </span>
                    )}
                  </div>
                  <div className="app-tagline">{app.tagline}</div>
                  <div className="app-description">{app.description}</div>
                </div>
              </div>
            </div>
          );

          if (isArchived) {
            return (
              <div key={index} className="app-item app-item-archived">
                {cardContent}
              </div>
            );
          }

          return (
            <a
              key={index}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="app-item"
            >
              {cardContent}
            </a>
          );
        })}
      </div>
    </section>
  );
}
