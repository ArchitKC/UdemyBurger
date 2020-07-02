import React from 'react';

import classes from './Order.css';

const order = ( props ) => {

    const ingredient=[];

    for (const key in props.ingredients) { 
        ingredient.push({
            name : key,
            amount : props.ingredients[key]
        });
        
    } 

    const outputingredient= ingredient.map(item=>{
        return <span key={item.name}
                style={{textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'}}>{item.name} :{item.amount} </span>;
    });

    return (
        <div className={classes.Order}>
            <p>Ingredient : {outputingredient}</p>
            <p>Price :<strong> ${props.price.toFixed(2)}</strong></p>
    </div>

    );
};

export default order;