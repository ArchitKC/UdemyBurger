import * as actionType from '../actions/actionTypes'; 

const initialState ={
    orders: [],
    purchased : false,
    loading : false
}

const reducer = (state=initialState,action)=>{ 
        switch(action.type){
            case  actionType.purchase_init : {
                return{
                    ...state,
                    purchased :false
                }
            }
            case actionType.purchase_order_start :{
                return{
                    ...state,
                    loading : true
                };
            }
            case actionType.purchase_order_success :{
                const newOrder ={
                    ...action.orderData,
                    id: action.Orderid
                }
                return{
                    ...state,
                    loading : false,
                    purchased : true,
                    orders : state.orders.concat(newOrder)
                };
            }                
            case actionType.purchase_order_fail :{
                return{
                    ...state,
                    loading : false

                };
            } 
            case actionType.fetch_order_init:{
                return{
                    ...state,
                    loading : false
                }
            }
            case actionType.fetch_order_start : {
                return{
                    ...state,
                    loading : true
                }
            }
            case actionType.fetch_order_success:{
                return {
                    ...state,
                    orders : action.orders,
                    loading : false
                }
            }
            case actionType.fetch_order_fail :{
                return{
                    ...state,
                    loading : true
                }
            }
            default :
             return state;
    }
}
 

export default reducer;