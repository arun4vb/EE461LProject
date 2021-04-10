import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './hw-set.css'

class HWSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hw_sets: []
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    axios.get('/api/loadhwsets').then((res) => {
      this.setState({
        hw_sets: res.data['hw_sets']
      })
    })
  }
  render() {
    let dashboard;
    dashboard = <div class="row">
    {this.state.hw_sets.map(hw_set => {
      return <div class="col-sm-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{}</h5>
            <h7 class="card-title">HWSet: {hw_set['name']}</h7>
            <p class="card-text">Capacity: {hw_set["capacity"]}</p>
            <p class="card-text">Availability: {hw_set["availability"]}</p>
          </div>
        </div>
      </div>
    })}
  </div>;  
  return (
    <div>
  {dashboard}
    </div>
    );
  }
}

export default HWSet;