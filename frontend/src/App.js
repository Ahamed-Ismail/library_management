import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import UserPage from "./Component/UserPage";
import AdminPage from "./Component/AdminPage";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUser, setIsUser] = useState(true);

  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      var res = null;
      if (isUser) {
        res = await axios.post("http://44.212.5.79:8000/auth/userlogin", {
          username,
          password,
        });
      } else {
        res = await axios.post("http://44.212.5.79:8000/auth/adminlogin", {
          username,
          password,
        });
      }
      const data = res.data;
      console.log(data);

      if (data.result === "ok") {
        if (isUser) {
          localStorage.setItem('usename', username);
          navigate("/userhomepage");
        } else {
          navigate("/adminhomepage");
        }
      } else {
        alert(data.result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://44.212.5.79:8000//auth/signup", {
        username,
        password,
      });
      const data = res.data;
      console.log(data);

      if (data.result === "ok") {
        localStorage.setItem('usename', username);
        navigate("/homepage");
      } else {
        alert(data.result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="App">
            {!isSignup ? (
              <div className="login">
                <label>{isUser ? <p>User Login</p> : <p>Admin Login</p>}</label>
                <input
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
                <p>
                  Click here to{" "}
                  {isUser ? "go to Admin Login" : "go to User Login"}{" "}
                  <button onClick={() => setIsUser(!isUser)}>Switch</button>
                </p>
                <p>
                  Click here to{" "}
                  <button onClick={() => setIsSignup(true)}>Signup</button>
                </p>
                <button onClick={handleLogin}>Login</button>
              </div>
            ) : (
              <div className="signup">
                <label>Sign Up</label>
                <input
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
                <p>
                  Already have an account?{" "}
                  <button onClick={() => setIsSignup(false)}>Login</button>
                </p>
                <button onClick={handleSignup}>Signup</button>
              </div>
            )}
          </div>
        }
      />

      <Route path="/userhomepage" element={<UserPage />} />
      <Route path="/adminhomepage" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
