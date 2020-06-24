import React from 'react';
import {Route,Switch} from 'react-router-dom'

import Layout from './components/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import CheckOut from './container/CheckOut/Checkout';

function App() {
  return (
    <div>
       <Layout>
         <Switch>      
          <Route path="/checkout" component={CheckOut}></Route>
          <Route path="/" exact component={BurgerBuilder}></Route>  
         </Switch>        
       </Layout>
       
    </div>
  );
}

export default App;
