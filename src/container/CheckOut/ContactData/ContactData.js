import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axiosInstance from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner'; 

class ContactData extends Component {
    state={
        name: '',
        email : '',
        address:{
            state : '',
            street : '',
            zipCode : ''
        },
        loading : false
    }

    orderHandler=(event)=>{
        event.preventDefault(); 
        console.log(this.props.ingredients)
        this.setState({loading:true});
        const order={
            ingredients : this.props.ingredients,
            price : this.props.totalPrice,
            customer : {
                name:'Archit',
                address : {
                    street: 'test123',
                    zipCode : '12233',
                    state: 'PA'
                },
                email : 'test@123.com'
            },
            delivery : 'express'
        }         
        axiosInstance.post('/orders.json',order)
            .then((response)=>{
                console.log(response);
                this.setState({loading:false})
                this.props.history.push('/');
            })
            .catch((error)=>{
                console.log(error);
                this.setState({loading:false})
            });
    }

    render(){
        let form=(<form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name"></input>                   
                    <input className={classes.Input} type="email" name="email" placeholder="Your Email"></input>
                    <input className={classes.Input} type="text" name="state" placeholder="State"></input>
                    <input className={classes.Input} type="text" name="street" placeholder="Your street"></input>
                    <input className={classes.Input} type="text" name="zipCode" placeholder="Your Zip Code"></input>
                    <div>
                        <Button btntype="Success" clicked={this.orderHandler}>Order Now</Button>
                        <Button btntype="Danger">Cancel Now</Button>
                    </div>
                </form>);
        if(this.state.loading){
            form = <Spinner/>;
        }
        return(
            <div className={classes.ContactData}>
                <h4>Personal Details</h4>
                {form}
            </div>
        );
    };
    
}

export default ContactData;