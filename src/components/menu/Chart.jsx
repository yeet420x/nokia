import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../styles/Chart.css';

function Chart({ onBack }) {
  const chartUrl = "https://dexscreener.com";

  useEffect(() => {
    window.open(chartUrl, '_blank');
  }, []);

  return (
    <div className="chart-screen">
      <div className="redirect-container">
        <div className="redirect-message">
          Opening Chart...
        </div>
        <button 
          className="redirect-button"
          onClick={() => window.open(chartUrl, '_blank')}
        >
          Click here if it doesn't open automatically
        </button>
      </div>
      <button className="back-button" onClick={onBack}>Back</button>
    </div>
  );
}

Chart.propTypes = {
  onBack: PropTypes.func.isRequired
};

export default Chart; 
