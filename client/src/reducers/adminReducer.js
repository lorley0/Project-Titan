import { DELETE_USER, FETCH_USERS } from '../actions/admin';

const initialState = { users: [] };

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return { ...state, users: action.payload };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload)
            };    
        default:
            return state;
    }
};

export default adminReducer;
