import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: "profolio-multitenant",
  storageBucket: "profolio-multitenant.appspot.com",
  messagingSenderId: "1071840588438",
  appId: "1:1071840588438:web:186984dc8faae8671648b7",
  measurementId: "G-Q9YWNSPDE1"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
auth.tenantId = "tenant1-ba5fo";

export { db, firebaseApp, auth };