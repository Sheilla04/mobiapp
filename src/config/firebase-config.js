// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjxalt5khjbxqOvHm1iMbYPpZql1YAjZg",
  authDomain: "mobiapp-11caf.firebaseapp.com",
  projectId: "mobiapp-11caf",
  storageBucket: "mobiapp-11caf.appspot.com",
  messagingSenderId: "273706744720",
  appId: "1:273706744720:web:cbdff2cc99a32124365115"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
//const database = getDatabase(app);

//export { database };
export const auth=getAuth(app);
export const db = getFirestore(app);
export default app;
