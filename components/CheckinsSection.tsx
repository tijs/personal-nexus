import React from "https://esm.sh/react@18";
import type { Beacon } from "../types.ts";

interface CheckinsSectionProps {
  checkins: Beacon[];
  handle: string;
  beaconBitsId: string;
}

export function CheckinsSection(
  { checkins, handle, beaconBitsId }: CheckinsSectionProps,
) {
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

  const getBeaconUrl = (uri: string) => {
    const rkey = uri.split("/").pop();
    return `https://www.beaconbits.app/beacons/${beaconBitsId}/${rkey}`;
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

        .checkins-link {
          color: var(--color-text-muted);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          transition: color var(--transition);
        }

        .checkins-link:hover {
          color: var(--color-accent);
          text-decoration: none;
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

        .checkin-item {
          display: block;
          text-decoration: none;
          color: inherit;
        }

        .checkin-item:hover {
          text-decoration: none;
        }

        .checkin-card {
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

        .checkin-item:hover .checkin-card {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: rgba(93, 45, 110, 0.15);
        }

        .checkin-item:active .checkin-card {
          transform: translateY(0);
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
        <a
          href={`https://www.beaconbits.app/passport/${handle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="checkins-link"
        >
          View all check-ins &rarr;
        </a>
      </div>

      <div className="checkins-list">
        {checkins.map((beacon) => (
          <a
            key={beacon.uri}
            href={getBeaconUrl(beacon.uri)}
            target="_blank"
            rel="noopener noreferrer"
            className="checkin-item"
          >
            <div className="checkin-card">
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
          </a>
        ))}
      </div>
    </section>
  );
}
