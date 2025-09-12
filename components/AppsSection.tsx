import React from "https://esm.sh/react@18";

export function AppsSection() {
  const apps = [
    {
      name: "Flexible",
      tagline: "Movement timer",
      url: "https://flexiblemovement.com",
      description: "Track your (rehab) exercises on iOS",
    },
    {
      name: "Kilowatt",
      tagline: "EV charging timer for iOS",
      url: "https://kilowattcharging.com",
      description: "Estimate the charging time for your EVs on iOS",
    },
    {
      name: "Drop Anchor",
      tagline: "Location-based social checkins",
      url: "https://dropanchor.app/",
      description: "Social checkin app built on AT Protocol",
      label: "alpha",
    },
  ];

  return (
    <section>
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
          background: #ff0066;
          color: white;
          padding: 0.125rem 0.5rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
        }

        .app-tagline {
          color: #ff0066;
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

      <h2>Apps</h2>
      <div className="app-list">
        {apps.map((app, index) => (
          <a
            key={index}
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="app-item"
          >
            <div className="app-card">
              <div className="app-name">
                <span>{app.name}</span>
                {app.label && <span className="app-label">{app.label}</span>}
              </div>
              <div className="app-tagline">{app.tagline}</div>
              <div className="app-description">{app.description}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
