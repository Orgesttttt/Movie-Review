import React from 'react';
import Logo from '../images/Logo.png';
import "./style/Nav.css";

function Nav() {
  return (
    <div>
      <nav className="navLinks" >
        <img src={Logo} alt="Logo" onClick={() => window.location.href = "/"}/>
        <ul>
          <li><a href="/aboutus">About Us</a></li>
          <li><a href="/favourites">Favourites</a></li>
          <li><a href="/movies">Movies</a></li>
          <li><a href="#">User</a></li>
        </ul>
        <input type="search" placeholder="Search" />
      </nav>
    </div>
  );
}

export default Nav;