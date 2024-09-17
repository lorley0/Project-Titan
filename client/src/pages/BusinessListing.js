import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBusinesses } from '../actions/business';

const BusinessListing = () => {
    const dispatch = useDispatch();
    const businesses = useSelector(state => state.businesses);

    useEffect(() => {
        dispatch(fetchBusinesses());
    }, [dispatch]);

    return (
        <div className="container">
            <h1>Business Listings</h1>
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

export default BusinessListing;
