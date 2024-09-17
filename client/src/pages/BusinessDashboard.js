import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBusinessCustomization } from '../actions/business';

const BusinessDashboard = () => {
    const dispatch = useDispatch();
    const business = useSelector(state => state.business);

    const [theme, setTheme] = useState(business.theme || 'default');
    const [additionalDetails, setAdditionalDetails] = useState(business.additionalDetails || '');

    const handleCustomizationSubmit = (e) => {
        e.preventDefault();
        dispatch(updateBusinessCustomization({ theme, additionalDetails }));
    };

    return (
        <div className="business-dashboard">
            <h1>Business Dashboard</h1>

            <form onSubmit={handleCustomizationSubmit}>
                <label>
                    Select Theme:
                    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                        <option value="default">Default</option>
                        <option value="theme1">Theme 1</option>
                        <option value="theme2">Theme 2</option>
                    </select>
                </label>

                <label>
                    Additional Details:
                    <textarea
                        value={additionalDetails}
                        onChange={(e) => setAdditionalDetails(e.target.value)}
                        placeholder="Enter additional details about your business"
                    />
                </label>

                <button type="submit">Save Customization</button>
            </form>
        </div>
    );
};

export default BusinessDashboard;
