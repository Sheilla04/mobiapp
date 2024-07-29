// src/hooks/useIsEmailVerified.js
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase-config';

const useIsEmailVerified = () => {
  const [isEmailVerified, setIsEmailVerified] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsEmailVerified(user.emailVerified);
      } else {
        setIsEmailVerified(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return isEmailVerified;
};

export default useIsEmailVerified;
