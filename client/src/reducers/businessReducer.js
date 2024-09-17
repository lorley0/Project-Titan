import { ADD_BUSINESS, FETCH_BUSINESSES } from '../actions/business';

const initialState = [];

const businessReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BUSINESS:
            return [...state, action.payload];
        case FETCH_BUSINESSES:
            return action.payload;
        default:
            return state;
    }
};

export default businessReducer;
