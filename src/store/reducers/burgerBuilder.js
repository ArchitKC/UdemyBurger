 
import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES ={
    meat : 2.5,
    cheese : 0.5,
    bacon : 0.99,
    lettuce : 0.25
}

const initialState ={
    ingredients: {
        lettuce: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    } ,
    totalPrice : 4
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
        default:
            return state;    
    }
}


export default reducer;
