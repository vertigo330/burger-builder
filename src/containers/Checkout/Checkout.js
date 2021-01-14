import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

import { connect } from 'react-redux';

class Checkout extends Component {
   
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {       
        return (
            <div>
                <CheckoutSummary 
                    checkoutContinuedHandler={this.checkoutContinuedHandler}
                    checkoutCancelledHandler={this.checkoutCancelledHandler}
                    ingredients={this.props.ingredients} 
                    />
                <Route path={this.props.match.path + '/contact-data'} component={ ContactData } />
            </div>
        )
    }
}

const MapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

export default connect(MapStateToProps)(Checkout);