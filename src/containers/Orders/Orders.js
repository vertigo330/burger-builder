import React, { Component } from 'react';
import Order from '../../components/Order/Order'

import axiosInstance from '../../axios-orders'
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token);
    }

    render() {
        let orders = <Spinner />

        if(!this.props.loading){
            orders = (
                orders = this.props.orders.map(o => (
                    <Order 
                        key={o.id} 
                        ingredients={o.ingredients}
                        price={+o.price} />
                ))
            )
        }

        return (
            <div>
                { orders }
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrder(token))
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosInstance));