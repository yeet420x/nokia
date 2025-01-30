import React, { useState, useEffect } from 'react';
import '../styles/Interface.css';
import Contract from './menu/Contract';
import Buy from './menu/Buy';
import Chart from './menu/Chart';
import Tokenomics from './menu/Tokenomics';
import Socials from './menu/Socials';
import Snake from './menu/Snake';
import xIcon from '../assets/x.svg';
import tgIcon from '../assets/tg.svg';
import dexIcon from '../assets/dexscreener.svg';

function Interface() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentScreen, setCurrentScreen] = useState('menu');
  const [previousScreen, setPreviousScreen] = useState([]);
  const [typingMode, setTypingMode] = useState(false);
  const [typedText, setTypedText] = useState('');

  const menuItems = [
    { icon: '📜', label: 'Contract', component: Contract },
    { icon: '💎', label: 'Buy', component: Buy },
    { 
      icon: <img src={dexIcon} alt="DexScreener" className="menu-icon" />, 
      label: 'Chart', 
      component: Chart 
    },
    { icon: '💰', label: 'Tokenomics', component: Tokenomics },
    { 
      icon: <img src={xIcon} alt="X" className="menu-icon" />, 
      label: 'X', 
      component: Socials 
    },
    { 
      icon: <img src={tgIcon} alt="Telegram" className="menu-icon" />, 
      label: 'Telegram', 
      component: Socials 
    },
    { icon: '🎮', label: 'Snake', component: Snake }
  ];

  const handleEscape = () => {
    if (typingMode) {
      setTypingMode(false);
      setTypedText('');
    } else if (currentScreen !== 'menu') {
      handleBack();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault(); // Prevent default browser behavior
      handleEscape();
      return;
    }

    if (typingMode) {
      if (/^[0-9*#]$/.test(e.key)) {
        setTypedText(prev => prev + e.key);
      }
      return;
    }

    if (currentScreen === 'menu') {
      if (/^[0-9*#]$/.test(e.key)) {
        setTypingMode(true);
        setTypedText(e.key);
        return;
      }

      switch(e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex(prev => {
            const newIndex = prev > 0 ? prev - 1 : menuItems.length - 1;
            const menuItem = document.querySelector(`.menu-item:nth-child(${newIndex + 1})`);
            menuItem?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            return newIndex;
          });
          break;
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex(prev => {
            const newIndex = prev < menuItems.length - 1 ? prev + 1 : 0;
            const menuItem = document.querySelector(`.menu-item:nth-child(${newIndex + 1})`);
            menuItem?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            return newIndex;
          });
          break;
        case 'Enter':
          e.preventDefault();
          const selectedItem = menuItems[activeIndex];
          setPreviousScreen(prev => [...prev, currentScreen]);
          setCurrentScreen(selectedItem.label.toLowerCase());
          break;
        default:
          break;
      }
    }
  };

  const handleBack = () => {
    if (previousScreen.length > 0) {
      const lastScreen = previousScreen[previousScreen.length - 1];
      setPreviousScreen(prev => prev.slice(0, -1));
      setCurrentScreen(lastScreen);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScreen, activeIndex, typingMode]);

  const handleButtonClick = (direction) => {
    const event = { key: `Arrow${direction}` };
    handleKeyDown(event);
  };

  if (typingMode) {
    return (
      <div className="nokia-interface">
        <div className="status-bar">
          <span className="signal">||||</span>
          <span className="clock">12:00</span>
          <span className="battery">███</span>
        </div>
        <div className="typing-screen">
          <div className="typed-text">{typedText}</div>
          <div className="typing-hint">Press Esc to exit</div>
        </div>
      </div>
    );
  }

  if (currentScreen !== 'menu') {
    const CurrentComponent = menuItems.find(
      item => item.label.toLowerCase() === currentScreen
    )?.component;

    return CurrentComponent ? (
      <div className="nokia-interface">
        <div className="status-bar">
          <span className="signal">||||</span>
          <span className="clock">12:00</span>
          <span className="battery">███</span>
        </div>
        <CurrentComponent onBack={handleBack} />
      </div>
    ) : null;
  }

  return (
    <div className="interface-container">
      <div className="nokia-interface">
        <div className="status-bar">
          <span className="signal">||||</span>
          <span className="clock">12:00</span>
          <span className="battery">███</span>
        </div>
        <div className="content">
          <header className="screen-title">Menu</header>
          <div className="menu-grid">
            {menuItems.map((item, index) => (
              <div 
                key={item.label} 
                className={`menu-item ${index === activeIndex ? 'active' : ''}`}
                onClick={() => {
                  setActiveIndex(index);
                  handleKeyDown({ key: 'Enter' });
                }}
              >
                <div className="icon">{item.icon}</div>
                <div className="label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="external-controls">
        <div className="navigation-hints">
          <div className="hint-section">
            <div className="hint-title">Controls</div>
            <div className="hint-item">Select (Enter)</div>
            <div className="hint-item">Back (Esc)</div>
            <div className="hint-item">Navigate (↑ ↓ ← →)</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Interface; 