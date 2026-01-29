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
      name: "Floating Head",
      tagline: "Add some You to your video",
      url:
        "https://apps.apple.com/us/app/floating-head-show-yourself/id1565946661",
      description:
        "Create a floating webcam panel that stays visible on screen for screencasts, tutorials, and live streams on Mac",
      icon:
        "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/30/77/90/30779057-8bba-1143-a1f9-8f7800101a79/AppIcon-0-0-85-220-0-5-0-2x.png/540x540bb.jpg",
    },
    {
      name: "Flexible",
      tagline: "Movement timer",
      url: "https://flexiblemovement.com",
      description: "Track your (rehab) exercises on iOS",
      icon:
        "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/85/75/bf/8575bf1c-7522-db8d-44bf-26f4cc5fdd18/AppIcon-0-0-1x_U007ephone-0-1-85-220.jpeg/540x540bb.jpg",
      label: "archived",
    },
  ];

  return (
    <section aria-labelledby="apps-heading">
      <style>
        {`
        .app-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        @media (min-width: 800px) {
          .app-list {
            grid-template-columns: repeat(3, 1fr);
          }
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
          padding: 1rem;
          border-left: 3px solid #934790;
          background: rgba(147, 71, 144, 0.1);
          border-radius: 0 4px 4px 0;
          transition: all 0.2s ease;
          user-select: none;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .app-content {
          display: flex;
          gap: 0.75rem;
          height: 100%;
        }

        .app-icon {
          width: 60px;
          height: 60px;
          flex-shrink: 0;
          border-radius: 12px;
          object-fit: cover;
          background: rgba(147, 71, 144, 0.2);
          border: 1px solid rgba(147, 71, 144, 0.3);
        }

        .app-details {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .app-item:hover .app-card {
          background: rgba(147, 71, 144, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(147, 71, 144, 0.3);
        }

        .app-item:active .app-card {
          transform: translateY(0px);
          background: rgba(147, 71, 144, 0.25);
          box-shadow: 0 2px 4px rgba(147, 71, 144, 0.2);
        }

        .app-name {
          font-weight: 600;
          color: #6a0066;
          margin-bottom: 0.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .app-label {
          background: #cc0055;
          color: white;
          padding: 0.125rem 0.5rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
        }

        .app-label-archived {
          background: #888;
        }

        .app-item-archived .app-card {
          border-left-color: #999;
          background: rgba(128, 128, 128, 0.1);
          cursor: default;
        }

        .app-item-archived .app-icon {
          filter: grayscale(100%);
          opacity: 0.6;
          background: rgba(128, 128, 128, 0.2);
          border-color: rgba(128, 128, 128, 0.3);
        }

        .app-item-archived .app-name {
          color: #666;
        }

        .app-item-archived .app-tagline {
          color: #888;
        }

        .app-item-archived .app-description {
          color: #666;
        }

        .app-tagline {
          color: #cc0055;
          font-size: 0.9rem;
          font-style: italic;
          margin-bottom: 0.25rem;
        }

        .app-description {
          color: #6a0066;
          opacity: 0.8;
          font-size: 0.9rem;
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
