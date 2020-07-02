import React, { Component } from 'react';
import {connect} from 'react-redux';

import Order from '../../components/Order/Order'; 
import axios from '../../axios-order';
import withError from '../../hoc/withErrorHandler/withErrorHandler';
import * as orderAction from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
 
    componentDidMount(){ 
        this.props.onOrderFetch(this.props.token,this.props.userId);
    }

     render(){
         let orderDetails = <Spinner></Spinner>;
         if(!this.props.loading){
             orderDetails =this.props.orders.map(order=>(
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

export default connect(mapsStateToProps,mapDispatchToProps)(withError(Orders, axios));