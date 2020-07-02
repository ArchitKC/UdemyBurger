import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as authActions from '../../store/actions/index';
import Spinner from './../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {updateObject,checkValidity} from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
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
        },
        isSignin : true
    }

    componentDidMount() {
        if (!this.props.burgerBuilder && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirect();
        }
    }

    

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls,{
            [controlName]: updateObject(this.state.controls[controlName],{
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
                })  
            });
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuthenticate(this.state.controls.email.value, this.state.controls.password.value,this.state.isSignin);
    }

    onSwitchSignHandler = ()=>{
        this.setState(prevState =>{
            return {isSignin : !prevState.isSignin}
        })
    }

    render () {
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
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
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ));

        if(this.props.loading){
            form = <Spinner></Spinner>;
        }

        let errorMessage = null;

        if(this.props.error){
            errorMessage=(
                <p>{this.props.error.message}</p>
            );}

        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect =(
                            <Redirect to ={this.props.authRedirectPath}></Redirect>
            )} 
        

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btntype="Success">SUBMIT</Button>
                </form>
                <Button 
                    btntype="Danger" 
                    clicked={this.onSwitchSignHandler}>
                     {this.state.isSignin ?'SIGN IN' : 'SIGN UP' }
                </Button>
            </div>
        );
    }
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

 
export default  connect(mapsPropsToState, mapDispatchToProps)(Auth);