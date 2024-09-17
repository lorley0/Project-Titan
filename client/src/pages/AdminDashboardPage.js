import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../actions/admin';

const AdminDashboardPage = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleDelete = (userId) => {
        dispatch(deleteUser(userId));
    };

    return (
        <div className="container">
            <h1>Admin Dashboard</h1>
            <h2>Manage Users</h2>
            {users.length ? (
                users.map(user => (
                    <div key={user._id} className="card">
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                        <button onClick={() => handleDelete(user._id)}>Delete User</button>
                    </div>
                ))
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
};

export default AdminDashboardPage;
