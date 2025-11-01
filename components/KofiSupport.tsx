import React from "https://esm.sh/react@18";

export function KofiSupport() {
  return (
    <div className="kofi-support">
      <style>
        {`
        .kofi-support {
          width: 100%;
          padding: 2rem 1.5rem;
          margin-bottom: 1.5rem;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 8px;
          text-align: center;
        }

        .kofi-support-message {
          color: #6a0066;
          margin-bottom: 1rem;
          font-size: 1rem;
          line-height: 1.6;
        }

        .kofi-support-button-wrapper {
          display: inline-block;
        }

        .kofi-support-button-wrapper:hover {
          opacity: 0.85;
          transition: opacity 0.2s ease;
        }
      `}
      </style>

      <div className="kofi-support-message">
        If you find these projects helpful and they've saved you some time,
        consider buying me a coffee! It helps me keep building open source
        tools. ☕
      </div>
      <div className="kofi-support-button-wrapper">
        <a href="https://ko-fi.com/D1D6P4LAR" target="_blank">
          <img
            height="36"
            style={{ border: 0, height: "36px" }}
            src="https://storage.ko-fi.com/cdn/kofi6.png?v=6"
            border="0"
            alt="Buy Me a Coffee at ko-fi.com"
          />
        </a>
      </div>
    </div>
  );
}
