import React, { Component } from 'react';

import Order from '../../components/Order/Order'; 
import axios from '../../axios-order';
import withError from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state={
        orders:[],
        loading : true
    }

    componentDidMount(){
        const fetchedOrder =[];
        axios.get('/orders.json')
        .then((response)=>{ 
            for (const key in response.data) {
                fetchedOrder.push({ 
                    ...response.data[key],
                    id: key
                });
            }
            this.setState( {loading: false, orders:fetchedOrder } ); 
        })
        .catch(err=>{
            this.setState( { loading: true } );
        });

    }

     render(){
                return(
                    <div>
                        {this.state.orders.map(order=>(
                            <Order 
                                key={order.id}
                                ingredients={order.ingredients}
                                price={+order.price}></Order>
                        ))}
                    </div>
                );
     }
}

export default withError(Orders, axios);