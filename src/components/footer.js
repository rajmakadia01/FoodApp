import React from "react";
import "../App.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Food App. All Rights Reserved.</p>
        <div className="footer-links">
          <a href="/punjabi" className="footer-link">
            Punabi Dishes
          </a>
          <a href="/south-indian" className="footer-link">
            SouthIndian Dishes
          </a>
          <a href="/contact" className="footer-link">
            Contact
          </a>
          <a href="/privacy" className="footer-link">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
