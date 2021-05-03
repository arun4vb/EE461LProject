import React, { useState } from 'react';
import './login.css'
import { useSpring, animated } from "react-spring";
import axios from 'axios'
import { isLoggedInUpdateContext } from './../../App'
import { Link, Redirect } from 'react-router-dom';

function Login() {
  const [registrationFormStatus, setRegistartionFormStatus] = useState(false);
  const loginProps = useSpring({
    left: registrationFormStatus ? -500 : 0, // Login form sliding positions
  });
  const registerProps = useSpring({
    left: registrationFormStatus ? 0 : 500, // Register form sliding positions 
  });

  const loginBtnProps = useSpring({
    borderBottom: registrationFormStatus
      ? "solid 0px transparent"
      : "solid 2px #1059FF",  //Animate bottom border of login button
  });
  const registerBtnProps = useSpring({
    borderBottom: registrationFormStatus
      ? "solid 2px #1059FF"
      : "solid 0px transparent", //Animate bottom border of register button
  });

  function registerClicked() {
    setRegistartionFormStatus(true);
  }
  function loginClicked() {
    setRegistartionFormStatus(false);
  }

  return (

    <div className="login-register-wrapper">
      <div className="nav-buttons">
        <animated.button
          onClick={loginClicked}
          id="loginBtn"
          style={loginBtnProps}
        >
          Login
          </animated.button>
        <animated.button
          onClick={registerClicked}
          id="registerBtn"
          style={registerBtnProps}
        >
          Register
          </animated.button>
      </div>
      <div className="form-group">
        <animated.div action="" id="loginform" style={loginProps}>
          <LoginForm />
        </animated.div>
        <animated.div action="" id="registerform" style={registerProps}>
          <RegisterForm />
        </animated.div>
      </div>
      <animated.div className="forgot-panel" style={loginProps}>
        <a herf="#">Forgot your password?</a>
      </animated.div>
    </div>
  );
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    //form fields
    this.state = {
      username: "",
      password: "",
      submitted: false,
      isLoggedIn: false,
      loginError: "",
      flag: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //update form fields as user types
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
      submitted: false,
      loginError: null
    });
  }

  //send POST request to API
  //TODO: redirect user after successful login? Change login button?
  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const loginRequest = {
      username: this.state.username,
      password: this.state.password
    };
    axios.post("/api/login", loginRequest).then(res => {
      window.sessionStorage.setItem("user", JSON.stringify(res.data)); //store user data for use throughout app
      console.log('currentUser object', JSON.parse(window.sessionStorage.getItem("user"))); //DEBUG
      console.log('res ', res);
      this.setState({
        isLoggedIn: true,
        flag: true,
        loginError: null
      })
    }).catch((response) => {
      console.log("(CATCH) invalid login credentials");
      console.log('error response ', response);
      this.setState({
        isLoggedIn: false,
        loginError: "Username or password is incorrect"
      })
    });
  }

  render() {
    const { username, password, submitted, isLoggedIn, loginError, flag } = this.state;
    // login_err = this.loginError(submitted, isLoggedIn);
    const link = this
    function handleClick(props) {
      console.log("hello")
      props();
    }
    
    return (
      <div>
        <form name="login_form" onSubmit={this.handleSubmit}>
          {isLoggedIn && flag &&
            <div>
              <isLoggedInUpdateContext.Consumer>
                {(props) => {
                  props();
                  this.setState({
                    flag: false
                  })
                }}
              </isLoggedInUpdateContext.Consumer>

            </div>
          }
          {loginError &&
            <div id="login-errormsg">{loginError}</div>}
          <div className={'form-group-area' + (submitted && !username ? ' has-error' : '')}>
            <label for="username">username</label>
            <input type="text" class="form-control" id="username" value={username} onChange={this.handleChange} />
            {submitted && !username &&
              <div className="help-block">Username is required</div>
            }
          </div>
          <div className={'form-group-area' + (submitted && !password ? ' has-error' : '')}>
            <label for="password">password</label>
            <input type="password" class="form-control" id="password" value={password} onChange={this.handleChange} />
            {submitted && !password &&
              <div className="help-block">Password is required</div>
            }
          </div>
          <input type="submit" value="submit" class="submit" style={{cursor: "pointer"}} />
        </form>
        { this.state.isLoggedIn ? (<Redirect push to="/"/>) : null }
      </div>
    );
  }
}


class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    //form fields
    this.state = {
      username: "",
      email: "",
      password: "",
      registerError: null,
      submitDisabled: true,
      opacity: 0.5
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //update form fields as user types
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
      registerError: ""
    }, () => {
      //make sure user cannot submit with an incomplete form
      if (this.state.username == "" || this.state.email == "" || this.state.password == "") {
        this.setState({
          submitDisabled: true,
          opacity: 0.5
        });
      }
      else {
        this.setState({
          submitDisabled: false,
          opacity: 1.0
        });
      }  
    });
  }

  //send POST request to API
  handleSubmit(event) {
    event.preventDefault();
    const registration = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    axios.post("/api/register", registration).then(res => {
      console.log('register request response', res);
      console.log('register request response data', res.data);
      this.setState({
        registerError: "account successfully created!"
      })
    }).catch((response) => {
      this.setState({
        registerError: "email and/or username already taken!"
      });
    });
  }

  render() {
    return (
      <form name="registration_form" onSubmit={this.handleSubmit}>
          {this.state.registerError &&
            <div id="login-errormsg">{this.state.registerError}</div>}
        <label for="email">email</label>
        <input placeholder="Required field" type="text" id="email" value={this.state.email} onChange={this.handleChange} />
        <label for="username">username</label>
        <input placeholder="Required field" type="text" id="username" value={this.state.username} onChange={this.handleChange} />
        <label for="password">password</label>
        <input placeholder="Required field" type="text" id="password" value={this.state.password} onChange={this.handleChange} />
        <input type="submit" value="submit" class="submit" disabled={this.state.submitDisabled} style={
          this.state.submitDisabled ? {opacity: this.state.opacity, cursor: "default"} : {opacity: this.state.opacity, cursor: "pointer"}} />
      </form>
    );
  }
}

export default Login;