import React from "https://esm.sh/react@18";

export function Footer() {
  return (
    <footer>
      <style>
        {`
        footer {
          margin-top: 2rem;
          padding: 2rem 0 1rem 0;
          text-align: center;
        }

        .footer-content {
          color: #6a0066;
          opacity: 0.7;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .footer-link {
          color: #cc0055;
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.2s ease;
        }

        .footer-link:hover {
          opacity: 0.8;
          text-decoration: underline;
        }

        .project-name {
          font-weight: 600;
          color: #6a0066;
        }

        @media (max-width: 768px) {
          footer {
            margin-top: 1.5rem;
            padding: 1.5rem 0 1rem 0;
          }
          
          .footer-content {
            font-size: 0.85rem;
          }
        }
      `}
      </style>

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
        • React + AT Protocol + Val.town
      </div>
    </footer>
  );
}
