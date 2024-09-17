import axios from "axios";

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

// fetching categories
export const fetchCategories = () => async (dispatch) => {
    try {

        const res = await axios.get('/api/');
        dispatch({type: FETCH_CATEGORIES, payload: res.data});
        
    } catch (err) {
        console.log(err)
    }
}