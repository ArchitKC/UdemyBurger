import * as actionTypes from './actionTypes';

export const addIngredient = (name) =>{
    return{
        type : actionTypes.add_ingredient,
        ingredientName : name
    }
}

export const removeIngredient = (name) =>{
    return{
        type : actionTypes.remove_ingredient,
        ingredientsName : name
    }
}
