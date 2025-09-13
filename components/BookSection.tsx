import React from "https://esm.sh/react@18";

interface Book {
  uri: string;
  cid: string;
  value: {
    $type: "buzz.bookhive.book";
    title: string;
    authors?: string;
    hiveId: string;
    status: string;
    cover?: {
      ref: any; // Can be CID object or string
      mimeType: string;
      size: number;
    };
    createdAt: string;
  };
}

interface BookSectionProps {
  books: Book[];
  pdsUrl?: string;
}

export function BookSection({ books, pdsUrl }: BookSectionProps) {
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

  const getCoverImageUrl = (book: Book): string | null => {
    if (!book.value.cover?.ref || !pdsUrl) {
      return null;
    }

    // Handle both CID object and string formats
    let cid: string;
    if (typeof book.value.cover.ref === "string") {
      cid = book.value.cover.ref;
    } else if (book.value.cover.ref.$link) {
      cid = book.value.cover.ref.$link;
    } else if (book.value.cover.ref.toString) {
      // For CID objects, convert to string
      cid = book.value.cover.ref.toString();
    } else {
      console.log("Unknown cover ref format:", book.value.cover.ref);
      return null;
    }

    // Extract DID from the book URI (at://did:plc:xyz/collection/rkey)
    const did = book.uri.split("/")[2];

    // Construct the blob URL
    const blobUrl =
      `${pdsUrl}/xrpc/com.atproto.sync.getBlob?did=${did}&cid=${cid}`;
    console.log(`Constructing blob URL for ${book.value.title}: ${blobUrl}`);
    return blobUrl;
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "buzz.bookhive.defs#wantToRead":
        return "Want to Read";
      case "buzz.bookhive.defs#reading":
        return "Reading";
      case "buzz.bookhive.defs#finished":
        return "Finished";
      default:
        return status.replace("buzz.bookhive.defs#", "");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "buzz.bookhive.defs#wantToRead":
        return "#4f46e5"; // Darker indigo
      case "buzz.bookhive.defs#reading":
        return "#d97706"; // Darker amber
      case "buzz.bookhive.defs#finished":
        return "#059669"; // Darker emerald
      default:
        return "#4b5563"; // Darker gray
    }
  };

  return (
    <section aria-labelledby="books-heading">
      <style>
        {`
        .books-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .books-link {
          color: #cc0055;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .books-link:hover {
          text-decoration: underline;
        }

        .books-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        @media (min-width: 800px) {
          .books-list {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .books-list {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        .book-item {
          display: block;
          text-decoration: none;
          color: inherit;
        }

        .book-item:hover {
          text-decoration: none;
        }

        .book-card {
          padding: 1rem;
          background: #f5f1e8;
          border-left: 3px solid #8b4513;
          border-radius: 0 4px 4px 0;
          transition: all 0.2s ease;
          user-select: none;
          height: 100%;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 4px rgba(139, 69, 19, 0.1);
        }

        .book-content {
          display: flex;
          gap: 0.75rem;
          height: 100%;
        }

        .book-cover {
          width: 60px;
          height: 90px;
          flex-shrink: 0;
          border-radius: 4px;
          object-fit: cover;
          background: #e6dcc6;
          border: 1px solid #d4c4a8;
        }

        .book-details {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .book-item:hover .book-card {
          background: #f0ebe0;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(139, 69, 19, 0.15);
        }

        .book-item:active .book-card {
          transform: translateY(0px);
          background: #ede6d7;
          box-shadow: 0 2px 4px rgba(139, 69, 19, 0.12);
        }

        .book-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
        }

        .book-title {
          font-weight: 600;
          color: #2c1810;
          margin: 0;
          font-size: 1rem;
          line-height: 1.3;
          flex-grow: 1;
        }

        .book-status {
          font-size: 0.75rem;
          font-weight: 500;
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          color: white;
          margin-left: 0.75rem;
          white-space: nowrap;
        }

        .book-date {
          color: #6b3410;
          font-size: 0.8rem;
          margin-bottom: 0.75rem;
        }

        .book-description {
          color: #2c1810;
          opacity: 0.8;
          font-size: 0.9rem;
          line-height: 1.4;
          flex-grow: 1;
        }

        .book-rating {
          color: #ff0066;
          font-size: 0.8rem;
          margin-top: 0.5rem;
        }
      `}
      </style>

      <div className="books-header">
        <h2 id="books-heading">Book Updates</h2>
        <a
          href="https://bookhive.buzz/profile/tijs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="books-link"
        >
          View all book updates →
        </a>
      </div>

      <div className="books-list">
        {books.map((book) => (
          <a
            key={book.uri}
            href={`https://bookhive.buzz/books/${book.value.hiveId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="book-item"
          >
            <div className="book-card">
              <div className="book-content">
                {getCoverImageUrl(book) && (
                  <img
                    src={getCoverImageUrl(book)!}
                    alt={`Cover of ${book.value.title}`}
                    className="book-cover"
                    loading="lazy"
                  />
                )}
                <div className="book-details">
                  <div className="book-header">
                    <h3 className="book-title">{book.value.title}</h3>
                    <span
                      className="book-status"
                      style={{
                        backgroundColor: getStatusColor(book.value.status),
                      }}
                    >
                      {getStatusLabel(book.value.status)}
                    </span>
                  </div>
                  <div className="book-date">
                    {formatDate(book.value.createdAt)}
                  </div>
                  {book.value.authors && (
                    <div className="book-description">
                      by {book.value.authors}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
