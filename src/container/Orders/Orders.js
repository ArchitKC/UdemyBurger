import React, { Component } from 'react';
import {connect} from 'react-redux';

import Order from '../../components/Order/Order'; 
import axios from '../../axios-order';
import withError from '../../hoc/withErrorHandler/withErrorHandler';
import * as orderAction from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
 
    componentDidMount(){ 
        this.props.onOrderFetch();
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
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        onOrderFetch :() => dispatch(orderAction.getOrders())
    }
}

export default connect(mapsStateToProps,mapDispatchToProps)(withError(Orders, axios));