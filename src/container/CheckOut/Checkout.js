import React, { Component } from 'react'; 
import {Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
 
class Checkout extends Component {
    state = {
        ingredients : null,
        totalPrice : 0
    } 

    componentWillMount(){
        const queryParams = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice = '';
        for(let item of queryParams){
            if(item[0] === 'totalPrice'){
                totalPrice = item[1];
            }else{
            ingredients[item[0]] =+ item[1];}
        }

        this.setState({ingredients : ingredients, totalPrice : totalPrice});
    }

    cancelledOrder=()=>{
        this.props.history.goBack();
    }

    continueOrder=()=>{
        console.log(this.props)
        this.props.history.push('/checkout/purchase-contact');
    }

    render () {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    cancelledOrder = {this.cancelledOrder}
                    continueOrder={this.continueOrder}
                ></CheckoutSummary> 
                <Route 
                    path={this.props.match.path + "/purchase-contact"}  
                    render={(props)=>(<ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props}></ContactData>)}>
                </Route>
            </div>
        );
    }
}

export default Checkout;