 
import * as actionTypes from '../actions/actionTypes';
import {updateObject} from './../utility';

const INGREDIENT_PRICES ={
    meat : 2.5,
    cheese : 0.5,
    bacon : 0.99,
    lettuce : 0.25
}

const initialState ={
    ingredients: null,
    totalPrice : 4,
    error : false,
    building : false
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.add_ingredient :{
            const updatedIngredient = {[action.ingredientName] : state.ingredients[action.ingredientName] + 1};
            const updatedIngredients = updateObject(state.ingredients,updatedIngredient);  
            const newState = { 
                ingredients : updatedIngredients,
                totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building : true
            }
            return updateObject(state,newState);
        }
        case actionTypes.remove_ingredient :{
            return{
                ...state,
                ingredients :{
                    ...state.ingredients,
                    [action.ingredientsName] : state.ingredients[action.ingredientsName] - 1,
                    building : true
                },
                totalPrice : state.totalPrice - INGREDIENT_PRICES[action.ingredientsName]
            };
        }
        case actionTypes.set_ingredients:{
            return updateObject(state,{ingredients : 
                                            action.ingredients,
                                            totalPrice : 4,
                                            error : false,
                                            building : false
                                        }
                                ); 
        }
        case actionTypes.fetchingredient_error : {
            return updateObject(state,{error : true});
        }
        default:
            return state;    
    }
}


export default reducer;
