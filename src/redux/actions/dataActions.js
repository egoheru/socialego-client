import { 
    SET_SCREAMS, 
    LOADING_DATA, 
    LIKE_SCREAM, 
    UNLIKE_SCREAM,
    DELETE_SCREAM, 
    CLEAR_ERRORS,
    LOADING_UI,
    POST_SCREAM,
    SET_ERRORS
} from '../types';
import axios from 'axios';

// Get all screams
export const getScreams = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
   .get('https://europe-west1-socialappe-72b1d.cloudfunctions.net/api/screams')
    .then((res) => {
        dispatch({
            type: SET_SCREAMS,
            payload: res.data
        })
    })
    .catch((err) => {
        dispatch({
            type: SET_SCREAMS,
            payload: []
        })
    })
}
// Post a scream
export const postScream = (newScream) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
     .post('https://europe-west1-socialappe-72b1d.cloudfunctions.net/api/scream', newScream)
      .then(res => {
        dispatch({
          type: POST_SCREAM,
          payload: res.data
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => {
        
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
};
// Like a scream
export const likeScream = (screamId) => (dispatch) => {
    axios
     .get(`https://europe-west1-socialappe-72b1d.cloudfunctions.net/api/scream/${screamId}/like`)
       .then((res) => {
           dispatch({
               type: LIKE_SCREAM,
               payload: res.data
           });
       })
       .catch((err) => console.log(err));
};
// Unlike a scream
export const unlikeScream = (screamId) => (dispatch) => {
    axios
     .get(`https://europe-west1-socialappe-72b1d.cloudfunctions.net/api/scream/${screamId}/unlike`)
       .then((res) => {
           dispatch({
               type: UNLIKE_SCREAM,
               payload: res.data
           });
       })
       .catch((err) => console.log(err));
}

export const deleteScream = (screamId) => (dispatch) => {
    axios.delete(`https://europe-west1-socialappe-72b1d.cloudfunctions.net/api/scream/${screamId}`)
      .then(() => {
         dispatch({ type: DELETE_SCREAM, payload: screamId})
      })
      .catch((err) => console.log(err));
}

export const clearErrors = () => dispatch => {
 dispatch({ type: CLEAR_ERRORS });
}