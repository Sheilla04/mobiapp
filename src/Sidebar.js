import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import logo from './assets/logo.png'; // Adjust the path as necessary

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar">
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Mobi-Budget</h2>
      </div>
      <nav>
        <ul className={isOpen ? 'visible' : 'hidden'}>
          <li><NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink></li>
          <li><NavLink to="/transactions" activeClassName="active">Transactions</NavLink></li>
          <li><NavLink to="/resources" activeClassName="active">Sources</NavLink></li>
          <li><NavLink to="/userprofile" activeClassName="active">Profile</NavLink></li>
          <li><NavLink to="/settings" activeClassName="active">Settings</NavLink></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

