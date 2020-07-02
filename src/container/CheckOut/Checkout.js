import React, { Component } from 'react'; 
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
 
class Checkout extends Component {
  
    cancelledOrder=()=>{
        this.props.history.goBack();
    }

    continueOrder=()=>{
        this.props.history.push('/checkout/purchase-contact');
    }

    render () {
        let summary = <Redirect to="/"></Redirect>
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary = (<div>
                            {purchasedRedirect}
                            <CheckoutSummary 
                                ingredients={this.props.ings}
                                cancelledOrder = {this.cancelledOrder}
                                continueOrder={this.continueOrder}
                            ></CheckoutSummary> 
                            <Route 
                                path={this.props.match.path + "/purchase-contact"}  
                                component={ContactData}>
                            </Route>
                        </div>);
        }
        return  summary
    }
}

const mapsStateToProps=state=>{
    return{
        ings: state.burgerBuilder.ingredients,
        purchased : state.order.purchased  
    };
}

export default connect(mapsStateToProps)(Checkout);