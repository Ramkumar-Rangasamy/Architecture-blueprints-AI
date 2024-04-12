import React from 'react';
import './navbar.css';
import logo from '../Assets/logo.png';

import {Link} from 'react-router-dom';

function NavBar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <img src={logo} className="navbar-brand col-6 col-sm-4 col-lg-2 col-md-3" alt="Logo" />
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto mr-5 pr-5">
            <li className="nav-item active">
              <a href="/" className="nav-link">Home</a>
            </li>
            <li className="nav-item active">
              <a href="/estimate" className="nav-link">Get Estimate</a>
            </li>
            <li className="nav-item active">
              <a href="/consultation" className="nav-link">Book A Consultation</a>
            </li>
            <li className="nav-item active">
              <Link to='/signup' className="nav-link">Create Acount</Link> 
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
