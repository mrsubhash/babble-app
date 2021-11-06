import { SET_ERRORS, SET_USER, LOADING_UI, CLEAR_ERRORS } from "../reducers/types";
import axios from "axios";

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios.post('/login', userData)
        .then(res => {

            const babbleToken = `Bearer ${res.data.token}`;
            localStorage.setItem("babbleToken", babbleToken)
            axios.defaults.headers.common['Authorization'] = babbleToken
            dispatch(getUserData())
            dispatch({ type: CLEAR_ERRORS })
            history.push('/')
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const getUserData = () => (dispatch) => {
    axios.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}