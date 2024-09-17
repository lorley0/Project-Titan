import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="navbar-brand">Lorley</Link>
                <div className="navbar-links">
                    <Link to="/businesses">Businesses</Link>
                    <Link to="/admin-dashboard">Admin Dashboard</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
