import React from 'react';
import Aux from '../../hoc/Auxilliary'
import classes from './Layout.css'

const Layout = (props) => (
    <Aux>
        <div className={classes.MainContent}>
            Toolbar,Sidebar
        </div>
        <main className={classes.MainContent}>
            {props.children}
        </main>
    </Aux>

);


export default Layout;