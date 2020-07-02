import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-order';


export const purchaseOrderSuccess = (id,orderData)=>{
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


export const getPurchaseOrder = (orderData)=>{
    return dispatch=>{  
        dispatch(purchaseOrderStart());
        axiosInstance.post('/orders.json',orderData)
            .then((response)=>{ 
                dispatch(purchaseOrderSuccess(response.data.name,orderData))
            })
            .catch((error)=>{ 
                dispatch(purchaseOrderFail(error))
            });
    };
}

export const purchaseinit=()=>{
    return{
        type: actionTypes.purchase_init
    }
}

export const fetchOrderfail =(error)=>{
    return{
        type : actionTypes.fetch_order_fail,
        error: error
    }
}

export const fetchOrderStart =()=>{
    return{
        type : actionTypes.fetch_order_start
    }
}

export const fetchOrderSuccess = (orders)=>{
    return{
        type : actionTypes.fetch_order_success,
        orders : orders
    }
} 

export const getOrders = (token)=>{
    return dispatch =>{
        dispatch(fetchOrderStart());
        const fetchedOrder =[];
        axiosInstance.get('/orders.json?auth=' +token)
        
        .then((response)=>{ 
            for (const key in response.data) {
                fetchedOrder.push({ 
                    ...response.data[key],
                    id: key
                });
            }
            dispatch(fetchOrderSuccess(fetchedOrder)); 
        })
        .catch((error)=>{ 
            dispatch(fetchOrderfail(error))
        });
    }
}

export const fetchOrderInit = ()=>{
    return{
        type : actionTypes.fetch_order_init
    }
}