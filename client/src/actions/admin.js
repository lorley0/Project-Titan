import axios from 'axios';

export const FETCH_USERS = 'FETCH_USERS';

export const fetchUsers = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/admin/users');
        dispatch({ type: FETCH_USERS, payload: res.data });
    } catch (err) {
        console.error(err);
    }
};
