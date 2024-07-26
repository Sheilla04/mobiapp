// hooks/useDeleteTransaction.js
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';

export const useDeleteTransaction = () => {
  const handleDeleteTransaction = async (transactionId) => {
    const transactionDocRef = doc(db, 'transactions', transactionId);
    await deleteDoc(transactionDocRef);
    
  };

  return { handleDeleteTransaction };
};
