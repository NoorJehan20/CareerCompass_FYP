import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/CC.png";
import "./Footer.css"; 

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">

        {/* Brand */}
        <div className="footer-brand">
          <img src={logo} alt="Career Compass Logo" className="footer-logo" />
          <p className="footer-description">
            Your personalized journey to a future-proof career — powered by AI.
          </p>
        </div>

        {/* Resources */}
        <div>
          <h3 className="footer-heading">Resources</h3>
          <ul className="footer-list">
            <li><Link to="/advice">Career Guides</Link></li>
            <li><Link to="/explore">Explore Paths</Link></li>
            <li><Link to="/resume-builder">Resume Builder</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="footer-heading">Company</h3>
          <ul className="footer-list">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="footer-heading">Support</h3>
          <ul className="footer-list">
            <li className="footer-text">Email: support@careercompass.com</li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        © 2025 Career Compass. All rights reserved.
      </div>
    </footer>
  );
}
