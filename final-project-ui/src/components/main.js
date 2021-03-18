import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Nav from './nav-bar/nav-bar'
import LandingPage from './landingpage/landingpage';

//This is where I set up my routing for App.js
const Main = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />  
  </Switch>
)

export default Main;