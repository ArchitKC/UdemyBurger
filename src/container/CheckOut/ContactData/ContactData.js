import React, { Component } from 'react';

import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axiosInstance from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner'; 
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state={
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: '',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        loading : false
    }

    orderHandler=(event)=>{
        event.preventDefault(); 
        console.log(this.props.ingredients)
        this.setState({loading:true});
        const formDataValue ={};

        for (let formValueIdentifier in this.state.orderForm){
            formDataValue[formValueIdentifier] = this.state.orderForm[formValueIdentifier].value;
        }
  
        const order={
            ingredients : this.props.ings,
            price : this.props.price,
            orderForm : formDataValue           
        }         
        axiosInstance.post('/orders.json',order)
            .then((response)=>{
                console.log(response);
                this.setState({loading:false})
                this.props.history.push('/orders');
            })
            .catch((error)=>{
                console.log(error);
                this.setState({loading:false})
            });
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }
    onChangedHandler=(event,inputIdentifier)=>{ 
        const updatedOrderForm ={
            ...this.state.orderForm
        };
        const updatedOrderValue={
            ...updatedOrderForm[inputIdentifier]
        }
        updatedOrderValue.value = event.target.value;
        updatedOrderValue.valid = this.checkValidity(updatedOrderValue.value, updatedOrderValue.validation);
        updatedOrderValue.touched = true;
        updatedOrderForm[inputIdentifier] = updatedOrderValue; 
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
            console.log(formIsValid);
        }
        this.setState({orderForm : updatedOrderForm, isValid : formIsValid});
        console.log(updatedOrderForm);
    }

    render(){
            const formOrder = [];

            for (const key in this.state.orderForm) {
                formOrder.push({
                    id : key,
                    details : this.state.orderForm[key]
                })
            }
            let form=(<form onSubmit={this.orderHandler}> 
                     {formOrder.map(formOrderItem=>(
                        <Input
                            key = {formOrderItem.id}
                            elementType = {formOrderItem.details.elementType}
                            elementConfig = {formOrderItem.details.elementConfig}
                            value = {formOrderItem.details.value}
                            invalid={!formOrderItem.details.valid}
                            shouldValidate={formOrderItem.details.validation}
                            touched={formOrderItem.details.touched}
                            changed ={(event)=>this.onChangedHandler(event,formOrderItem.id)}
                        ></Input>
                    ))}
                                     
                     <div>
                        <Button btntype="Success" disabled={this.state.formIsValid} >Order Now</Button> 
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

const mapsStateToProps=state=>{
    return{
        ings: state.ingredients,
        price : state.totalPrice
    };
}

export default connect(mapsStateToProps)(ContactData);