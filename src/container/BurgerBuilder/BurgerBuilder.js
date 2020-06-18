import React, { Component } from 'react'
import Aux from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'; 
import Modal from '../../components/UI/Modal'


const INGREDIENT_PRICES ={
    meat : 2.5,
    cheese : 0.5,
    bacon : 0.99,
    lettuce : 0.25
}

class BurgerBuilder extends Component{

    state={
        ingredients: {
            cheese :0,
            bacon : 0,
            lettuce : 0,
            meat: 0
        },
        totalPrice : 4,
        purchasable: false,
        ordering : false
    }

    updatePurchasable=(ingredient)=>{ 
        const sum = Object.keys(ingredient)
                .map(igKey=>{
                    return ingredient[igKey];
                })
                .reduce((sum,el)=>{
                    return sum + el;
                },0);
        this.setState({purchasable : sum>0});
    }

    addIngredientHandler=(type)=>{ 
        const updateingredientUpdate = {
            ...this.state.ingredients
        };
        updateingredientUpdate[type] = this.state.ingredients[type] + 1; 
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({totalPrice : newPrice, ingredients : updateingredientUpdate}); 
        this.updatePurchasable(updateingredientUpdate);
    }

    removeIngredientHandler=(type)=>{ 
        const updateIngredient = {
            ...this.state.ingredients
        };
        if(updateIngredient[type] > 0){
            updateIngredient[type] = this.state.ingredients[type] -1; 
            const reducePrice = this.state.totalPrice - INGREDIENT_PRICES[type];
            this.setState({ingredients : updateIngredient, totalPrice: reducePrice});
            this.updatePurchasable(updateIngredient);
        }
    }

    isOrderingHandler = () =>{
        this.setState({ordering : true});
    }

    isOrderingCancelHandler=()=>{
        this.setState({ordering:false});
    }

    purchaseContinueHandler=()=>{
        alert('Please Proceed');
    }

    render(){     
        const disabledInfo = {
            ...this.state.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return(
            <Aux>
                <Modal
                    display={this.state.ordering}
                    closeModal = {this.isOrderingCancelHandler}>                     
                    <OrderSummary 
                        price={this.state.totalPrice.toFixed(2)}
                        ingredient={this.state.ingredients}
                        orderCancel={this.isOrderingCancelHandler}
                        orderContinue={this.purchaseContinueHandler}
                    ></OrderSummary>    
                </Modal>
                <Burger ingredients={this.state.ingredients}></Burger>           
                <BuildControls
                    price = {this.state.totalPrice.toFixed(2)}
                    addItem = {this.addIngredientHandler}
                    removeItem = {this.removeIngredientHandler}
                    purchasable = {this.state.purchasable}
                    ordering={this.isOrderingHandler}
                    disabled={disabledInfo}>
                </BuildControls>
            </Aux>
 
        );
    }
};

export default BurgerBuilder;