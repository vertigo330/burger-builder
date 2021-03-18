import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler'

import axiosInstance from '../../axios-orders';

import * as actionType from '../../store/actions/index';
import { connect } from 'react-redux';


class BurgerBuilder extends Component {

    state = {
        isPurchaseMode: false
    }

    componentDidMount(){
      this.props.onInitIngredients();
    }

    EnableOrder(ingredients) {
        const ingredientSum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((total, current) => total = total + current, 0);
        
       return ingredientSum > 0;
    }

    orderHandler = () => {
        this.setState({isPurchaseMode: true});
    }

    purchaseCancelHandler = () => {
        this.setState({isPurchaseMode: false});
    }
    
    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    }

    render(){
        const disabledInfo = {
            ...this.props.ingredients
        };

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let burger = this.props.error ? <p>The application is not usable.</p> : <Spinner />
        let modalContent = null;

        if(this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients } />
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabledInfo={disabledInfo}
                        price={this.props.totalPrice}
                        enableOrder = {this.EnableOrder(this.props.ingredients)}
                        ordered={this.orderHandler}
                    />
                </Aux>
            )

            modalContent = (<OrderSummary 
                OnContinued={this.purchaseContinueHandler}
                OnCancelled={this.purchaseCancelHandler}
                ingredients={this.props.ingredients}
                price={this.props.totalPrice.toFixed(2)}
            />)
        }
        
        return (
            <Aux>
                <Modal show={this.state.isPurchaseMode} modalClosed={this.purchaseCancelHandler}>
                    {modalContent}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitIngredients: () => dispatch(actionType.initIngredients()),
        onIngredientAdded: (type) => dispatch(actionType.addIngredient(type)),
        onIngredientRemoved: (type) => dispatch(actionType.removeIngredient(type)),
        onPurchaseInit: () => dispatch(actionType.purchasedInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosInstance));