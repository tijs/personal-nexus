import React from "https://esm.sh/react@18";

export function Footer() {
  return (
    <footer>
      <style>
        {`
        .site-footer {
          margin-top: 2rem;
          padding: 1.5rem 0 1rem 0;
          text-align: center;
        }

        .footer-content {
          color: var(--color-text-muted);
          font-size: 0.82rem;
          line-height: 1.5;
        }

        .footer-link {
          color: var(--color-text-muted);
          text-decoration: none;
          font-weight: 500;
          transition: color var(--transition);
        }

        .footer-link:hover {
          color: var(--color-accent);
        }

        .project-name {
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .site-footer {
            margin-top: 1.5rem;
          }
        }
      `}
      </style>

      <div className="site-footer">
        <div className="footer-content">
          Built with{" "}
          <a
            href="https://github.com/tijs/personal-nexus"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <span className="project-name">Personal Nexus</span>
          </a>{" "}
          &middot; React + AT Protocol + Val.town
        </div>
      </div>
    </footer>
  );
}
