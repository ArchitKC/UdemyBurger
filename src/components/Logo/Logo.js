import React from 'react';
import burgerLogo from '../../assests/original.png';
import classes from './Logo.css';

const Logo = (props) =>(
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="My Burger"></img>
    </div>
);
export default Logo;
 