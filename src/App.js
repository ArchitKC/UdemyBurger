import React,{Component} from 'react';
import { connect } from 'react-redux';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom'

import Layout from './components/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';  
import Logout from './container/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent'


const asyncCheckout = asyncComponent(() => {
  return import('./container/CheckOut/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./container/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./container/Auth/Auth');
});


class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }
  
  render () {
            let routes = (
                      <Switch>
                          <Route path="/auth" component={asyncAuth}></Route>
                          <Route path="/" exact component={BurgerBuilder}></Route>  
                          <Redirect to="/" />
                      </Switch>
                    );
            if ( this.props.isAuthenticated ) {
                      routes = (
                        <Switch>
                            <Route path="/checkout" component={asyncCheckout}></Route>
                            <Route path="/auth" component={asyncAuth}></Route>
                            <Route path="/orders" component={asyncOrders}></Route>
                            <Route path="/logout" exact component={Logout}></Route> 
                            <Route path="/" exact component={BurgerBuilder}></Route>  
                            <Redirect to="/" />
                        </Switch>
                      );
                    }
    return (
            <div>
              <Layout>
                {routes}
             </Layout>
            </div>
          );
    }
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

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
