// src/UserProfile.js
import React from 'react';
import './UserProfile.css';

const UserProfile = () => {
  return (
    <div className="user-profile">
      <div className="profile-header">
        <img src="https://via.placeholder.com/150" alt="Profile" className="profile-img" />
        <div className="profile-info">
          <h2>John Doe</h2>
          <p>Email: johndoe@example.com</p>
          <p>Location: New York, USA</p>
        </div>
      </div>
      <div className="profile-body">
        <div className="profile-section">
          <h3>About Me</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
        </div>
        <div className="profile-section">
          <h3>Recent Activities</h3>
          <ul>
            <li>Logged in from New York</li>
            <li>Uploaded a file</li>
            <li>Updated profile picture</li>
          </ul>
        </div>
        <div className="profile-section">
          <h3>Settings</h3>
          <button>Edit Profile</button>
          <button>Change Password</button>
          <button>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
