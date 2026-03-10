import React from "https://esm.sh/react@18";

export function ProfileHeader() {
  return (
    <header>
      <div className="profile-container">
        <style>
          {`
          .profile-container {
            text-align: center;
            margin-bottom: 3.5rem;
            padding-top: 1rem;
          }

          .profile-image {
            width: 110px;
            height: 110px;
            border-radius: 50%;
            margin: 0 auto 1.25rem auto;
            display: block;
            border: 3px solid rgba(92, 45, 110, 0.15);
            box-shadow: 0 4px 20px rgba(45, 27, 51, 0.1);
          }

          .profile-name {
            font-family: 'Caprasimo', serif;
            font-size: 2.25rem;
            color: var(--color-primary);
            margin-bottom: 0.3rem;
            font-weight: 400;
            letter-spacing: -0.02em;
          }

          .profile-title {
            font-size: 1.1rem;
            color: var(--color-accent);
            font-weight: 500;
            margin-bottom: 0.3rem;
          }

          .profile-location {
            font-size: 0.95rem;
            color: var(--color-text-muted);
            margin-bottom: 0.5rem;
          }
        `}
        </style>

        <img
          src="https://github.com/tijs.png"
          alt="Tijs Teulings"
          className="profile-image"
        />
        <h1 className="profile-name">Tijs Teulings</h1>
        <p className="profile-title">Creative Technologist</p>
        <p className="profile-location">Den Haag, NL</p>
      </div>
    </header>
  );
}
