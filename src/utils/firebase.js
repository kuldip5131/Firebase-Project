// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDJzRe1J8lpEwaq2UnBt8vtF9lc7lDigps",
    authDomain: "react-project-28995.firebaseapp.com",
    projectId: "react-project-28995",
    storageBucket: "react-project-28995.firebasestorage.app",
    messagingSenderId: "386074730851",
    appId: "1:386074730851:web:9d3335db957c1e439eb356"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;
