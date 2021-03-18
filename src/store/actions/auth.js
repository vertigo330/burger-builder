import * as actionType from './actionsTypes';
import axios from 'axios';

export const authStarted = () => {
    return {
        type: actionType.AUTH_STARTED
    }
}

export const authSucceeded = (tokenId, userId) => {
    return {
        type: actionType.AUTH_SUCCEEDED,
        tokenId: tokenId,
        userId: userId,
    }
}

export const authFailed = (err) => {
    return {
        type: actionType.AUTH_FAILED,
        error: err
    }
}

export const logout = () => {
    return {
        type: actionType.AUTH_LOGOUT
    }
}

export const checkLogout = (timeout) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, timeout * 1000);
    }
}

export const authenticate = (username, password, isSignup) => {
    return dispatch => {
        dispatch(authStarted());

        const apiKey = 'AIzaSyDLGcan07dypfQ4AgbTExAcqVh22ay_QBU';
        let url = isSignup
            ? `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
            : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`

        axios.post(url, 
        {
            email: username,
            password: password,
            returnSecureToken: true
        })
        .then((response)=>{
            console.log(response);
            dispatch(authSucceeded(response.data.idToken, response.data.localId));
            dispatch(checkLogout(response.data.expiresIn));
        })
        .catch(err => {
            console.log(err);
            dispatch(authFailed(err.response.data.error));
        });
    }
}