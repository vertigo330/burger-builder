import * as actionType from './actionsTypes';
import axiosInstance from '../../axios-orders';

export const purchasedInit = () => {
    return {
        type: actionType.PURCHASE_INIT
    }
}

export const postOrderStarted = () => {
    return {
        type: actionType.POST_ORDER_STARTED
    };
}

export const postOrderSucceeded = (id, orderData) => {
    return {
        type: actionType.POST_ORDER_SUCCEEDED,
        orderId: id,
        orderData: orderData
    }
}

export const postOrderFailed = (error) => {
    return {
        type: actionType.POST_ORDER_FAILED,
        error: error
    }
}

export const postOrderData = (orderData, token) => {
    return dispatch => {
        dispatch(postOrderStarted());
        axiosInstance.post(`orders.json?auth=${token}`, orderData)
            .then(resp => {
                dispatch(postOrderSucceeded(resp.data.name, orderData));
            })
            .catch(ex => {
                console.error(ex)
                dispatch(postOrderFailed(ex));
            });
    }
}

export const fetchOrderStarted = () => {
    return {
        type: actionType.FETCH_ORDER_STARTED
    }
}

export const fetchOrderSucceeded = (orders) => {
    return {
        type: actionType.FETCH_ORDER_SUCCEEDED,
        orders: orders
    }
}

export const fetchOrderFailed = (err) => {
    return {
        type: actionType.FETCH_ORDER_FAILED,
        error: err
    }
}

export const fetchOrder = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStarted())
        const query = `auth=${token}&orderBy="userId"&equalTo="${userId}"`;
        axiosInstance.get(`/orders.json?${query}`)
            .then(resp=>{
                const fetchedOrders = [];
                for(let key in resp.data)
                {
                    fetchedOrders.push({
                        ...resp.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrderSucceeded(fetchedOrders));
            })
            .catch(ex=>{
                dispatch(fetchOrderFailed(ex));
            });
    }
}