import React from 'react'

import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxilliary';

const functional = (props) =>{
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return(
            <Aux>
                <BackDrop show={props.open} clicked={props.closed}></BackDrop>
                <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo></Logo>
                </div>
                    <nav>
                        <NavigationItems isAuthenticated = {props.isAuthenticated}></NavigationItems>
                    </nav>
                </div>
            </Aux>
    );

};
export default functional;
 