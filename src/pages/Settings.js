// src/Settings.js
import React, { useState } from 'react';
import '../styles/Settings.css';

const Settings = () => {
  const [username, setUsername] = useState('JohnDoe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [theme, setTheme] = useState('light');

  const handleSaveChanges = () => {
    alert('Changes saved!');
  };

  return (
    <div style={{paddingTop:'60px'}}>
      <div className="settings-page">
        <h2>Settings</h2>
        <div className="settings-section">
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div className="settings-section">
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div className="settings-section">
          <label>
            Theme:
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
        </div>
        <button onClick={handleSaveChanges}>Save Changes</button>
      </div>
    </div>  
  );
};

export default Settings;
