import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Link, Switch, IndexRoute, HashRouter} from 'react-router-dom';
import axios from 'axios';
import App from './App.jsx';

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('app'));
