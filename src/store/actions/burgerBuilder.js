import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-order';

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

export const initIngredient=(ingredients)=>{
    return {
        type: actionTypes.set_ingredients,
        ingredients: ingredients
    };

}

export const fetchFailedIngredients =() =>{
    return{
        type : actionTypes.fetchingredient_error,
        error : true
    }
}

export const setIngredients =()=>{
    return dispatch => {
        axiosInstance.get( '/ingredients.json' )
        .then( response => {
           dispatch(initIngredient(response.data));
        } )
        .catch( error => {
            dispatch(fetchFailedIngredients());
        } );
    }
} 
