import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (ingredient) => {
    return {
        type: actionTypes.ADD_INGREDIENT, 
        ingredient: ingredient
    };
};

export const removeIngredient = (ingredient) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT, 
        ingredient: ingredient
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const ingredientsFailed = () => {
    return {
        type: actionTypes.INGREDIENTS_FAILED
    };
};

export const initIngredients = () => {
    return dispatch => {
        axios.get("https://react-burger-a411b.firebaseio.com/ingredients.json").then(res => {
            dispatch(setIngredients(res.data));
        }).catch(err => {
            dispatch(ingredientsFailed());
        });
    };
};