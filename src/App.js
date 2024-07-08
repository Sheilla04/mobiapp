// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { auth } from './config/firebase-config';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import TransactionsPage from './TransactionsPage';
import ResourcesPage from './ResourcesPage';
import UserProfile from './UserProfile';
import Settings from './Settings';
import Sidebar from './Sidebar';
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component
import './App.css'; // Import the CSS file
import './Dashboard.css'; // Import the Dashboard CSS
import './TransactionsPage.css'; // Import the TransactionsPage CSS
import './ResourcesPage.css'; // Import the ResourcesPage CSS
import './UserProfile.css'; // Import the UserProfile CSS
import './Settings.css'; // Import the Settings.css
import './Sidebar.css'; // Import the Sidebar.css

const Layout = ({ children }) => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/login' && location.pathname !== '/signup';

  return (
    <div className="app-container">
      {showNavbar && <Sidebar />}
      <div className="content">
        {children}
      </div>
    </div>
  );
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Layout>{user ? <Dashboard /> : <Login />}</Layout>} />
        <Route path="/dashboard" element={
          <ProtectedRoute user={user}>
            <Layout><Dashboard /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/transactions" element={
          <ProtectedRoute user={user}>
            <Layout><TransactionsPage /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/resources" element={
          <ProtectedRoute user={user}>
            <Layout><ResourcesPage /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/userprofile" element={
          <ProtectedRoute user={user}>
            <Layout><UserProfile /></Layout>
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute user={user}>
            <Layout><Settings /></Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;



