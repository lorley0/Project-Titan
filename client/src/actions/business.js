import axios from 'axios';

export const ADD_BUSINESS = 'ADD_BUSINESS';
export const FETCH_BUSINESSES = 'FETCH_BUSINESSES';

export const addBusiness = (business) => async (dispatch) => {
    try {
        const res = await axios.post('/api/businesses', business);
        dispatch({ type: ADD_BUSINESS, payload: res.data });
    } catch (err) {
        console.error(err);
    }
};

export const fetchBusinesses = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/businesses');
        dispatch({ type: FETCH_BUSINESSES, payload: res.data });
    } catch (err) {
        console.error(err);
    }
};

export const submitVerificationRequest = (businessId, formData) => {
    return async (dispatch) => {
      try {
        const response = await fetch(`/api/business/verify/${businessId}`, {
          method: 'POST',
          body: formData,
        });
  
        const data = await response.json();
  
        if (data.success) {
          dispatch({
            type: 'SUBMIT_VERIFICATION_REQUEST_SUCCESS',
            payload: data.message,
          });
        } else {
          dispatch({
            type: 'SUBMIT_VERIFICATION_REQUEST_FAILURE',
            payload: data.error,
          });
        }
      } catch (error) {
        dispatch({
          type: 'SUBMIT_VERIFICATION_REQUEST_FAILURE',
          payload: error.message,
        });
      }
    };
};