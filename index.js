import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import reducer from './redux/reducers';
import {Provider} from 'react-redux';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  // middleware.push(createLogger());
}

const store = createStore(reducer, applyMiddleware(...middleware));

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
