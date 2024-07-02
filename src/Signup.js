import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css'; // Import the CSS file
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './config/firebase-config';
//import { Database, getDatabase } from "firebase/database";
import { doc, setDoc } from 'firebase/firestore';


function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if(user) {
        await setDoc(doc(db,"Users", user.uid), {
          email:user.email,
          name:name,
        });
      }
      console.log('User has been registered successfully!');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;



