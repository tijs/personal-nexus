import React from "https://esm.sh/react@18";

export function RpgCharacterSection() {
  return (
    <section aria-labelledby="rpg-heading">
      <style>
        {`
        .rpg-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 1.25rem;
        }

        .rpg-link {
          color: var(--color-text-muted);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          transition: color var(--transition);
        }

        .rpg-link:hover {
          color: var(--color-accent);
          text-decoration: none;
        }

        .rpg-card {
          background: var(--color-bg-card);
          border-radius: var(--radius);
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--color-border);
          padding: 1.25rem;
        }

        .rpg-card rpg-actor-widget {
          display: block;
        }
      `}
      </style>

      <div className="rpg-header">
        <h2 id="rpg-heading">RPG Character</h2>
        <a
          href="https://rpg.actor/tijs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="rpg-link"
        >
          View on rpg.actor &rarr;
        </a>
      </div>

      <div
        className="rpg-card"
        dangerouslySetInnerHTML={{
          __html:
            `<rpg-actor-widget handle="tijs.org" system="reverie"></rpg-actor-widget>`,
        }}
      />
    </section>
  );
}
