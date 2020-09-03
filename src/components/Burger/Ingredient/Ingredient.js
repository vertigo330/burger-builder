import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Ingredient.module.css';

class Ingredient extends Component {
    render(){
        let styled = null;

        switch(this.props.type){
            case('bread-top'):
                styled = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1} />
                        <div className={classes.Seeds2} />
                    </div>
                )
                break;
            case('bread-bottom'):
                styled = <div className={classes.BreadBottom}></div>
                break;
            case('meat'):
                styled = <div className={classes.Meat}></div>
                break;
            case('cheese'):
                styled = <div className={classes.Cheese}></div>
                break;
            case('salad'):
                styled = <div className={classes.Salad}></div>
                break;
            case('bacon'):
                styled = <div className={classes.Bacon}></div>
                break;
            default:
                styled = null;
        }
        return styled;
    }
}

Ingredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default Ingredient;