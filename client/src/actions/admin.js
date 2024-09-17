import axios from 'axios';

export const FETCH_USERS = 'FETCH_USERS';
export const DELETE_USER = 'DELETE_USER';

// fetch user actions
export const fetchUsers = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/admin/users');
        dispatch({ type: FETCH_USERS, payload: res.data });
    } catch (err) {
        console.error(err);
    }
};

// delete user actions
export const deleteUser = (userId) => async (dispatch) => {
    try {

        await axios.delete(`/api/admin/users/${userId}`);
        dispatch({type: DELETE_USER, payload: userId});
        
    } catch (err) {
        console.error(err);
    }
}
