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
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return dateString; // Return original string if invalid
      }
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return dateString; // Return original string if error
    }
  };

  const extractSummary = (html: string, summary?: string) => {
    if (summary) return summary;

    // Simple HTML stripping and truncation
    const text = html.replace(/<[^>]*>/g, "").trim();
    return text.length > 150 ? text.substring(0, 150) + "..." : text;
  };

  return (
    <section>
      <style>
        {`
        .posts-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .posts-link {
          color: #ff0066;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .posts-link:hover {
          text-decoration: underline;
        }

        .posts-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        @media (min-width: 800px) {
          .posts-list {
            grid-template-columns: repeat(3, 1fr);
          }
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
          padding: 1rem;
          border-left: 3px solid rgb(32, 113, 227);
          background: rgb(255, 254, 245);
          border-radius: 0 4px 4px 0;
          transition: all 0.2s ease;
          user-select: none;
          height: 100%;
          display: flex;
          flex-direction: column;
          box-shadow: 0 1px 3px rgba(32, 113, 227, 0.1);
        }

        .post-item:hover .post-card {
          background: rgb(252, 251, 242);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(32, 113, 227, 0.15);
        }

        .post-item:active .post-card {
          transform: translateY(0px);
          background: rgb(250, 249, 240);
          box-shadow: 0 2px 6px rgba(32, 113, 227, 0.12);
        }

        .post-title {
          font-weight: 600;
          color: rgb(39, 39, 39);
          margin-bottom: 0.5rem;
          font-size: 1rem;
          line-height: 1.3;
        }

        .post-date {
          color: rgb(32, 113, 227);
          font-size: 0.8rem;
          margin-bottom: 0.75rem;
        }

        .post-summary {
          color: rgb(39, 39, 39);
          opacity: 0.7;
          font-size: 0.9rem;
          line-height: 1.4;
          flex-grow: 1;
        }
      `}
      </style>

      <div className="posts-header">
        <h2>Posts</h2>
        <a
          href="https://tijs.leaflet.pub/"
          target="_blank"
          rel="noopener noreferrer"
          className="posts-link"
        >
          View all posts →
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
              <h3 className="post-title">{post.title}</h3>
              <div className="post-date">{formatDate(post.date_modified)}</div>
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
