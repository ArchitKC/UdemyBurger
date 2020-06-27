import React, { Component } from 'react'; 
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
 
class Checkout extends Component {
  
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
                    ingredients={this.props.ings}
                    cancelledOrder = {this.cancelledOrder}
                    continueOrder={this.continueOrder}
                ></CheckoutSummary> 
                <Route 
                    path={this.props.match.path + "/purchase-contact"}  
                    component={ContactData}>
                </Route>
            </div>
        );
    }
}

const mapsStateToProps=state=>{
    return{
        ings: state.ingredients,
        price : state.totalPrice
    };
}

export default connect(mapsStateToProps)(Checkout);