import * as actionType from '../actions/actionsTypes';
import {updateObject} from '../Utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
}

const authStarted = (state) => {
    return updateObject(state, {loading: true});
}

const authSucceeded = (state, action) => {
    return updateObject(state, {
        token: action.tokenId,
        userId: action.userId,
        error: null,
        loading: false
    });
}

const authFailed = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null,
        error: action.error,
        loading: false
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {token: null, userId: null});
}

const reducer = (state = initialState, action) =>  {
    switch(action.type){
        case actionType.AUTH_STARTED: return authStarted(state);
        case actionType.AUTH_SUCCEEDED: return authSucceeded(state, action);
        case actionType.AUTH_FAILED: return authFailed(state, action);
        case actionType.AUTH_LOGOUT: return authLogout(state, action);
        default: return state;
    }
}

export default reducer;