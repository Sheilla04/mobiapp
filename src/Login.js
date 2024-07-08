// src/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword, AuthErrorCodes } from 'firebase/auth'; // Import AuthErrorCodes
import { auth } from './config/firebase-config';
import SignInwithGoogle from './SignInwithGoogle';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("User logged in successfully!", { position: 'top-center' });
      window.location.href = "/Dashboard";
    } catch (error) {
      // Handle specific error codes
      if (error.code === AuthErrorCodes.USER_NOT_FOUND) {
        toast.error("User does not exist. Please check your email or sign up.", { position: 'bottom-center' });
      } else if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
        toast.error("The password is invalid. Please try again.", { position: 'bottom-center' });
      } else {
        toast.error("An error occurred. Please try again later.", { position: 'bottom-center' });
      }
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
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <SignInwithGoogle />
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
}

export default Login;
