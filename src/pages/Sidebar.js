


// Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';
import logo from '../assets/logo.png';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-content">
        <div className="brand-container">
          <img src={logo} alt="Logo" className="logo" />
          <span className="brand-name">Mobi-Budget</span>
        </div>
        <hr className="text-dark" />
        <div className="list-group list-group-flush">
          <NavLink to="/dashboard" className="list-group-item py-2" activeClassName="active">
            <i className="bi bi-house-door fs-5 me-3"></i>
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/transactions" className="list-group-item py-2" activeClassName="active">
            <i className="bi bi-credit-card fs-4 me-3"></i>
            <span>Transactions</span>
          </NavLink>
          <NavLink to="/transactioninput" className="list-group-item py-2" activeClassName="active">
            <i className="bi bi-bar-chart fs-5 me-3"></i>
            <span>Tarrif Compare</span>
          </NavLink>
          <NavLink to="/userprofile" className="list-group-item py-2" activeClassName="active">
            <i className="bi bi-person fs-5 me-3"></i>
            <span>Profile</span>
          </NavLink>
          <NavLink to="/settings" className="list-group-item py-2" activeClassName="active">
            <i className="bi bi-gear fs-5 me-3"></i>
            <span>Settings</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;