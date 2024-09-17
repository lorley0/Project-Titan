import React from 'react';

function HomePage() {
    return (
        <div className="container">
            <h1>Welcome to Lorley</h1>
            <p>Your platform for finding the best businesses in your area. Explore listings, read reviews, and discover new places to visit!</p>
            <button onClick={() => window.location.href='/businesses'}>Explore Businesses</button>
        </div>
    );
}

export default HomePage;
