import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './projects.css';
import axios from 'axios';



class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: "",
        email: "",
        password: "",
      },
      projects: [],  //array of JSON objects representing a project
      isLoggedIn: false
    };
  }

  //load user projects when component loads
  //really ugly, just seeing if general idea/backend works
  componentDidMount() {
    if (window.sessionStorage.getItem("user")) {
      this.setState({
        isLoggedIn: true,
        user: JSON.parse(window.sessionStorage.getItem("user"))}, () => {
          axios.post("/api/loadprojects", this.state.user).then(res => {
            const projects = res.data['projects'];
            this.setState({ projects: projects });
          });
        }
      );
    }
  }

  render() {
    //make sure user is logged in before attempting to render username
    const isLoggedIn = this.state.isLoggedIn;
    let text;
    if (isLoggedIn) {
      text = <h1>Hello, {this.state.user.username}!</h1>;
    } else {
      text = <h1>Log in to view your projects</h1>
    }

    return (
      <>
        {text}
        <h2>Projects</h2>
        <ul className="list-group">
          {this.state.projects.map(project => (
            <li className="list-group-item list-group-item-primary">
              {JSON.stringify(project)}
            </li>
          ))}
        </ul>
      </>
    )
  }
}

export default Projects;