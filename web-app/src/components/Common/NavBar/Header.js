import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const userEmail = sessionStorage.getItem('email');
  const userRole = sessionStorage.getItem('role');

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <img src="your-logo.png" alt="Your App Logo" />
      </div>
      <div className="navbar-user">
        <span className="user-email">{userEmail}</span>
        <span className="user-role">{userRole}</span>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
