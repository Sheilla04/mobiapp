import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopNavBar from './pages/TopNavBar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import TransactionsPage from './pages/TransactionsPage';
import TransactionInputPage from './pages/TransactionInputPage';
import UserProfile from './pages/UserProfile';
import Settings from './pages/Settings';
import Sidebar from './pages/Sidebar';
import './styles/App.css';
import './styles/Dashboard.css';
import './styles/TransactionsPage.css';
import './styles/TransactionInputPage.css';
import './styles/UserProfile.css';
import './styles/Settings.css';
import './styles/Sidebar.css';


const Layout = ({ children }) => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/login' && location.pathname !== '/signup';

  return (
    <div className="">
      {showNavbar && <Sidebar />}
      <div className="content">
        {showNavbar && <TopNavBar />}
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Layout><Login /></Layout>} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/transactions" element={<Layout><TransactionsPage /></Layout>} />
        <Route path="/transactioninput" element={<Layout><TransactionInputPage /></Layout>} />
        <Route path="/userprofile" element={<Layout><UserProfile /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;


