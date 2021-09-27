import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {createStore} from "redux";
import reducers from "./store";

import NewCofounder from './NewCofounder';

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

const store = createStore(reducers);
  
const routing = (  
  <Router>  
      <Switch>
      <Route path="/newCofounder" component={NewCofounder} /> 
      <Route path="/" component={App} />  
      </Switch>
  </Router>  
)  
ReactDOM.render(<Provider store={store}>{routing}</Provider>, document.getElementById('root'));  
