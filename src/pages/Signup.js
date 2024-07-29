


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Signup.css';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../config/firebase-config';
import { doc, setDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        name: name,
      });
      toast.success("User signed up successfully", { position: 'top-center' });
      navigate("/Dashboard");
    } catch (error) {
      console.error("Error signing up: ", error.message);
      toast.error(error.message, { position: 'bottom-center' });
    }
  };

  return (
    <div className='signup-body'>
      <div className="main-container">
        <div className="signup-container">
          <div className="mobile-header">
            <img src="/logo-no-background.png" alt="MobiBudget Logo" className="mobile-logo" />
            <h1 className="mobile-title">MobiBudget</h1>
          </div>
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Name:</label>
              <input 
                type="text" 
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
            <button type="submit">Sign Up</button>
          </form>
          <p>Already have an account? <Link to="/login">Login</Link></p>
          <ToastContainer />
        </div>
        <div className="image-container">
          <img src="/logo-no-background.png" alt="MobiBudget" />
        </div>
      </div>
    </div>  
  );
}

export default Signup;