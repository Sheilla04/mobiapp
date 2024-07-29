import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Signup.css';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../config/firebase-config';
import { doc, setDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import useSendVerificationEmail from '../hooks/useSendVerificationEmail';

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { sendVerification } = useSendVerificationEmail();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if all fields are filled
    if (!name || !email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please fill in all the fields before submitting.',
      });
      return;
    }

    try {
      // Check if the username is already taken
      const usersQuery = query(collection(db, "Users"), where("name", "==", name));
      const querySnapshot = await getDocs(usersQuery);
      if (!querySnapshot.empty) {
        Swal.fire({
          icon: 'error',
          title: 'Username Taken',
          text: 'This username is already taken. Please choose another one.',
        });
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        name: name,
      });

      // Send verification email
      await sendVerification();
      Swal.fire({
        icon: 'success',
        title: 'Sign Up Successful',
        text: 'Verification email sent. Please verify your email before logging in.',
      });

      // Log out the user to prevent accessing the dashboard without verification
      auth.signOut();
      navigate("/login");
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
