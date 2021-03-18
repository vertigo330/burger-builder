import * as actionTypes from './actionsTypes';
import axiosInstance from '../../axios-orders';

export const addIngredient = (name) => {
    return { 
        type: actionTypes.ADD_INGREDIENT, 
        ingredientType: name 
    };
}

export const removeIngredient = (name) => {
    return { 
        type: actionTypes.REMOVE_INGREDIENT, 
        ingredientType: name 
    };
}

export const setIngredients = (ingredients) => {
    return { 
        type: actionTypes.INITIALIZE_INGREDIENTS, 
        ingredients: ingredients 
    };
}

export const fetchIngredientsFailed = () => {
    return { 
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
}

export const initIngredients = () => {
    return dispatch => {
        axiosInstance.get('https://burger-builder-af20a.firebaseio.com/ingredients.json')
            .then(resp => {
                dispatch(setIngredients(resp.data));
            })
            .catch(error => 
            {
                dispatch(fetchIngredientsFailed());
            });
    }
}