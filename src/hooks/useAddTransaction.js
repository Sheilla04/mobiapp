import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";

export const useAddTransaction = () => {
  const transactionCollectionRef = collection(db, "transactions");

  const addTransaction = async (uid, formData) => {
    const transactionData = {
      ...formData,
      uid: uid,
      date: serverTimestamp() // Use Firebase server timestamp
    };
    await addDoc(transactionCollectionRef, transactionData);
  };

  return { addTransaction };
};