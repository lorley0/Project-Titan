import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBusinesses } from '../actions/business';
import { fetchCategories } from '../actions/category';

const BusinessListingPage = () => {
    const dispatch = useDispatch();
    const businesses = useSelector(state => state.businesses);
    const categories = useSelector(state => state.categories);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        dispatch(fetchBusinesses());
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        dispatch(fetchBusinesses(event.target.value));
    };

    return (
        <div className="container">
            <h1>Business Listings</h1>
            <div>
                <label>Filter by Category:</label>
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">All</option>
                    {categories.map(category => (
                        <option key={category._id} value={category.name}>{category.name}</option>
                    ))}
                </select>
            </div>
            {businesses.length ? (
                businesses.map(business => (
                    <div key={business._id} className="card">
                        <h2>{business.name}</h2>
                        <p>{business.description}</p>
                        <p>{business.address}</p>
                    </div>
                ))
            ) : (
                <p>No businesses found.</p>
            )}
        </div>
    );
};

export default BusinessListingPage;