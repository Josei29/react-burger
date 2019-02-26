import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENTS_PRICES = {
    salad: 0.4,
    bacon: 0.6,
    cheese: 0.8,
    meat: 1
};

// Functions that are called by our Switch()

const addIngredient = (state, action) => {
    let updatedIngredient = {[action.ingredient]: state.ingredients[action.ingredient] + 1};
    let updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    let updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredient],
        building: true
    };

    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    let updatedIg = { [action.ingredient]: state.ingredients[action.ingredient] - 1 };
    let updatedIgs = updateObject(state.ingredients, updatedIg);
    let updatedSt = {
        ingredients: updatedIgs,
        totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredient],
        building: true
    };

    return updateObject(state, updatedSt);
};

const setIngredients = (state, action) => {
    return {
        ...state,
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building: false
    };
};

const ingredientsFailed = (state, action) => {
    return updateObject(state, {error: true});
};

// Reducer calling our previous functions

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);

        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        
        case actionTypes.INGREDIENTS_FAILED: return ingredientsFailed(state, action);

        default: return state;
    };
};

export default reducer;