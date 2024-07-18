import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import logo from './assets/logo.png'; // Adjust the path as necessary

const Sidebar = () => {
  return (
    <div className="bg-white sidebar p-2">
      <div className="brand-container d-flex align-items-center mb-3">
        <img src={logo} alt="Logo" className="logo me-2" />
        <span className="brand-name fs-4">Mobi-Budget</span>
      </div>
      <hr className="text-dark" />
      <div className="list-group list-group-flush">
        <NavLink to="/dashboard" className="list-group-item py-2 btn btn-link" activeClassName="active">
          <i className="bi bi-speedometer2 fs-5 me-3"></i>
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/transactions" className="list-group-item py-2 btn btn-link" activeClassName="active">
          <i className="bi bi-house fs-4 me-3"></i>
          <span>Transactions</span>
        </NavLink>
        <NavLink to="/resources" className="list-group-item py-2 btn btn-link" activeClassName="active">
          <i className="bi bi-table fs-5 me-3"></i>
          <span>Sources</span>
        </NavLink>
        <NavLink to="/userprofile" className="list-group-item py-2 btn btn-link" activeClassName="active">
          <i className="bi bi-clipboard-data fs-5 me-3"></i>
          <span>Profile</span>
        </NavLink>
        <NavLink to="/settings" className="list-group-item py-2 btn btn-link" activeClassName="active">
          <i className="bi bi-people fs-5 me-3"></i>
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
