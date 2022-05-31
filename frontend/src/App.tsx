import React from "react";
import "./App.css";
import Login from "./Login/Login";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <nav>
        <Link to="/home">Home</Link> | <Link to="/">Login</Link>
      </nav>
      <Login />
    </div>
  );
}

export default App;
