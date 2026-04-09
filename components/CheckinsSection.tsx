import React from "https://esm.sh/react@18";
import type { Beacon } from "../types.ts";

interface CheckinsSectionProps {
  checkins: Beacon[];
}

export function CheckinsSection({ checkins }: CheckinsSectionProps) {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return dateString;
    }
  };

  return (
    <section aria-labelledby="checkins-heading">
      <style>
        {`
        .checkins-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 1.25rem;
        }

        .checkins-list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }

        @media (max-width: 768px) {
          .checkins-list {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        .checkin-card {
          padding: 1.25rem;
          background: var(--color-bg-card);
          border-radius: var(--radius);
          height: 100%;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--color-border);
        }

        .checkin-venue {
          font-weight: 600;
          color: var(--color-text);
          margin-bottom: 0.35rem;
          font-size: 0.95rem;
          line-height: 1.35;
        }

        .checkin-shout {
          color: var(--color-text);
          font-size: 0.85rem;
          line-height: 1.45;
          margin-bottom: 0.35rem;
          font-style: italic;
        }

        .checkin-date {
          color: var(--color-text-muted);
          font-size: 0.8rem;
          margin-bottom: 0.35rem;
          font-weight: 500;
        }

        .checkin-location {
          color: var(--color-text-muted);
          font-size: 0.85rem;
          flex-grow: 1;
        }
      `}
      </style>

      <div className="checkins-header">
        <h2 id="checkins-heading">Recent Check-ins</h2>
      </div>

      <div className="checkins-list">
        {checkins.map((beacon) => (
          <div key={beacon.uri} className="checkin-card">
            <div className="checkin-venue">{beacon.value.venueName}</div>
            {beacon.value.shout && (
              <div className="checkin-shout">{beacon.value.shout}</div>
            )}
            <div className="checkin-date">
              {formatDate(beacon.value.createdAt)}
            </div>
            {beacon.value.venueAddress && (
              <div className="checkin-location">
                {beacon.value.venueAddress}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
