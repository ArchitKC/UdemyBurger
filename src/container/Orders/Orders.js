import React, { useEffect } from 'react';
import {connect} from 'react-redux';

import Order from '../../components/Order/Order'; 
import axios from '../../axios-order';
import withError from '../../hoc/withErrorHandler/withErrorHandler';
import * as orderAction from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const orders =(props) =>{ 
    useEffect(()=>{
        props.onOrderFetch(props.token,props.userId);
    });  
 
    let orderDetails = <Spinner></Spinner>;
    if(!props.loading){
        orderDetails =props.orders.map(order=>(
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price}></Order>
                )) 
    }
    return(
    <div>
        {orderDetails}
    </div>
    );
      
}

const mapsStateToProps =(state)=>{
    return{
        orders: state.order.orders,
        loading: state.order.loading,
        token : state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        onOrderFetch :(token,userId) => dispatch(orderAction.getOrders(token,userId))
    }
}

export default connect(mapsStateToProps,mapDispatchToProps)(withError(orders, axios));