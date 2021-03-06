import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import authReducer from './store/reducers/authReducer';
import pollReducer from './store/reducers/pollReducer';

import jwt_decode from 'jwt-decode';
import * as actions from './store/actions';
import axios from 'axios';

const composedEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  poll: pollReducer
});

const store = createStore(
  rootReducer,
  composedEnhancers(applyMiddleware(thunk))
);

if (localStorage.jwtToken) {
  axios.defaults.headers.common['Authorization'] = localStorage.jwtToken;
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(actions.fetchUser(decoded));
}

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
