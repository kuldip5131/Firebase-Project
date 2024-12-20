import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./componetns/Login";
import Register from "./componetns/Register";
import Profile from "./componetns/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from 'react';
import { auth } from './utils/firebase';

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setUser(user);
    });
  });
  return (
    <>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Router>
              <Routes>
                <Route path="/"
                  element={user ? <Navigate to="Profile" /> : <Login />} ></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
              </Routes>
              <ToastContainer />
            </Router>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
