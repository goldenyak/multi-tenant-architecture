import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Registration from "./Registration";
import SignIn from "./SignIn";
import SignOutButton from "./SignOutButton";

function TenantApp() {
  const [tenantData, setTenantData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setIsUserLoggedIn(true);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const urlParams = new URLSearchParams(window.location.search);
  const tenantParam = urlParams.get("tenant") || "default";

  const tenant = currentUser ? currentUser.uid : tenantParam;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tenantDocRef = doc(db, "tenants", tenant);
        const tenantDocSnap = await getDoc(tenantDocRef);

        if (tenantDocSnap.exists()) {
          setTenantData(tenantDocSnap.data());
        } else {
          console.log("Error fetching tenant data");
        }
      } catch (error) {
        console.error("Error fetching tenant data:", error);
      }
    };

    fetchData();
  }, [tenant]);

  return (
    <div className="App">
      <h1>Welcome to {tenant}'s app!</h1>
      {tenantData && (
        <div>
          <p>Data: {JSON.stringify(tenantData)}</p>
        </div>
      )}
        {isUserLoggedIn ? (
        <SignOutButton />
      ) : (
        <>
          <Link to="/register" style={{ marginRight: '10px' }}>Регистрация</Link>
          <Link to="/signin">Войти</Link>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<TenantApp />} />
      </Routes>
    </Router>
  );
}

export default App;
