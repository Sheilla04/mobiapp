// src/SendVerificationEmail.js
import { auth } from "./firebase";
import { sendEmailVerification } from "firebase/auth";
import { useState } from "react";

function SendVerificationEmail() {
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

  return (
    <div>
      <button onClick={sendVerification}>Send Verification Email</button>
      {emailSent && <p>Verification email sent!</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default SendVerificationEmail;
