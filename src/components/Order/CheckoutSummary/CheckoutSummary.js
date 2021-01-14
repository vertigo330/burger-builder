import React from 'react'
import Button from '../../UI/Button/Button'
import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.module.css'

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes fantastic!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger" clicked={props.checkoutCancelledHandler}>CANCEL</Button>
            <Button btnType="Success"clicked={props.checkoutContinuedHandler}>CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary; 