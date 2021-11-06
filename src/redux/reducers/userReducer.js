import { SET_ERRORS, SET_USER, LOADING_UI, CLEAR_ERRORS, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER } from "../reducers/types";

const initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: [],
    loading: false
}

export default function userReducer (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            }
        case SET_UNAUTHENTICATED:
            return initialState;

        case SET_USER:
            return {
                authenticated: true,
                ...action.payload
            }
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }

}