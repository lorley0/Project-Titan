import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBusinessAnalytics } from '../actions/analytics';

const BusinessAnalytics = () => {
    const dispatch = useDispatch();
    const analytics = useSelector(state => state.analytics);

    useEffect(() => {
        dispatch(fetchBusinessAnalytics());
    }, [dispatch]);

    return (
        <div className="container">
            <h1>Business Analytics</h1>
            {analytics ? (
                <div>
                    <p>Total Views: {analytics.totalViews}</p>
                    <p>Total Interactions: {analytics.totalInteractions}</p>
                </div>
            ) : (
                <p>No analytics available.</p>
            )}
        </div>
    );
};

export default BusinessAnalytics;
