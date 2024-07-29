// src/hooks/useSendVerificationEmail.js
import { useState } from 'react';
import { auth } from '../config/firebase-config';
import { sendEmailVerification } from 'firebase/auth';

const useSendVerificationEmail = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);

  const sendVerification = async () => {
    const user = auth.currentUser;

    if (user) {
      try {
        await sendEmailVerification(user);
        setEmailSent(true);
        setError(null);
      } catch (error) {
        setError(error.message);
        setEmailSent(false);
      }
    } else {
      setError("No user is signed in.");
    }
  };

  return { sendVerification, emailSent, error };
};

export default useSendVerificationEmail;
