import React,{useEffect,Suspense} from 'react';
import { connect } from 'react-redux';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom'

import Layout from './components/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';  
import Logout from './container/Auth/Logout/Logout';
import * as actions from './store/actions/index'; 


const Checkout = React.lazy(() => {
  return import('./container/CheckOut/Checkout');
});

const Orders = React.lazy(() => {
  return import('./container/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./container/Auth/Auth');
});


const app = props =>{
  useEffect(()=>{
    props.onTryAutoSignup();
  },[])
    
    let routes = (
              <Switch>
                  <Route path="/auth" render={(props)=><Auth {...props}></Auth>}></Route>
                  <Route path="/" exact component={BurgerBuilder}></Route>  
                  <Redirect to="/" />
              </Switch>
            );
    if ( props.isAuthenticated ) {
              routes = (
                <Switch>
                    <Route path="/checkout" render={(props)=><Checkout {...props}></Checkout>}></Route>
                    <Route path="/auth" render={(props)=><Auth {...props}></Auth>}></Route>
                    <Route path="/orders" render={(props)=><Orders {...props}></Orders>}></Route>
                    <Route path="/logout" exact component={Logout}></Route> 
                    <Route path="/" exact component={BurgerBuilder}></Route>  
                    <Redirect to="/" />
                </Switch>
              );
            }
    return (
            <div>
              <Layout>
                <Suspense fallback={<p>...Loading</p>}>{routes}</Suspense>
             </Layout>
            </div>
          );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( app ) );
