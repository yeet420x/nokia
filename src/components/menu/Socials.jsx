import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../styles/Socials.css';

function Socials({ onBack, type }) {
  const urls = {
    X: "https://twitter.com/i/communities/1948535010773844010",
    Telegram: "https://t.me/"
  };

  useEffect(() => {
    const socialUrl = urls[type];
    try {
      window.location.href = socialUrl;
    } catch (error) {
      console.error(`Failed to open ${type} URL:`, error);
      alert(`Please click here to open ${type}: ` + socialUrl);
    }
  }, [type]);

  return (
    <div className="socials-screen">
      <div className="redirect-container">
        <div className="redirect-message">
          Opening {type}...
        </div>
        <button 
          className="redirect-button"
          onClick={() => {
            const socialUrl = urls[type];
            try {
              window.location.href = socialUrl;
            } catch (error) {
              console.error(`Failed to open ${type} URL:`, error);
              alert(`Please click here to open ${type}: ` + socialUrl);
            }
          }}
        >
          Click here if it doesn't open automatically
        </button>
      </div>
      <button className="back-button" onClick={onBack}>Back</button>
    </div>
  );
}

Socials.propTypes = {
  onBack: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['X', 'Telegram']).isRequired
};

export default Socials; 
