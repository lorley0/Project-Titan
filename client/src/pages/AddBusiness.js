import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBusiness } from '../actions/business';

const AddBusiness = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addBusiness({ name, description, address }));
    };

    return (
        <div className="container">
            <h1>Add a New Business</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Business Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <button type="submit">Add Business</button>
            </form>
        </div>
    );
};

export default AddBusiness;
