import React from 'react';
import './header.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.jpg';

function getLink(isHome) {
  if (isHome) {
    return (
      <>
        <div className="link" to="/">
          Pick a game
        </div>
        <Link className="link" to="maintenance">
          Maintenance
        </Link>
      </>
    );
  } else {
    return (
      <>
        <Link className="link" to="/">
          Pick a game
        </Link>
        <div className="link" to="maintenance">
          Maintenance
        </div>
      </>
    );
  }
}

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname !== '/maintenance';
  return (
    <div>
      <div className="logo-wrapper">
        <img className="logo" src={logo} alt="logo" />
      </div>
      <div className="header">{getLink(isHome)}</div>
    </div>
  );
};

export default Header;
