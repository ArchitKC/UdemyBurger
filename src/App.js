import React from 'react';
import {Route,Switch} from 'react-router-dom'

import Layout from './components/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import CheckOut from './container/CheckOut/Checkout';
import Orders from './container/Orders/Orders';
import Auth from './container/Auth/Auth'

function App() {
  return (
    <div>
       <Layout>
         <Switch>      
           <Route path="/orders" component={Orders}></Route>
          <Route path="/checkout" component={CheckOut}></Route>
          <Route path="/auth" component={Auth}></Route>
          <Route path="/" exact component={BurgerBuilder}></Route>  
         </Switch>        
       </Layout>
       
    </div>
  );
}

export default App;
