import React,{Component} from 'react';
import { connect } from 'react-redux';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom'

import Layout from './components/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import CheckOut from './container/CheckOut/Checkout';
import Orders from './container/Orders/Orders';
import Auth from './container/Auth/Auth';
import Logout from './container/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }
  
  render () {
            let routes = (
                      <Switch>
                          <Route path="/auth" component={Auth}></Route>
                          <Route path="/" exact component={BurgerBuilder}></Route>  
                          <Redirect to="/" />
                      </Switch>
                    );
            if ( this.props.isAuthenticated ) {
                      routes = (
                        <Switch>
                            <Route path="/checkout" component={CheckOut}></Route>
                            <Route path="/orders" component={Orders}></Route>
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
