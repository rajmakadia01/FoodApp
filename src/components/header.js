import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink for active link styling
import "../App.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <h2>Logo</h2>
      </div>
      <div className="nav-links">
        <NavLink
          to="/"
          exact
          activeClassName="active-link"
          className="nav-link"
        >
          <h3>Home</h3>
        </NavLink>
        <NavLink
          to="/punjabi"
          activeClassName="active-link"
          className="nav-link"
        >
          <h3>Punjabi</h3>
        </NavLink>
        <NavLink
          to="/south-indian"
          activeClassName="active-link"
          className="nav-link"
        >
          <h3>South Indian</h3>
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
