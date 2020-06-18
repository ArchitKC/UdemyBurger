import React from 'react'

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';


const controls = [
    {label : 'Lettuce', type: 'lettuce'},
    {label : 'Meat', type: 'meat'},
    {label : 'Cheese', type: 'cheese'},
    {label : 'Bacon', type: 'bacon'},
]

const buildControls =(props) =>(
    <div className={classes.BuildControls}>
        <p>Current Price : <strong>$ {props.price}</strong></p>
        {controls.map(ctrl=>(
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                addingItem = {()=>props.addItem(ctrl.type)}
                removingItem = {()=>props.removeItem(ctrl.type)}
                disabled={props.disabled[ctrl.type]}>                  
            </BuildControl>
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordering}>
            ORDER NOW</button>
    </div>
);

export default buildControls;