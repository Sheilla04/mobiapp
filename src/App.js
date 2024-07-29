
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import TransactionsPage from './pages/TransactionsPage';
import TransactionInputPage from './pages/TransactionInputPage';
import UserProfile from './pages/UserProfile';
import Settings from './pages/Settings';
import ProtectedRoute from './ProtectedRoute';
import Layout from './Layout';
import './styles/App.css';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Layout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
                <TransactionsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactioninput"
          element={
            <ProtectedRoute>
              <Layout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
                <TransactionInputPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/userprofile"
          element={
            <ProtectedRoute>
              <Layout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
                <UserProfile />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Layout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
                <Settings />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;