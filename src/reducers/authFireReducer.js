import {SIGN_IN, SIGN_ERR, SIGN_IN_USER, AUTH_LOGOUT, SIGN_IN_WITH_GOOGLE} from '../actions/types';


const INITIAL_STATE = {
    authData: null,
    isSignedIn: null,
    error: null,
    userData: null,
    idToken: null,
    exTime: null    
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGN_IN:
            return {...state, authData: action.payload, isSignedIn: true, error: null, userData: null, idToken: action.idToken}
        case  SIGN_ERR:
            return {...state, authData: null, isSignedIn: false, error: action.payload, userData: null, idToken: null}
        case  SIGN_IN_USER:
            return {...state, authData: action.authData, isSignedIn: true, error: null, userData: action.payload, idToken: action.idToken}
        case  AUTH_LOGOUT:
            return {...state, authData: null, isSignedIn: false, error: null, userData: null, idToken: null}
        case  SIGN_IN_WITH_GOOGLE:
            return {...state, authData: action.payload, isSignedIn: true, error: null, userData: null, idToken: action.idToken}
        default:
            return state;
    }
}