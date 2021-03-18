import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../Utility.js';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

function postOrderSuccessed(action, state) {
    const newOrder = updateObject(action.orderData, { id: action.orderId });
    return updateObject(state, { orders: state.orders.concat(newOrder), loading: false, purchased: true });
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, { purchased: false})
        case actionTypes.POST_ORDER_STARTED:
            return updateObject(state, {  loading: true})
        case actionTypes.POST_ORDER_SUCCEEDED:
            return postOrderSuccessed(action, state);
        case actionTypes.POST_ORDER_FAILED:
            return updateObject(state,{ loading: false });
        case actionTypes.FETCH_ORDER_STARTED:
            return updateObject(state,{ loading: true });
        case actionTypes.FETCH_ORDER_SUCCEEDED:
            return updateObject(state,{ orders: action.orders, loading: false });
        case actionTypes.FETCH_ORDER_FAILED:
            return updateObject(state,{ loading: false });
        default:
            return state;
    }
}

export default reducer;