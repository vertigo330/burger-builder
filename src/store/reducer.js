import * as actionType from './actions'

const initialState = {
    ingredients: {
        bacon: 0,
        cheese: 0,
        meat: 0,
        salad: 0
    },
    totalPrice: 4
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.7,
    meat: 1.3
}

const reducer = (state = initialState, action) => {
    
    switch(action.type) {
        case actionType.INIT: {
            return {
                ...state,
                ingredients: {
                    ...state.ingredientData
                }
            };
        }
        case actionType.ADD: {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: state.ingredients[action.ingredientType] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType]
            }
        }
        case actionType.REMOVE: {
            return {
                ...state,
                ingredients: {
                  ...state.ingredients,
                  [action.ingredientType]: state.ingredients[action.ingredientType] - 1
              },
              totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType]
            }
        }
        default:
            return state;
    }
}

export default reducer;