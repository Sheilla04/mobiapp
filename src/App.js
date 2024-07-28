
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import TopNavBar from './pages/TopNavBar';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Dashboard from './pages/Dashboard';
// import TransactionsPage from './pages/TransactionsPage';
// import TransactionInputPage from './pages/TransactionInputPage';
// import UserProfile from './pages/UserProfile';
// import Settings from './pages/Settings';
// import Sidebar from './pages/Sidebar';
// import ProtectedRoute from './ProtectedRoute';
// import './styles/App.css';
// import './styles/Dashboard.css';
// import './styles/TransactionsPage.css';
// import './styles/TransactionInputPage.css';
// import './styles/UserProfile.css';
// import './styles/Settings.css';
// import './styles/Sidebar.css';

// const Layout = ({ children }) => {
//   const location = useLocation();
//   const showNavbar = location.pathname !== '/login' && location.pathname !== '/signup';

//   return (
//     <div>
//       {showNavbar && <Sidebar />}
//       <div className="content">
//         {showNavbar && <TopNavBar />}
//         {children}
//       </div>
//     </div>
//   );
// };

// function App() {
//   return (
//     <Router>
//       <ToastContainer />
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={<Layout><ProtectedRoute element={Dashboard} /></Layout>} />
//         <Route path="/transactions" element={<Layout><ProtectedRoute element={TransactionsPage} /></Layout>} />
//         <Route path="/transactioninput" element={<Layout><ProtectedRoute element={TransactionInputPage} /></Layout>} />
//         <Route path="/userprofile" element={<Layout><ProtectedRoute element={UserProfile} /></Layout>} />
//         <Route path="/settings" element={<Layout><ProtectedRoute element={Settings} /></Layout>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
// src/App.js
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes,useLocation } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import TopNavBar from './pages/TopNavBar';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Dashboard from './pages/Dashboard';
// import TransactionsPage from './pages/TransactionsPage';
// import TransactionInputPage from './pages/TransactionInputPage';
// import UserProfile from './pages/UserProfile';
// import Settings from './pages/Settings';
// import Sidebar from './pages/Sidebar';
// import ProtectedRoute from './ProtectedRoute';
// import './styles/App.css';
// import './styles/Dashboard.css';
// import './styles/TransactionsPage.css';
// import './styles/TransactionInputPage.css';
// import './styles/UserProfile.css';
// import './styles/Settings.css';
// import './styles/Sidebar.css';

// const Layout = ({ children, toggleSidebar, isSidebarOpen }) => {
//   const location = useLocation();
//   const showNavbar = location.pathname !== '/login' && location.pathname !== '/signup';

//   return (
//     <div>
//       {showNavbar && <Sidebar isOpen={isSidebarOpen} />}
//       <div className="content">
//         {showNavbar && <TopNavBar toggleSidebar={toggleSidebar} />}
//         {children}
//       </div>
//     </div>
//   );
// };

// function App() {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <Router>
//       <ToastContainer />
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Layout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
//                 <Dashboard />
//               </Layout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/transactions"
//           element={
//             <ProtectedRoute>
//               <Layout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
//                 <TransactionsPage />
//               </Layout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/transactioninput"
//           element={
//             <ProtectedRoute>
//               <Layout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
//                 <TransactionInputPage />
//               </Layout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/userprofile"
//           element={
//             <ProtectedRoute>
//               <Layout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
//                 <UserProfile />
//               </Layout>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/settings"
//           element={
//             <ProtectedRoute>
//               <Layout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
//                 <Settings />
//               </Layout>
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React, { useState } from 'react';
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
import ProtectedRoute from './ProtectedRoute';
import './styles/App.css';
import './styles/Dashboard.css';
import './styles/TransactionsPage.css';
import './styles/TransactionInputPage.css';
import './styles/UserProfile.css';
import './styles/Settings.css';
import './styles/Sidebar.css';

const Layout = ({ children, toggleSidebar, isSidebarOpen }) => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/login' && location.pathname !== '/signup';

  return (
    <div>
      {showNavbar && <Sidebar isOpen={isSidebarOpen} />}
      <div className="content">
        {showNavbar && <TopNavBar toggleSidebar={toggleSidebar} />}
        {children}
      </div>
    </div>
  );
};

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

