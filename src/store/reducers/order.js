import * as actionType from '../actions/actionTypes'; 

const initialState ={
    orders : [],
    purchasing : true

}

const reducer = (state=initialState,action)=>{ 
        switch(actionType){
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
                    orders : state.orders.concat(newOrder)
                };
            }                
            case actionType.purchase_order_fail :{
                return{
                    ...state,
                    loading : false

                };
            } 
            default :
             return state;
    }
}
 

export default reducer;