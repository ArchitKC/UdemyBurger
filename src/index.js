import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './store/reduce'


const store=createStore(reducer);


const app=(
    <Provider store={store}>
        <BrowserRouter>
           <App></App>
        </BrowserRouter>
    </Provider>    
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
