
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail, AuthErrorCodes } from 'firebase/auth';
import { auth } from '../config/firebase-config';
import SignInwithGoogle from '../SignInwithGoogle';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isGoogleSignIn, setIsGoogleSignIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Check if email is verified only for email/password sign-in
      if (!isGoogleSignIn) {
        if (user.emailVerified) {
          toast.success("User logged in successfully!", { position: 'top-center' });
          window.location.href = "/Dashboard";
        } else {
          toast.error("Please verify your email before logging in.", { position: 'bottom-center' });
          await auth.signOut();
        }
      } else {
        // For Google sign-in, just redirect to Dashboard
        toast.success("User logged in successfully!", { position: 'top-center' });
        window.location.href = "/Dashboard";
      }
    } catch (error) {
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

  const handleGoogleSignIn = () => {
    setIsGoogleSignIn(true); // Flag to indicate Google sign-in
  };

  return (
    <div className='login-body'>
      <div className="main-container">
        <div className="login-container">
          <div className="mobile-header">
            <img src="/logo-no-background.png" alt="MobiBudget Logo" className="mobile-logo" />
            <h1 className="mobile-title">MobiBudget</h1>
          </div>
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
            <SignInwithGoogle onSignIn={handleGoogleSignIn} />
          </form>
          <p>Forgot your password? <button onClick={handleForgotPassword} className="link-button">Reset Password</button></p>
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
          <ToastContainer />
        </div>
        <div className="image-container">
          <img src="/logo-no-background.png" alt="MobiBudget" />
        </div>
      </div>
    </div>  
  );
}

export default Login;

