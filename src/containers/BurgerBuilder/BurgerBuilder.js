import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 1.3
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            bacon: 0,
            meat: 0
        },
        totalPrice: 4,
        enableOrder: false,
        isPurchaseMode: false
    }

    updateEnabledOrderState(ingredients){
        const ingredientSum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((total, current) => total = total + current, 0);
        
        this.state.enableOrder = ingredientSum > 0;
    }

    addIngredientHandler = (type) => {
        //Update ingredient count
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        //update total price
        const priceToAdd = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceToAdd;

        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
        this.updateEnabledOrderState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        //Update ingredient count
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount > 0 ? oldCount - 1 : 0;

        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        //update total price
        const priceToDeduct = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceToDeduct;

        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
        this.updateEnabledOrderState(updatedIngredients);
    }

    orderHandler = () => {
        this.setState({isPurchaseMode: true});
    }

    purchadeCancelHandler = () => {
        this.setState({isPurchaseMode: false});
    }
    
    purchadeContinueHandler = () => {
        alert('Continued!');
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        
        return (
            <Aux>
                <Modal show={this.state.isPurchaseMode} modalClosed={this.purchadeCancelHandler}>
                    <OrderSummary 
                        OnContinued={this.purchadeContinueHandler}
                        OnCancelled={this.purchadeCancelHandler}
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice.toFixed(2)}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients } />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                    enableOrder = {this.state.enableOrder}
                    ordered={this.orderHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;