import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler'
import axiosInstance from '../../axios-orders';

import * as actionType from '../../store/actions';
import { connect } from 'react-redux';


class BurgerBuilder extends Component {

    state = {
        isPurchaseMode: false,
        isLoading: false,
        error: false
    }

    componentDidMount(){
        // axiosInstance.get('https://burger-builder-af20a.firebaseio.com/ingredients.json')
        //     .then(resp=>{
        //         this.props.onIngredientsInitialized(resp.data);
        //     })
        //     .catch(error => {this.setState({error: true})});
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
        this.props.history.push('/checkout');
    }

    render(){
        const disabledInfo = {
            ...this.props.ingredients
        };

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let burger = this.state.error ? <p>The application is not usable.</p> : <Spinner />
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

        if(this.state.isLoading) {
            modalContent = <Spinner />
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
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatcherToProps = (dispatch) => {
    return {
        onIngredientsInitialized: (ig) => dispatch({ type: actionType.INIT, ingredientData:  ig }),
        onIngredientAdded: (type) => dispatch({ type: actionType.ADD, ingredientType: type }),
        onIngredientRemoved: (type) => dispatch({ type: actionType.REMOVE, ingredientType: type })
    }
}

export default connect(mapStateToProps, mapDispatcherToProps)(withErrorHandler(BurgerBuilder, axiosInstance));