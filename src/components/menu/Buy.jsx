import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../styles/Buy.css';

function Buy({ onBack }) {
  const buyUrl = "https://pump.fun/";

  useEffect(() => {
    window.open(buyUrl, '_blank');
  }, []);

  return (
    <div className="buy-screen">
      <div className="redirect-container">
        <div className="redirect-message">
          Opening Buy...
        </div>
        <button 
          className="redirect-button"
          onClick={() => window.open(buyUrl, '_blank')}
        >
          Click here if it doesn't open automatically
        </button>
      </div>
      <button className="back-button" onClick={onBack}>Back</button>
    </div>
  );
}

Buy.propTypes = {
  onBack: PropTypes.func.isRequired
};

export default Buy; 
