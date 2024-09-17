import React from 'react';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
    const users = useSelector(state => state.admin.users);

    return (
        <div className="container">
            <h1>Admin Dashboard</h1>
            {users.length ? (
                users.map(user => (
                    <div key={user._id} className="card">
                        <h2>{user.username}</h2>
                        <p>{user.email}</p>
                    </div>
                ))
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
};

export default AdminDashboard;
