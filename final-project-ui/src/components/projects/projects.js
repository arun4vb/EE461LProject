import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './projects.css'

class Projects extends Component {
  render() {
    //testing sessionStorage on different route - works as expected
    var user = JSON.parse(window.sessionStorage.getItem("user"));
    var username = user.username
    return (
      <h1>Hello, {username}!</h1>
    )
  }
}

export default Projects;