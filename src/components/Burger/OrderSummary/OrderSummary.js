import React from 'react'
import Aux from '../../../hoc/Auxiliary/Auxilliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) =>{
    const orderDetails = Object.keys(props.ingredient)
                        .map(igKey=>{
                            return(
                                <li key={igKey}>
                                    <span style={{textTransform:'capitalize'}}>{igKey}</span> : {props.ingredient[igKey]}
                                </li>
                            );
                        });
    return(
        <Aux>
            <h3>Your order summary</h3>
            <p>List of items in you order</p>
            <ul>
                {orderDetails}
            </ul>
            <p>Checkout?</p>

            <p>Total Price of the burger: <b>${props.price}</b></p>
            <Button
             btntype="Danger" clicked={props.orderCancel}>CANCEL</Button>
            <Button 
            btntype="Success" clicked={props.orderContinue}>PROCEED</Button>
        </Aux>
    );

};

export default orderSummary;  