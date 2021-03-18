import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

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
        let summary = <Redirect to="/" />

        if(this.props.ingredients){
            const redirector = this.props.purchased ? <Redirect to="/" /> : null
            summary = (
                <div>
                    <CheckoutSummary 
                        checkoutContinuedHandler={this.checkoutContinuedHandler}
                        checkoutCancelledHandler={this.checkoutCancelledHandler}
                        ingredients={this.props.ingredients} 
                        />
                    <Route path={this.props.match.path + '/contact-data'} component={ ContactData } />
                    {
                        redirector
                    }
                </div>
            )
        }

        return summary;
    }
}

const MapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(MapStateToProps)(Checkout);