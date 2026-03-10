import React from "https://esm.sh/react@18";

interface Post {
  id: string;
  title: string;
  content_html: string;
  url: string;
  date_modified: string;
  summary?: string;
}

interface PostsSectionProps {
  posts: Post[];
}

export function PostsSection({ posts }: PostsSectionProps) {
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

  const extractSummary = (html: string, summary?: string) => {
    if (summary) return summary;
    const text = html.replace(/<[^>]*>/g, "").trim();
    return text.length > 150 ? text.substring(0, 150) + "..." : text;
  };

  return (
    <section aria-labelledby="posts-heading">
      <style>
        {`
        .posts-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 1.25rem;
        }

        .posts-link {
          color: var(--color-text-muted);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          transition: color var(--transition);
        }

        .posts-link:hover {
          color: var(--color-accent);
          text-decoration: none;
        }

        .posts-list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }

        @media (max-width: 768px) {
          .posts-list {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        .post-item {
          display: block;
          text-decoration: none;
          color: inherit;
        }

        .post-item:hover {
          text-decoration: none;
        }

        .post-card {
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

        .post-item:hover .post-card {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: rgba(93, 45, 110, 0.15);
        }

        .post-item:active .post-card {
          transform: translateY(0);
        }

        .post-date {
          color: var(--color-text-muted);
          font-size: 0.8rem;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .post-title {
          font-weight: 600;
          color: var(--color-text);
          margin-bottom: 0.5rem;
          font-size: 1rem;
          line-height: 1.35;
        }

        .post-summary {
          color: var(--color-text-muted);
          font-size: 0.88rem;
          line-height: 1.5;
          flex-grow: 1;
        }
      `}
      </style>

      <div className="posts-header">
        <h2 id="posts-heading">Recent Posts</h2>
        <a
          href="https://tijs.leaflet.pub/"
          target="_blank"
          rel="noopener noreferrer"
          className="posts-link"
        >
          View all posts &rarr;
        </a>
      </div>

      <div className="posts-list">
        {posts.map((post) => (
          <a
            key={post.id}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="post-item"
          >
            <div className="post-card">
              <div className="post-date">{formatDate(post.date_modified)}</div>
              <h3 className="post-title">{post.title}</h3>
              <div className="post-summary">
                {extractSummary(post.content_html, post.summary)}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
