import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail, AuthErrorCodes } from 'firebase/auth'; // Import sendPasswordResetEmail
import { auth } from './config/firebase-config';
import SignInwithGoogle from './SignInwithGoogle';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

import './Login.css';

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
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email address first.", { position: 'bottom-center' });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!", { position: 'top-center' });
    } catch (error) {
      toast.error("Failed to send password reset email. Please try again later.", { position: 'bottom-center' });
    }
  };

  return (
    <div className="main-container">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
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
        <p>Forgot your password? <button onClick={handleForgotPassword} className="link-button">Reset Password</button></p>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        <ToastContainer /> {/* Add ToastContainer */}
      </div>
      <div className="image-container">
        <img src="/logo-no-background.png" alt="Signup" />
      
      </div>
</div>
  );
}

export default Login;
