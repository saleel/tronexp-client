import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import './scss/main.scss';
import App from './App';
import './jq.js';

ReactDOM.render(App, document.getElementById('root'));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
