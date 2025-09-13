import React from "https://esm.sh/react@18";

const GitHubIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const BlueskyIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z" />
  </svg>
);

export function ExternalLinks() {
  const links = [
    {
      name: "Bluesky",
      url: "https://bsky.app/profile/tijs.org",
      icon: <BlueskyIcon />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/tijsteulings/",
      icon: <LinkedInIcon />,
    },
    {
      name: "GitHub",
      url: "https://github.com/tijs",
      icon: <GitHubIcon />,
    },
  ];

  return (
    <footer>
      <style>
        {`
        .links-container {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(106, 0, 102, 0.2);
        }

        .links-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        @media (min-width: 800px) {
          .links-list {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .links-list {
            grid-template-columns: 1fr;
          }
        }

        .link-item {
          display: block;
          text-decoration: none;
          color: inherit;
        }

        .link-item:hover {
          text-decoration: none;
        }

        .link-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: rgba(147, 71, 144, 0.1);
          border-left: 3px solid #934790;
          border-radius: 0 4px 4px 0;
          transition: all 0.2s ease;
          user-select: none;
        }

        .link-item:hover .link-card {
          background: rgba(147, 71, 144, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(147, 71, 144, 0.3);
        }

        .link-item:active .link-card {
          transform: translateY(0px);
          background: rgba(147, 71, 144, 0.25);
          box-shadow: 0 2px 4px rgba(147, 71, 144, 0.2);
        }

        .link-name {
          color: #6a0066;
          font-weight: 500;
        }

        .link-icon {
          display: flex;
          align-items: center;
          color: #6a0066;
        }

        .link-icon svg {
          width: 20px;
          height: 20px;
        }

        @media (max-width: 480px) {
          .links-list {
            flex-direction: column;
            align-items: center;
          }
        }
      `}
      </style>

      <div className="links-container">
        <div className="connect-header">
          <h2 id="connect-heading">Connect</h2>
        </div>
        <div className="links-list">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-item"
            >
              <div className="link-card">
                <div className="link-icon">{link.icon}</div>
                <span className="link-name">{link.name}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
