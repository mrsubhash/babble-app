import { SET_ERRORS, SET_USER, LOADING_UI, CLEAR_ERRORS, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "../reducers/types";

const initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: []
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
        default:
            return state
    }

}