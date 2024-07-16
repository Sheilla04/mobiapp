// TopNavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const TopNavBar = () => {
  const navBarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffebcd', // Light brown color to match the theme
    padding: '10px 20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 1000,
  };

  const navItemStyle = {
    color: '#333', // Dark text color for contrast
    textDecoration: 'none',
    marginLeft: '20px',
    fontSize: '16px',
    fontWeight: 'bold',
  };

  return (
    <nav style={navBarStyle}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src="logo.png" // Replace with your logo image path
          alt="Logo"
          style={{ height: '40px', marginRight: '20px' }}
        />
        <Link to="/" style={navItemStyle}>Dashboard</Link>
        <Link to="/transactions" style={navItemStyle}>Transactions</Link>
        <Link to="/sources" style={navItemStyle}>Sources</Link>
        <Link to="/profile" style={navItemStyle}>Profile</Link>
      </div>
      <Link to="/settings" style={navItemStyle}>Settings</Link>
    </nav>
  );
};

export default TopNavBar;