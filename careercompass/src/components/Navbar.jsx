import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/CC.png";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Career Compass Logo" className="logo" />
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/chatbot">Advice Hub</Link></li>
        <li><Link to="/resume-analyzer">Career Insights</Link></li>
        <li><Link to="/resume-builder">Resume Builder</Link></li>
        <li><Link to="/interview-prep">Interview Prep</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className="navbar-auth">
        <Link to="/auth?mode=login">
          <button className="login-btn">Login</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;