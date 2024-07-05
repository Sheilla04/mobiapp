// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import TopNavBar from './TopNavBar';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import TransactionsPage from './TransactionsPage';
import ResourcesPage from './ResourcesPage';
import UserProfile from './UserProfile';
import Settings from './Settings';
import Sidebar from './Sidebar';
import './App.css'; // Import the CSS file
import './Dashboard.css'; // Import the Dashboard CSS
import './TransactionsPage.css'; // Import the TransactionsPage CSS
import './ResourcesPage.css'; // Import the ResourcesPage CSS
import './UserProfile.css'; // Import the UserProfile CSS
import './Settings.css';// Import the Settings.css
import './Sidebar.css'; // Import the Sidebar.css

const Layout = ({ children }) => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/login' && location.pathname !== '/signup';

  return (
    <div className="app-container">
      {showNavbar && <TopNavBar/> && <Sidebar /> }
      <div className="content">
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Layout><Login /></Layout>} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/transactions" element={<Layout><TransactionsPage /></Layout>} />
        <Route path="/resources" element={<Layout><ResourcesPage /></Layout>} />
        <Route path="/userprofile" element={<Layout><UserProfile /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;


