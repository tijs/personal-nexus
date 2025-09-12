import React from "https://esm.sh/react@18";

export function ProfileHeader() {
  return (
    <header>
      <div className="profile-container">
        <style>
          {`
          .profile-container {
            text-align: center;
            margin-bottom: 3rem;
          }

          .profile-image {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            margin: 0 auto 1rem auto;
            display: block;
            border: 4px solid #934790;
            filter: drop-shadow(0 0 10px rgba(147, 71, 144, 0.3));
          }

          .profile-name {
            font-family: 'Caprasimo', serif;
            font-size: 2.5rem;
            color: #6a0066;
            margin-bottom: 0.5rem;
            font-weight: 400;
          }

          .profile-title {
            font-size: 1.3rem;
            color: #ff0066;
            font-weight: 600;
            margin-bottom: 0.5rem;
          }

          .profile-location {
            font-size: 1rem;
            color: #6a0066;
            opacity: 0.8;
            margin-bottom: 0.5rem;
          }

          .profile-work {
            font-size: 1rem;
            color: #6a0066;
            opacity: 0.8;
            margin-bottom: 1rem;
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
