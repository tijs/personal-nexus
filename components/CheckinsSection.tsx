import React from "https://esm.sh/react@18";

// New geo structure (coordinates as strings for DAG-CBOR compliance)
interface Geo {
  latitude: string;
  longitude: string;
  altitude?: string;
  name?: string;
}

// New embedded address structure
interface AddressEmbedded {
  country: string; // Required
  name?: string;
  street?: string;
  locality?: string;
  region?: string;
  postalCode?: string;
}

// Updated Checkin interface with both old and new format support
interface Checkin {
  uri: string;
  cid: string;
  value: {
    text: string;
    $type: "app.dropanchor.checkin";
    category?: string;
    createdAt: string;
    categoryIcon?: string;
    categoryGroup?: string;

    // NEW format (embedded)
    address?: AddressEmbedded;
    geo?: Geo;

    // OLD format (StrongRef) - for backward compatibility
    addressRef?: {
      cid: string;
      uri: string;
    };
    coordinates?: {
      latitude: number;
      longitude: number;
    };

    image?: {
      alt?: string;
      thumb: {
        $type: "blob";
        ref: {
          $link: string;
        };
        mimeType: string;
        size: number;
      };
      fullsize: {
        $type: "blob";
        ref: {
          $link: string;
        };
        mimeType: string;
        size: number;
      };
    };
  };
}

// Unified structure for display
interface CheckinWithAddress {
  checkin: Checkin;
  address: AddressEmbedded; // Always normalized to embedded format
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

interface CheckinsSectionProps {
  checkins: CheckinWithAddress[];
  pdsUrl?: string;
}

export function CheckinsSection({ checkins, pdsUrl }: CheckinsSectionProps) {
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

  const getLocationString = (address: AddressEmbedded) => {
    const { name, locality, region, country } = address;
    const parts: string[] = [];
    if (name) parts.push(name);
    if (locality) parts.push(locality);
    if (region && region !== locality) parts.push(region);
    if (country) parts.push(country);
    return parts.join(", ");
  };

  const getCheckinId = (uri: string) => {
    return uri.split("/").pop();
  };

  const getCheckinUrl = (uri: string) => {
    const id = getCheckinId(uri);
    return `https://dropanchor.app/checkins/tijs.org/${id}`;
  };

  const getThumbnailUrl = (checkin: Checkin) => {
    if (!checkin.value.image?.thumb?.ref || !pdsUrl) {
      return null;
    }
    const did = checkin.uri.split("/")[2];
    const ref = checkin.value.image.thumb.ref as any;
    const cid = ref.$link || ref.toString();
    return `${pdsUrl}/xrpc/com.atproto.sync.getBlob?did=${did}&cid=${cid}`;
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
          gap: 1rem;
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

        .checkin-thumbnail {
          width: 72px;
          height: 72px;
          flex-shrink: 0;
          border-radius: 8px;
          object-fit: cover;
          background: var(--color-accent-soft);
        }

        .checkin-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .checkin-text {
          font-weight: 600;
          color: var(--color-text);
          margin-bottom: 0.35rem;
          font-size: 0.95rem;
          line-height: 1.35;
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
          href="https://dropanchor.app/profile/tijs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="checkins-link"
        >
          View all check-ins &rarr;
        </a>
      </div>

      <div className="checkins-list">
        {checkins.map((item) => {
          const thumbnailUrl = getThumbnailUrl(item.checkin);
          return (
            <a
              key={item.checkin.uri}
              href={getCheckinUrl(item.checkin.uri)}
              target="_blank"
              rel="noopener noreferrer"
              className="checkin-item"
            >
              <div className="checkin-card">
                {thumbnailUrl && (
                  <img
                    src={thumbnailUrl}
                    alt={item.checkin.value.image?.alt ||
                      item.checkin.value.text}
                    className="checkin-thumbnail"
                  />
                )}
                <div className="checkin-content">
                  <div className="checkin-text">{item.checkin.value.text}</div>
                  <div className="checkin-date">
                    {formatDate(item.checkin.value.createdAt)}
                  </div>
                  <div className="checkin-location">
                    {getLocationString(item.address)}
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
