import React from 'react';
import './Main.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="Header">
      <nav className="navItems">
        <h1 className="logo">
          <Link to="/">Boostore</Link>
        </h1>
        <ul className="menu">
          <li><Link to="/books">books</Link></li>
          <li><Link to="/components">Components</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
