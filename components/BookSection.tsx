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

    let cid: string;
    if (typeof book.value.cover.ref === "string") {
      cid = book.value.cover.ref;
    } else if (book.value.cover.ref.$link) {
      cid = book.value.cover.ref.$link;
    } else if (book.value.cover.ref.toString) {
      cid = book.value.cover.ref.toString();
    } else {
      console.log("Unknown cover ref format:", book.value.cover.ref);
      return null;
    }

    const did = book.uri.split("/")[2];
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
        return { bg: "rgba(79, 70, 229, 0.1)", text: "#4f46e5" };
      case "buzz.bookhive.defs#reading":
        return { bg: "rgba(217, 119, 6, 0.1)", text: "#b45309" };
      case "buzz.bookhive.defs#finished":
        return { bg: "rgba(5, 150, 105, 0.1)", text: "#047857" };
      default:
        return { bg: "rgba(75, 85, 99, 0.1)", text: "#4b5563" };
    }
  };

  return (
    <section aria-labelledby="books-heading">
      <style>
        {`
        .books-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 1.25rem;
        }

        .books-link {
          color: var(--color-text-muted);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          transition: color var(--transition);
        }

        .books-link:hover {
          color: var(--color-accent);
          text-decoration: none;
        }

        .books-list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
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

        .book-content {
          display: flex;
          gap: 1rem;
          height: 100%;
        }

        .book-cover {
          width: 56px;
          height: 84px;
          flex-shrink: 0;
          border-radius: 4px;
          object-fit: cover;
          background: var(--color-accent-soft);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .book-details {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .book-item:hover .book-card {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: rgba(93, 45, 110, 0.15);
        }

        .book-item:active .book-card {
          transform: translateY(0);
        }

        .book-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 0.5rem;
          margin-bottom: 0.35rem;
        }

        .book-title {
          font-weight: 600;
          color: var(--color-text);
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.35;
          flex-grow: 1;
        }

        .book-status {
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.2rem 0.5rem;
          border-radius: 6px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .book-date {
          color: var(--color-text-muted);
          font-size: 0.8rem;
          margin-bottom: 0.35rem;
          font-weight: 500;
        }

        .book-authors {
          color: var(--color-text-muted);
          font-size: 0.85rem;
          line-height: 1.4;
          flex-grow: 1;
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
          View all book updates &rarr;
        </a>
      </div>

      <div className="books-list">
        {books.map((book) => {
          const statusColor = getStatusColor(book.value.status);
          return (
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
                          backgroundColor: statusColor.bg,
                          color: statusColor.text,
                        }}
                      >
                        {getStatusLabel(book.value.status)}
                      </span>
                    </div>
                    <div className="book-date">
                      {formatDate(book.value.createdAt)}
                    </div>
                    {book.value.authors && (
                      <div className="book-authors">
                        by {book.value.authors}
                      </div>
                    )}
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
