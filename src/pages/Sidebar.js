

// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import '../styles/Sidebar.css';
// import logo from '../assets/logo.png'; // Adjust the path as necessary

// const Sidebar = () => {
//   return (
//     <div className="bg-white sidebar p-2">
//       <div className="brand-container d-flex align-items-center mb-3">
//         <img src={logo} alt="Logo" className="logo me-2" />
//         <span className="brand-name">Mobi-Budget</span>
//       </div>
//       <hr className="text-dark" />
//       <div className="list-group list-group-flush">
//         <NavLink to="/dashboard" className="list-group-item py-2 btn btn-link" activeClassName="active">
//           <i className="bi bi-house-door fs-5 me-3"></i>
//           <span>Dashboard</span>
//         </NavLink>
//         <NavLink to="/transactions" className="list-group-item py-2 btn btn-link" activeClassName="active">
//           <i className="bi bi-credit-card fs-4 me-3"></i>
//           <span>Transactions</span>
//         </NavLink>
//         <NavLink to="/transactioninput" className="list-group-item py-2 btn btn-link" activeClassName="active">
//           <i className="bi bi-bar-chart fs-5 me-3"></i>
//           <span>Tarrif Compare</span>
//         </NavLink>
//         <NavLink to="/userprofile" className="list-group-item py-2 btn btn-link" activeClassName="active">
//           <i className="bi bi-person fs-5 me-3"></i>
//           <span>Profile</span>
//         </NavLink>
//         <NavLink to="/settings" className="list-group-item py-2 btn btn-link" activeClassName="active">
//           <i className="bi bi-gear fs-5 me-3"></i>
//           <span>Settings</span>
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';
import logo from '../assets/logo.png'; // Adjust the path as necessary
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>
      <div className={`bg-white sidebar p-2 ${isOpen ? 'open' : ''}`}>
        <div className="brand-container d-flex align-items-center mb-3">
          <img src={logo} alt="Logo" className="logo me-2" />
          <span className="brand-name">Mobi-Budget</span>
        </div>
        <hr className="text-dark" />
        <div className="list-group list-group-flush">
          <NavLink to="/dashboard" className="list-group-item py-2 btn btn-link" activeClassName="active">
            <i className="bi bi-house-door fs-5 me-3"></i>
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/transactions" className="list-group-item py-2 btn btn-link" activeClassName="active">
            <i className="bi bi-credit-card fs-4 me-3"></i>
            <span>Transactions</span>
          </NavLink>
          <NavLink to="/transactioninput" className="list-group-item py-2 btn btn-link" activeClassName="active">
            <i className="bi bi-bar-chart fs-5 me-3"></i>
            <span>Tarrif Compare</span>
          </NavLink>
          <NavLink to="/userprofile" className="list-group-item py-2 btn btn-link" activeClassName="active">
            <i className="bi bi-person fs-5 me-3"></i>
            <span>Profile</span>
          </NavLink>
          <NavLink to="/settings" className="list-group-item py-2 btn btn-link" activeClassName="active">
            <i className="bi bi-gear fs-5 me-3"></i>
            <span>Settings</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
