import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Contract({ onBack }) {
  const [copyStatus, setCopyStatus] = useState('');
  const contractAddress = "EPtsEr77iEX5fhRkHSQaSGGuBPd5cjT5pbo6Vvu5pump";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus(''), 2000);
    } catch (err) {
      setCopyStatus('Failed to copy');
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleCopy();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="menu-screen">
      <header className="screen-title">Contract</header>
      <div className="content scrollable">
        <div className="contract-info">
          <p className="address">{contractAddress}</p>
          <p className="copy-status">{copyStatus}</p>
          <p className="hint">Press Enter to copy address</p>
          <button className="action-btn" onClick={handleCopy}>
            Copy Address
          </button>
          <div className="contract-links">
            <a href={`https://solscan.io/address/${contractAddress}`} target="_blank" rel="noopener noreferrer">
              View on Solscan
            </a>
          </div>
        </div>
      </div>
      <div className="navigation">
        <button onClick={onBack}>Back (Esc)</button>
      </div>
    </div>
  );
}

Contract.propTypes = {
  onBack: PropTypes.func.isRequired
};

export default Contract;
