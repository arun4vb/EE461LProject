import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
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
      isLoggedIn: false,
      hw_sets: [],
      proj_name: "",
      hw_set: "",
      checkout_num: "",
      description: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
          console.log("Projects: " + projects)
        });
      }
      );
    }
    axios.get("/api/loadhwsets").then(res => {
      const hw_sets = res.data['hw_sets'];
      this.setState({ hw_sets: hw_sets });
      console.log("These are the hw_sets " + hw_sets)
    });
  }

  handleChange(event) {
    console.log("HANDLE CHANGE CALLED");
    console.log("Project Name: " + this.state.proj_name);
    //only allow numeric entries into checkout amount
    if (event.target.id === "checkout_num") {
      const re = /^[0-9\b]+$/;
      // if value is not blank, then test the regex
      if (event.target.value === '' || re.test(event.target.value)) {
         this.setState({[event.target.id]: event.target.value})
      }
    }
    else {
      this.setState({
        [event.target.id]: event.target.value
      });
    }
  }

  handleSubmit(event) {
    console.log("Handle Submit");
    event.preventDefault();
    const create_new_proj = {
      user: this.state.user.username,
      project_name: this.state.proj_name,
      project_id: "1111",
      description: this.state.description,
    };
    const check_out_info = {
      user: this.state.user.username,
      project_name: this.state.proj_name,
      hw_set: this.state.hw_set,
      amount: this.state.checkout_num
    };
    //create project, then checkout if project insertion successful,
    //then reload projects w/ new proj data
    axios.post("/api/createproject", create_new_proj).then(res => {
      console.log('Hi');
      axios.post("/api/checkout", check_out_info).then(res => {
        console.log('Check Out!')
      });
      axios.post("/api/loadprojects", this.state.user).then(res => {
        const projects = res.data['projects'];
        this.setState({ projects: projects });
        console.log("Projects: " + projects)
      });
    });
  }

  render() {
    //make sure user is logged in before attempting to render username
    const isLoggedIn = this.state.isLoggedIn;
    const proj_name = this.state.proj_name;
    const hw_set = this.state.hw_set;
    const checkout_num = this.state.checkout_num;
    const description = this.state.description;
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

      modal = <form name="create_proj_modal" onSubmit={this.handleSubmit}><div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="false">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">Create Project</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">Project Name</span>
                </div>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" id="proj_name" value={proj_name} onChange={this.handleChange}></input>
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Hardware Sets</button>
                  <div class="dropdown-menu">
                    {this.state.hw_sets.map(hw => {
                      return <div>
                        <a class="dropdown-item" href="#">{hw["name"]}</a>
                      </div>
                    })}
                  </div>
                </div>
                <input type="text" class="form-control" aria-label="Text input with dropdown button" id="hw_set" value={hw_set} onChange={this.handleChange}></input>
              </div>
              <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-sm">Checkout #</span>
                </div>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" id="checkout_num" value={checkout_num} onChange={this.handleChange}></input>
              </div>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">Description</span>
                </div>
                <textarea class="form-control" aria-label="With textarea" id="description" value={description} onChange={this.handleChange}></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" onClick={this.handleSubmit}>Create Project</button>
            </div>
          </div>
        </div>
      </div></form>;

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