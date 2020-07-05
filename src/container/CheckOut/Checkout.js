import React from 'react'; 
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const checkOut =(props)=>{ 
    const cancelledOrder=()=>{
        props.history.goBack();
    }

    const continueOrder=()=>{
        props.history.push('/checkout/purchase-contact');
    }
 
    let summary = <Redirect to="/"></Redirect>
    if( props.ings){
        const purchasedRedirect = props.purchased ? <Redirect to="/"/> : null;
        summary = (<div>
                        {purchasedRedirect}
                        <CheckoutSummary 
                            ingredients={props.ings}
                            cancelledOrder = {cancelledOrder}
                            continueOrder={continueOrder}
                        ></CheckoutSummary> 
                        <Route 
                            path={props.match.path + "/purchase-contact"}  
                            component={ContactData}>
                        </Route>
                    </div>);
    }
    return  summary
    
}

const mapsStateToProps=state=>{
    return{
        ings: state.burgerBuilder.ingredients,
        purchased : state.order.purchased  
    };
}

export default connect(mapsStateToProps)(checkOut);