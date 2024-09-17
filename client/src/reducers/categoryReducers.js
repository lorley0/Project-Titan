import {FETCH_CATEGORIES} from '../actions/category'

const initialState = {
    categories : []
};

const categoryReducers = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_CATEGORIES:
            return {...state, categories: action.payload};
        default:
            return state;    
    }
}

export default categoryReducers;