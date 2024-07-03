import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase-config";
export const useAddTransaction = () => {
    const transactionCollectionRef = collection(db, "transactions")

    const addTransaction = async ({amount, category}) => {
        await addDoc(transactionCollectionRef)
    }
    return {addTransaction};
}