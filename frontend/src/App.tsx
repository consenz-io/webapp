import React from "react";
import "./App.css";
import Login from "./Login/Login";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <nav>
        <Link to="private">Private</Link> | <Link to="home">Home</Link> |{" "}
        <Link to="login">Login</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
