// import React from "react";
// import 'bootstrap/js/dist/dropdown';
// import '../styles/navbar.css'

// function TopNavBar() {
//   return (
//     <nav className="navbar navbar-expand-sm fixed-top" style={{marginLeft:'250px'}}>
//       <i className="navbar-brand bi bi-justify-left fs-4" style={{display:'none'}}></i>
//       <button
//         className="navbar-toggler d-lg-none"
//         type="button"
//         data-bs-toggle="collapse"
//         data-bs-target="#collapsibleNavId"
//         aria-controls="collapsibleNavId"
//         aria-expanded="false"
//         aria-label="Toggle navigation"
//       ></button>
//       <div className="collapse navbar-collapse" id="collapsibleNavId">
//         <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
//           <li className="nav-item dropdown">
//             <button
//               className="nav-link dropdown-toggle btn btn-link"
//               id="dropdownId"
//               data-bs-toggle="dropdown"
//               aria-haspopup="true"
//               aria-expanded="false"
//             >
//               Mobibudget
//             </button>
//             <div className="dropdown-menu" aria-labelledby="dropdownId">
//               <button className="dropdown-item btn btn-link">Profile</button>
//               <button className="dropdown-item btn btn-link">Settings</button>
//               <button className="dropdown-item btn btn-link" style={{color:'rgb(219, 40, 40)'}}>Logout</button>
//             </div>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }

// export default TopNavBar;


import React, { useState, useEffect } from "react";
import 'bootstrap/js/dist/dropdown';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase-config"; // Assuming you have a firebase-config.js file for Firebase setup
import '../styles/navbar.css';

function TopNavBar() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async (uid) => {
      try {
        const userDoc = await getDoc(doc(db, "Users", uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserName(user.uid);
      } else {
        setUserName('Mobibudget');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav className="navbar navbar-expand-sm fixed-top" style={{ marginLeft: '250px' }}>
      <i className="navbar-brand bi bi-justify-left fs-4" style={{ display: 'none' }}></i>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      ></button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
          <li className="nav-item dropdown">
            <button
              className="nav-link dropdown-toggle btn btn-link"
              id="dropdownId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {userName}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownId">
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
