import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications } from '../actions/notificationActions';

const Notifications = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(state => state.notifications);

    useEffect(() => {
        dispatch(fetchNotifications());
    }, [dispatch]);

    return (
        <div className="container">
            <h1>Notifications</h1>
            {notifications.length ? (
                notifications.map(notification => (
                    <div key={notification._id} className="card">
                        <p>{notification.message}</p>
                        <small>{new Date(notification.createdAt).toLocaleString()}</small>
                    </div>
                ))
            ) : (
                <p>No notifications found.</p>
            )}
        </div>
    );
};

export default Notifications;
