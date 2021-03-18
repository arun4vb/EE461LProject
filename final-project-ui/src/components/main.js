import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Nav from './nav-bar/nav-bar'
import LandingPage from './landingpage/landingpage';
import Login from './login/login'

//This is where I set up my routing for App.js
const Main = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />  
    <Route exact path="/login" component={Login} /> 
  </Switch>
)

export default Main;