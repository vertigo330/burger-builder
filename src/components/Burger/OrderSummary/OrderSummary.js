import React, { Component } from 'react';
import Auxilliary from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    //This can be converted to a functional component, does not need to be a class-based one.
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li>
                )
            });

        return (   
            <Auxilliary>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.OnCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.OnContinued}>CONTINUE</Button>
            </Auxilliary>);
    }
}

export default OrderSummary;