import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as authActions from '../../store/actions/index';
import Spinner from './../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {updateObject,checkValidity} from '../../shared/utility';

const auth = (props) =>{ 
    const [authForm, setAuthForm] = useState({
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        });
        const [isSignin, setisSignin]  = useState(true);

    useEffect(()=>{
        if (!props.burgerBuilder && props.authRedirectPath !== '/') {
            props.onSetAuthRedirect();
    }},[])
     

    

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(authForm,{
            [controlName]: updateObject(authForm[controlName],{
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation),
                touched: true
                })  
            });
        setAuthForm(updatedControls); 
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuthenticate(authForm.email.value, authForm.password.value,isSignin);
    }

    const onSwitchSignHandler = ()=>{
        setisSignin(!isSignin);
    }
 
        const formElementsArray = [];
        for ( let key in authForm ) {
            formElementsArray.push( {
                id: key,
                config: authForm[key]
            } );
        }
        
        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => inputChangedHandler( event, formElement.id )} />
        ));

        if(props.loading){
            form = <Spinner></Spinner>;
        }

        let errorMessage = null;

        if(props.error){
            errorMessage=(
                <p>{props.error.message}</p>
            );}

        let authRedirect = null;
        if(props.isAuthenticated){
            authRedirect =(
                            <Redirect to ={props.authRedirectPath}></Redirect>
            )} 
        

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={submitHandler}>
                    {form}
                    <Button btntype="Success">SUBMIT</Button>
                </form>
                <Button 
                    btntype="Danger" 
                    clicked={onSwitchSignHandler}>
                     {isSignin ?'SIGN IN' : 'SIGN UP' }
                </Button>
            </div>
        );
    
}

const mapsPropsToState = (state)=>{
    return{
        loading : state.auth.loading,
        error : state.auth.error,
        isAuthenticated : state.auth.token !== null,
        burgerBuilder : state.burgerBuilder.building,
        authRedirectPath : state.auth.authRedirectPath
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        onAuthenticate : (email,password,signIn)=>dispatch(authActions.authenticating(email,password,signIn)),
        onSetAuthRedirect : ()=>dispatch(authActions.setAuthRedirectPath('/'))
    }
}

 
export default  connect(mapsPropsToState, mapDispatchToProps)(auth);