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
        user: JSON.parse(window.sessionStorage.getItem("user"))
      }, () => {
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
    let button;
    let modal;
    let dashboard;
    let items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
    if (isLoggedIn) {
      text = <h1>Hello, {this.state.user.username}!</h1>;
      button = <button type="button" class="btn btn-primary create-new-project" data-toggle="modal" data-target="#exampleModalCenter">
        Create New Project
    </button>

      modal = <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">project</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ...
</div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>;

      dashboard = <div class="row">
        {this.state.projects.map(project => {
          return <div class="col-sm-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{project["project_name"]}</h5>
                <h7 class="card-title">Project ID: {project["project_id"]}</h7>
                <p class="card-text">Description: {project["description"]}</p>
                <a href="#" class="btn btn-primary check">Check In/Out</a>
                <a href="#" class="btn btn-primary details">Details</a>
              </div>
            </div>
          </div>
        })}
      </div>;

    } else {
      text = <h1>Log in to view your projects</h1>
    }

    return (
      <>
        
        {text}
        {button}
        {modal}
        {dashboard}
        {/* <ul className="list-group">
          {this.state.projects.map(project => (
            <li className="list-group-item list-group-item-primary">
              {JSON.stringify(project)}
            </li>
          ))}
        </ul> */}
      </>
    )
  }
}

export default Projects;