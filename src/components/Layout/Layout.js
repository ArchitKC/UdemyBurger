import React, {useState} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxilliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


const layout =(props)=>{ 
    const [sideDrawerVisible, setSideDrawerVisible] = useState(false)     

    const sideDrawerClosedHandler = () => {
        setSideDrawerVisible(false);
        }

    const drawerToggleHandler=()=>{
         setSideDrawerVisible(!sideDrawerVisible);
    }
     
        return(
                <Aux>
                    <Toolbar 
                    isAuthenticated = {props.isAuthenticated}
                    drawerToggleClicked={drawerToggleHandler}
                    />
                    <SideDrawer                           
                        isAuthenticated = {props.isAuthenticated}
                        open={sideDrawerVisible}
                        closed={sideDrawerClosedHandler}
                        />
                    <main className={classes.MainContent}>
                        {props.children}
                    </main>
                </Aux>
        );
};

const mapStateToProps = state =>{
    return{
        isAuthenticated : state.auth.token !==null
    }
};


export default connect(mapStateToProps)(layout);