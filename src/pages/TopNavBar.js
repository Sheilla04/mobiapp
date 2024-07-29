


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/js/dist/dropdown';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../config/firebase-config";
import '../styles/navbar.css';
import defaultProfilePic from '../assets/defaultProfilePic.jpg';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function TopNavBar({ toggleSidebar }) {
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async (uid) => {
      try {
        const userDoc = await getDoc(doc(db, "Users", uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
          setUserPhoto(userDoc.data().photo || defaultProfilePic);
        }

        // Fetch target and transaction data
        const targetsRef = collection(db, "targets");
        const targetsQuery = query(targetsRef, where("uid", "==", uid));
        const targetsSnapshot = await getDocs(targetsQuery);

        const transactionsRef = collection(db, "transactions");
        const transactionsQuery = query(transactionsRef, where("uid", "==", uid));
        const transactionsSnapshot = await getDocs(transactionsQuery);

        if (!targetsSnapshot.empty && !transactionsSnapshot.empty) {
          const targetData = targetsSnapshot.docs[0].data();
          const targetCost = parseFloat(targetData.targetCost);

          const totalCost = transactionsSnapshot.docs.reduce((sum, doc) => sum + doc.data().cost, 0);

          if (totalCost > targetCost) {
            setShowNotification(true);
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserDetails(user.uid);
      } else {
        setUserName('Mobibudget');
        setUserPhoto(defaultProfilePic);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleProfile = () => {
    navigate('/userprofile');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Swal.fire('Success', 'You have been logged out successfully!', 'success');
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error.message);
      Swal.fire('Error', 'Failed to log out. Please try again.', 'error');
    }
  };

  const handleNotificationClick = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Cost Limit Exceeded',
      text: 'Your total costs have surpassed the target amount.',
    });
    setShowNotification(false);
  };

  return (
    <nav className="navbar navbar-expand-sm fixed-top" style={{
      marginLeft:'16.4vw',
      padding:'30px',
      paddingBottom:'30px',
    }}>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        onClick={toggleSidebar}
      >
        <i className="bi bi-justify-left fs-4"></i>
      </button>
      <div className="navbar-brand"></div>
      <div className="ms-auto">
        <ul className="navbar-nav">
          {showNotification && (
            <li className="nav-item me-3">
              <button className="btn btn-link" onClick={handleNotificationClick}>
                <FontAwesomeIcon icon={faBell} className="text-warning" />
              </button>
            </li>
          )}
          <li className="nav-item dropdown">
            <button
              className="nav-link dropdown-toggle btn btn-link"
              id="dropdownId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img src={userPhoto} alt="Profile" className="profile-pic me-2" />
              {userName}
            </button>
            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownId">
              <button className="dropdown-item btn btn-link" onClick={handleProfile}>Profile</button>
              <button className="dropdown-item btn btn-link" onClick={handleSettings}>Settings</button>
              <button className="dropdown-item btn btn-link" onClick={handleLogout} style={{ color: 'rgb(219, 40, 40)' }}>Logout</button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default TopNavBar;

