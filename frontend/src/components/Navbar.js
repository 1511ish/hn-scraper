import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <span className="brand-icon">▲</span> HN Reader
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Stories</Link>
        {user ? (
          <>
            <Link to="/bookmarks">Bookmarks</Link>
            <span className="nav-user">@{user.username}</span>
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/">Login</Link>
            <Link to="/" className="btn-register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
