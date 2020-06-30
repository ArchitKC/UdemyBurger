import React, { Component } from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'; 
import Modal from '../../components/UI/Modal/Modal'; 
import axiosInstance from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionType from '../../store/actions/index'; 

 
class BurgerBuilder extends Component{

    state={  
        purchasable: false,
        ordering : false,
    }

    componentDidMount () {
        this.props.onInitIngredients();
        //console.log(this.props)
        // 
        // axiosInstance.get('/ingredientsPrice.json')
        // .then((repsonse)=>{
        //     console.log(repsonse.data);
        //     // eslint-disable-next-line no-const-assign
        //     INGREDIENT_PRICES = repsonse.data;
        // })
        // .catch((error)=>{
        //     this.setState( { error: true } );
        // });
    }

    updatePurchasable=(ingredient)=>{ 
        const sum = Object.keys(ingredient)
                .map(igKey=>{
                    return ingredient[igKey];
                })
                .reduce((sum,el)=>{
                    return sum + el;
                },0);
         return  sum>0;
    } 

    isOrderingHandler = () =>{
        this.setState({ordering : true});
    }

    isOrderingCancelHandler=()=>{
        this.setState({ordering:false});
    }

    purchaseContinueHandler=()=>{ 
        this.props.history.push( '/checkout' );
    }

    render(){     
        const disabledInfo = {
            ...this.props.ings
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;        
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        burger = <Spinner></Spinner>

        if(this.props.ings){
            burger =(
                <Aux>
                    <Burger ingredients={this.props.ings}></Burger>           
                    <BuildControls
                        price = {this.props.price.toFixed(2)}
                        addItem = {this.props.onAddIngredients}
                        removeItem = {this.props.onRemoveIngredients}
                        purchasable = {this.updatePurchasable(this.props.ings)}
                        ordering={this.isOrderingHandler}
                        disabled={disabledInfo}>
                    </BuildControls>
                </Aux>);
                
                orderSummary =   
                        <OrderSummary 
                            price={this.props.price.toFixed(2)}
                            ingredient={this.props.ings}
                            orderCancel={this.isOrderingCancelHandler}
                            orderContinue={this.purchaseContinueHandler}
                        ></OrderSummary>  
        }
 
        return(
            <Aux>
                <Modal
                    display={this.state.ordering}
                    closeModal = {this.isOrderingCancelHandler}>                     
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
 
        );
    }
};

const mapsStateToProps=(state)=>{
    return{
        ings: state.ingredients,
        price : state.totalPrice, 
        error : state.error
    };
}

const mapsDispatchToProps=dispatch=>{
    return{ 
        onAddIngredients : (ingName)=>dispatch(actionType.addIngredient(ingName)),
        onRemoveIngredients: (ingName) => dispatch(actionType.removeIngredient(ingName)),
        onInitIngredients : ()=>dispatch(actionType.setIngredients())
    };
}

export default connect(mapsStateToProps,mapsDispatchToProps)(withErrorHandler(BurgerBuilder,axiosInstance));