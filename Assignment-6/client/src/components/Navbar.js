// client/src/components/Navbar.js
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">GroceryShop</Link>
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navBar">
          <span className="navbar-toggler-icon" />
        </button>
        <div id="navBar" className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/"          className="nav-link">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/catalogue" className="nav-link">Catalogue</NavLink>
            </li>
            {!loggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink to="/login"    className="nav-link">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">Register</NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-link btn btn-link">Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
