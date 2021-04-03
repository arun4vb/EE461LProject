import React, { Component } from 'react';
import './App.css';
import Main from './components/main';
import Nav from './components/nav-bar/nav-bar'
import Landing from './components/landingpage/landingpage'

export const loginContext = React.createContext()

class App extends Component {
  render() {
    return(
      <div class="App">
        <div>
          <Nav/>
        </div>
        <div>
          <Main/>
        </div>
      </div>
    )
  }
}


export default App;
