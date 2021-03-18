import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Nav from './nav-bar/nav-bar'
import LandingPage from './landingpage/landingpage';
import Login from './login/login'
import HWSet from './hw-set/hw-set'
import Projects from './projects/projects'

//This is where I set up my routing for App.js
const Main = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />  
    <Route exact path="/login" component={Login} /> 
    <Route exact path="/hw-set" component={HWSet} />
    <Route exact path="/projects" component={Projects} /> 
  </Switch>
)

export default Main;