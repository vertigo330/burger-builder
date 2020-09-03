import React from 'react';
import Ingredient from './Ingredient/Ingredient';
import classes from './Burger.module.css'

const burger = (props) => {
    
    let transformedIngredient = Object.keys(props.ingredients)
        .map(i => {
            return [...Array( props.ingredients[i] )]
                .map((_, index) => {
                    return <Ingredient key={i + index} type={i} />        
                })
        })
        .reduce((total, next) => total.concat(next), []);

    if(transformedIngredient.length === 0 ){
        transformedIngredient = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <Ingredient type="bread-top" />
            { transformedIngredient }
            <Ingredient type="bread-bottom" />
        </div>
    );
}

export default burger;