import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import DefaultLayout from './layout/DefaultLayout';
import LoginLayout from './layout/LoginLayout';

import Home from './pages/Home';
import Hotels from './pages/Hotels';
import Login from './pages/Login';
import Register from './pages/Register';
import HotelDetail from './pages/HotelDetail';
import Booking from './pages/Booking';

import 'antd/dist/antd.css';

import history from './util/history';

import myReducer from './redux/reducers';
import mySaga from './redux/sagas';

import * as serviceWorker from './serviceWorker';

import './index.css';

const sagaMiddleware = createSagaMiddleware();
const myStore = createStore(myReducer, applyMiddleware(...[sagaMiddleware, logger]));
sagaMiddleware.run(mySaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={myStore}>
      <Router history={history}>
        <Switch>
          <LoginLayout exact path="/login" component={Login}/>
          <LoginLayout exact path="/register" component={Register}/>
          
          <DefaultLayout exact path="/hotels/:place" component={Hotels} />
          <DefaultLayout exact path="/" component={Home} />
          <DefaultLayout exact path="/hotel/:place/:id" component={HotelDetail} />
          <DefaultLayout exact path="/booking/:place/:idHotel/:idRoom" component={Booking} />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
