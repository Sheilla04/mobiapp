


// TopNavBar.js
import React, { useState, useEffect } from "react";
import 'bootstrap/js/dist/dropdown';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase-config";
import '../styles/navbar.css';

function TopNavBar({ toggleSidebar }) {
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState('');

  useEffect(() => {
    const fetchUserDetails = async (uid) => {
      try {
        const userDoc = await getDoc(doc(db, "Users", uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
          setUserPhoto(userDoc.data().photo);
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
        setUserPhoto('');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav className="navbar navbar-expand-sm fixed-top">
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        onClick={toggleSidebar}
      >
        <i className="bi bi-justify-left fs-4"></i>
      </button>
      <div className="navbar-brand">Mobibudget</div>
      <div className="ms-auto">
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <button
              className="nav-link dropdown-toggle btn btn-link"
              id="dropdownId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {userPhoto && <img src={userPhoto} alt="Profile" className="profile-pic me-2" />}
              {userName}
            </button>
            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownId">
              <button className="dropdown-item btn btn-link">Profile</button>
              <button className="dropdown-item btn btn-link">Settings</button>
              <button className="dropdown-item btn btn-link" style={{ color: 'rgb(219, 40, 40)' }}>Logout</button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default TopNavBar;