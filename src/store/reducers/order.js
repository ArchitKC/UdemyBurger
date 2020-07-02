import * as actionType from '../actions/actionTypes'; 
import {updateObject} from './../utility';
const initialState ={
    orders: [],
    purchased : false,
    loading : false,
    error : null
}

const reducer = (state=initialState,action)=>{ 
        switch(action.type){
            case  actionType.purchase_init : {
                return updateObject(state,{purchased :false}) 
            }
            case actionType.purchase_order_start :{
                return updateObject(state,{loading : true}) 
            }
            case actionType.purchase_order_success :{
                const newOrder =updateObject(action.orderData,{id:action.Orderid});
                return updateObject(state,{loading : false,
                                            purchased : true,
                                            orders : state.orders.concat(newOrder)})
            }                
            case actionType.purchase_order_fail :{
                return updateObject(state,{loading : false}) 
            } 
            case actionType.fetch_order_init:{
                return updateObject(state,{loading : false}) 
            }
            case actionType.fetch_order_start : {
                return updateObject(state,{loading : true}) 
            }
            case actionType.fetch_order_success:{
                return updateObject(state,{orders : action.orders,loading : false})                 
            }
            case actionType.fetch_order_fail :{
                return updateObject(state,{loading : true}) 
            }
            default :
             return state;
    }
}
 

export default reducer;