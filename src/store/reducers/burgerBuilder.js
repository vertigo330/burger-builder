import * as actionType from '../actions/actionsTypes';
import { updateObject } from '../Utility.js';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 1.3
}

function fetchIngredientsFailed(state) {
    return updateObject(state, { error: true });
}

function initializeIngredients(action, state) {
    const ingredients = {
        salad: action.ingredients.salad,
        bacon: action.ingredients.bacon,
        cheese: action.ingredients.cheese,
        meat: action.ingredients.meat
    };
    return updateObject(state, { ingredients: ingredients, totalPrice: 4, error: false, building: false });
}

function addIngredient(state, action) {
    const updatedIngredients = updateObject(state.ingredients, { [action.ingredientType]: state.ingredients[action.ingredientType] + 1 });
    return updateObject(state, { ingredients: updatedIngredients, totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType], building: true });
}

function removeIngredient(state, action) {
    const updatedIngredients = updateObject(state.ingredients, { [action.ingredientType]: state.ingredients[action.ingredientType] - 1 });
    return updateObject(state, { ingredients: updatedIngredients, totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType], building: true });
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.ADD_INGREDIENT: 
            return addIngredient(state, action);
        case actionType.REMOVE_INGREDIENT: {
            return removeIngredient(state, action);
        }
        case actionType.INITIALIZE_INGREDIENTS: {
            return initializeIngredients(action, state);
        }
        case actionType.FETCH_INGREDIENTS_FAILED: {
            return fetchIngredientsFailed(state);
        }
        default:
            return state;
    }
}

export default reducer;