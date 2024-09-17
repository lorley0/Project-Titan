import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BusinessListingPage from './pages/BusinessListingPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" exact component={HomePage} />
                <Route path="/businesses" component={BusinessListingPage} />
                <Route path="/admin-dashboard" component={AdminDashboardPage} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;