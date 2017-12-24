import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Root from './components/Root';
import configureStore from './store/configureStore';
import '../../node_modules/foundation-sites/dist/css/foundation.min.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import './styles/app.styl';

// create the Redux store
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,

  document.getElementById('react-app')
);
