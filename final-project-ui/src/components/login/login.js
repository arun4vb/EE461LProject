import React, { useState } from 'react';
import './login.css'
import { useSpring, animated } from "react-spring";
import axios from 'axios'

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
          <a herf="#">Forgot your password</a>
        </animated.div>
      </div>
    );
  }
  
  function LoginForm() {
    return (
      <React.Fragment>
        <label for="username">USERNAME</label>
        <input type="text" id="username" />
        <label for="password">PASSWORD</label>
        <input type="text" id="password" />
        <input type="submit" value="submit" className="submit" />
      </React.Fragment>
    );
  }
  
  class RegisterForm extends React.Component {
    constructor(props) {
      super(props);
      //form fields
      this.state = {
        username: "",
        email: "",
        password: "",
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    //update form fields as user types
    handleChange(event) {
      this.setState({
        [event.target.id]: event.target.value
      });
      console.log(this.state.email, this.state.password);
    }

    //send POST request to API
    handleSubmit(event) {
      event.preventDefault();
      const registration = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      };
      axios.post("/api/login", registration).then(res => {
        console.log(res);
        console.log(res.data);
      })
    }

    render () {
      return (
        <form name="registration_form" onSubmit={this.handleSubmit}>
          <label for="email">email</label>
          <input type="text" id="email" value={this.state.email} onChange={this.handleChange} />
          <label for="username">username</label>
          <input type="text" id="username" value={this.state.username} onChange={this.handleChange} />
          <label for="password">password</label>
          <input type="text" id="password" value={this.state.password} onChange={this.handleChange} />
          <label for="confirmpassword">confirm password</label>
          <input type="text" id="confirmpassword" />
          <input type="submit" value="submit" class="submit" />
        </form>
      );
    }
  }
  
  export default Login;