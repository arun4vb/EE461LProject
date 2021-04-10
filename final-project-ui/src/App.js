import React, { Component } from 'react';
import './App.css';
import Main from './components/main';
import Nav from './components/nav-bar/nav-bar'
import Landing from './components/landingpage/landingpage'



export const isLoggedInUpdateContext = React.createContext();
// export const isLoggedInContext = React.createContext(false);
export const isLogged = React.createContext();


export class App extends Component {
  constructor(props) {
    super(props);
    let state = false;
    if (window.sessionStorage.getItem("user")) {
      state = true;
    }
    this.state = {
      log: state
    };
  }



  render() {
    const link = this
    const handleLoggInState = () => {
      var name = link.state.log;
      link.setState({ log: !name })
      


    }

    return (


      <isLogged.Provider value={this.state.log}>
        <isLoggedInUpdateContext.Provider value={handleLoggInState}>
          <div class="App">
            <div>
              <Nav />
            </div>
            <div>
              <Main />
            </div>
          </div>
        </isLoggedInUpdateContext.Provider>
      </isLogged.Provider>

    )
  }
}


export default App;
