import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';
// import googleIcon from './assets/google.png'; // Ensure this path is correct
import { auth, db } from './config/firebase-config';
import './styles/SignInwithGoogle.css';
import { doc, setDoc } from 'firebase/firestore';

function SignInwithGoogle() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    function googleLogin() {
        if (isPopupOpen) {
            return;
        }
        setIsPopupOpen(true);

        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(async(result) => {
                console.log(result);
                const user = result.user;
                setIsPopupOpen(false);
                if (result.user) {
                    await setDoc(doc(db,"Users", user.uid), {
                        email:user.email,
                        name:user.displayName,
                        photo:user.photoURL,
                      });
                    window.location.href = "/dashboard";
                }
            })
            .catch((error) => {
                console.error("Error during sign-in:", error);
                setIsPopupOpen(false);

                if (error.code === 'auth/popup-blocked' || error.code === 'auth/cancelled-popup-request') {
                    signInWithRedirect(auth, provider);
                }
            });
    }

    return (
        <div>
            <p className="continue-p">--Or continue with--</p>
            <button className="google-login-btn" onClick={googleLogin}>
                Sign in with Google
            </button>
        </div>
    );
}

export default SignInwithGoogle;


