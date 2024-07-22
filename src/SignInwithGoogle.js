import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';
// import googleIcon from './assets/google.png'; // Ensure this path is correct
import { auth } from './config/firebase-config';
import './SignInwithGoogle.css';

function SignInwithGoogle() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    function googleLogin() {
        if (isPopupOpen) {
            return;
        }
        setIsPopupOpen(true);

        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result);
                setIsPopupOpen(false);
                if (result.user) {
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
