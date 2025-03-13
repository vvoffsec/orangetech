import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyD84B8v8_aVvD-OBccLQ8BFKkArNGwlUJ0",
    authDomain: "orangetech-a2c45.firebaseapp.com",
    projectId: "orangetech-a2c45",
    storageBucket: "orangetech-a2c45.firebasestorage.app",
    messagingSenderId: "391519036830",
    appId: "1:391519036830:web:47ce30bff81091a63e228f",
    measurementId: "G-V9TK0L8PWF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
