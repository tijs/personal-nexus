import React from "https://esm.sh/react@18";

interface Checkin {
  uri: string;
  cid: string;
  value: {
    text: string;
    $type: "app.dropanchor.checkin";
    category: string;
    createdAt: string;
    addressRef: {
      cid: string;
      uri: string;
    };
    coordinates: {
      latitude: number;
      longitude: number;
    };
    categoryIcon: string;
    categoryGroup: string;
  };
}

interface Address {
  uri: string;
  cid: string;
  value: {
    name: string;
    $type: "community.lexicon.location.address";
    region: string;
    country: string;
    locality: string;
  };
}

interface CheckinWithAddress {
  checkin: Checkin;
  address: Address;
}

interface CheckinsSectionProps {
  checkins: CheckinWithAddress[];
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

  const getLocationString = (address: Address) => {
    const { name, locality, region, country } = address.value;
    const parts = [name];
    if (locality) parts.push(locality);
    if (region && region !== locality) parts.push(region);
    if (country) parts.push(country);
    return parts.join(", ");
  };

  const getCheckinId = (uri: string) => {
    // Extract the ID from URI like "at://did:plc:aq7owa5y7ndc2hzjz37wy7ma/app.dropanchor.checkin/3lyn5rkrkqg2n"
    return uri.split("/").pop();
  };

  const getCheckinUrl = (uri: string) => {
    const id = getCheckinId(uri);
    return `https://dropanchor.app/checkin/${id}`;
  };

  return (
    <section>
      <style>
        {`
        .checkins-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .checkins-link {
          color: #ff0066;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .checkins-link:hover {
          text-decoration: underline;
        }

        .checkins-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        @media (min-width: 800px) {
          .checkins-list {
            grid-template-columns: repeat(3, 1fr);
          }
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
          padding: 1rem;
          border-left: 3px solid #e91e63;
          background: #f9fafb;
          border-radius: 0 4px 4px 0;
          transition: all 0.2s ease;
          user-select: none;
          height: 100%;
          display: flex;
          flex-direction: column;
          box-shadow: 0 1px 3px rgba(233, 30, 99, 0.1);
        }

        .checkin-item:hover .checkin-card {
          background: #f3f4f6;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(233, 30, 99, 0.15);
        }

        .checkin-item:active .checkin-card {
          transform: translateY(0px);
          background: #f1f3f4;
          box-shadow: 0 2px 6px rgba(233, 30, 99, 0.12);
        }

        .checkin-text {
          font-weight: 600;
          color: rgb(39, 39, 39);
          margin-bottom: 0.5rem;
          font-size: 1rem;
          line-height: 1.3;
        }

        .checkin-date {
          color: #e91e63;
          font-size: 0.8rem;
          margin-bottom: 0.75rem;
        }

        .checkin-location {
          color: #4f5d73;
          font-size: 0.9rem;
          font-weight: 500;
          flex-grow: 1;
        }
      `}
      </style>

      <div className="checkins-header">
        <h2>Recent Check-ins</h2>
        <a
          href="https://dropanchor.app/profile/tijs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="checkins-link"
        >
          View all check-ins →
        </a>
      </div>

      <div className="checkins-list">
        {checkins.map((item) => (
          <a
            key={item.checkin.uri}
            href={getCheckinUrl(item.checkin.uri)}
            target="_blank"
            rel="noopener noreferrer"
            className="checkin-item"
          >
            <div className="checkin-card">
              <div className="checkin-text">{item.checkin.value.text}</div>
              <div className="checkin-date">
                {formatDate(item.checkin.value.createdAt)}
              </div>
              <div className="checkin-location">
                {getLocationString(item.address)}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
