// src/Login.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './config/firebase-config';
import SignInwithGoogle from './SignInwithGoogle';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");
      window.location.href= "/Dashboard";
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
             type="email" 
             name="email"
             value={email}
             onChange={(e)=> setEmail(e.target.value)}
             />
        </div>
        <div>
          <label>Password:</label>
          <input 
           type="password" 
           name="password" 
           value={password}
           onChange={(e)=> setPassword(e.target.value)}
           required />
        </div>
        <button type="submit">Login</button>
        <SignInwithGoogle/>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
}

export default Login;


