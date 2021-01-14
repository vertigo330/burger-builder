import React from 'react';
import classes from './Order.module.css'

const order = (props) => {

  const ingredients = [];

  for(let name in props.ingredients){
    ingredients.push(
      {
        name: name,
        amount: props.ingredients[name]});
  }

  const ingredientOutput = ingredients.map(ig => {
    return (<span 
      style={{textTransform: 'capitalize', display: 'inline-block', margin: '0 8px', border: '1px solid #ccc', padding: '5px'}}
      key={ig.name}>{ig.name} ({ig.amount})</span>)
  });

  return (  
    <div className={classes.Order}>
        <p>Ingredients: {ingredientOutput}</p>
        <p>Price:<b>USD {props.price.toFixed(2)}</b></p>
    </div>
  );
}

export default order;