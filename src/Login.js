// src/Login.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Login() {
  const {email, setEmail} = useState("");
  const {password, setPassword} = useState("");

  return (
    <div>
      <h2>Login</h2>
      <form>
        <div>
          <label>Email:</label>
          <input 
             type="email" 
             name="email"
             />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
}

export default Login;


