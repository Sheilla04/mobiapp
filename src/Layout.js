

import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './pages/Sidebar';
import TopNavBar from './pages/TopNavBar';

const Layout = ({ children, toggleSidebar, isSidebarOpen }) => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/login' && location.pathname !== '/signup';

  return (
    <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      {showNavbar && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
      <div className="content">
        {showNavbar && <TopNavBar toggleSidebar={toggleSidebar} />}
        <div className="main-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;