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

    this.state = {
      log: false
    };
  }



  render() {
    const link = this
    const handleLoggInState = () => {
      var name = link.state.log;
      link.setState({ log: !name })
      sessionStorage.clear();


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
