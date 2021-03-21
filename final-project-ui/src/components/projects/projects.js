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
      projects: []  //array of JSON objects representing a project
    };
  }

  //load user projects when component loads
  //really ugly, just seeing if general idea/backend works
  componentDidMount() {
    this.setState({
      user: JSON.parse(window.sessionStorage.getItem("user"))}, () => {
        axios.post("/api/loadprojects", this.state.user).then(res => {
          const projects = res.data['projects'];
          this.setState({ projects: projects });
        });
      }
    );
  }

  render() {
    //testing sessionStorage on different route - works as expected

    return (
      <>
        <h1>Hello, {this.state.user.username}!</h1>
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