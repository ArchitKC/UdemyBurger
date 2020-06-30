import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-order';


export const getPurchaseOrder = (id,orderData)=>{
    return{
        type : actionTypes.purchase_order_success,
        Orderid : id,
        orderData : orderData
    }
}

export const purchaseOrderFail =(error)=>{
    return{
        type : actionTypes.purchase_order_fail,
        error : error
    };
}

export const purchaseOrderStart=()=>{
    return{
        type : actionTypes.purchase_order_start
    };
}


export const purchaseOrderSuccess = (orderData)=>{
    return dispatch=>{  
        dispatch(purchaseOrderStart());
        axiosInstance.post('/orders.json',orderData)
            .then((response)=>{ 
                dispatch(getPurchaseOrder(response.data.name,orderData))
            })
            .catch((error)=>{ 
                dispatch(actionTypes.purchase_order_fail(error))
            });
    };
}