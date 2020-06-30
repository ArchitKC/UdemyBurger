 
import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES ={
    meat : 2.5,
    cheese : 0.5,
    bacon : 0.99,
    lettuce : 0.25
}

const initialState ={
    ingredients: null,
    totalPrice : 4,
    error : false
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.add_ingredient :{
            return{ 
                ...state,
                ingredients :{
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1,
                },
                totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        }
        case actionTypes.remove_ingredient :{
            return{
                ...state,
                ingredients :{
                    ...state.ingredients,
                    [action.ingredientsName] : state.ingredients[action.ingredientsName] - 1
                },
                totalPrice : state.totalPrice - INGREDIENT_PRICES[action.ingredientsName]
            };
        }
        case actionTypes.set_ingredients:{
            return{
                ...state,
                ingredients : action.ingredients,
                totalPrice : 4,
                error : false
            };
        }
        case actionTypes.fetchingredient_error : {
            return {
                ...state,
                error : true
            };
        }
        default:
            return state;    
    }
}


export default reducer;
