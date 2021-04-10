import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './nav-bar.css'
import axios from 'axios';
import { isLogged, isLoggedInUpdateContext } from './../../App'


class Nav extends Component {

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

    // render(){
    //     if (isLoggedIn) {

    //     }else{

    //     }
    // }

    // logout(e){
    //     e.preventDefault();
    //     this.state.isLoggedIn =false;
    // }
    //  handleClick(props) {
    //             // e.preventDefault();
    //             console.log("hi");

    //             // link.setState({isLoggedIn: false})
    //             props();
    //             sessionStorage.clear();
    //             //console.log('The link was clicked.');
    //         }

    render() {




        const link = this
        function handleClick(props) {
            // e.preventDefault();
            console.log("hi");

            // link.setState({isLoggedIn: false})
            props();
            sessionStorage.clear();
            //console.log('The link was clicked.');
        }
        const isLoggedIn = this.state.isLoggedIn;

        return (



            <div class="full-nav">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="#">
                        <Link to="/">
                            <img src="http://assets.stickpng.com/thumbs/5846a02acef1014c0b5e47fa.png" width="30" height="30" class="d-inline-block align-top" alt=""></img>
                        </Link>
                    </a>
                    <h4 class="sf-heading">Snowflake</h4>

                    <div>
                        {/* <isLogged.Consumer>
                
                        </isLogged.Consumer> */}
                    </div>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="nav justify-content-end">
                            <li class="nav-item"><Link to="/hw-set"><a class="nav-link" href="#">Hardware Sets</a></Link></li>
                            <li class="nav-item"><Link to="/datasets"><a class="nav-link" href="#">Datasets</a></Link></li>
                            <li class="nav-item"><Link to="/projects"><a class="nav-link" href="#">Projects</a></Link></li>
                            {/* <div class="dropdown">
                                    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Welcome {this.state.user.username}</a> */}
                            <isLogged.Consumer>
                                {(props1) => {
                                    return (

                                        <isLoggedInUpdateContext.Consumer>
                                            {(props2) => {
                                                return (
                                                    <>


                                                        {!props1 &&
                                                            <Link to="/login" type="button" className="btn btn-default navbar-btn">Log In</Link>
                                                        }
                                                        {props1 &&
                                                            //  <h1>{props1 + "helo"}</h1> 
                                                            <div class="dropdown">
                                                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    Welcome
                                                                </button>
                                                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                    <Link to="/login"> <a class="dropdown-item" href="#" onClick={() => handleClick(props2)}>Logout</a></Link>
                                                                    
                                                                </div>
                                                            </div>


                                                        }
                                                    </>
                                                )
                                            }}
                                        </isLoggedInUpdateContext.Consumer>
                                    )
                                }}


                            </isLogged.Consumer>



                        </ul>
                    </div>
                </nav>
            </div>


        )




        // <nav class="nav"> 
        //     <div class="container-fluid">
        //         <div class="navbar-header">
        //             <a class="navbar-brand" href="#">
        //                 <Link to="/">
        //                     <img class="resize" alt="Snowflake" src="http://assets.stickpng.com/thumbs/5846a02acef1014c0b5e47fa.png"></img>
        //                 </Link>
        //             </a>
        //         </div>

        //         <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        //             <ul class="nav navbar-nav">
        //             <h4 class="sf-heading">Snowflake</h4>
        //             </ul>
        //             <form class="navbar-form navbar-left">
        //             </form>
        //             <ul class="nav navbar-nav navbar-right">


        //                 <li class="hover"><Link to="/hw-set"><a href="#">Homework Sets</a></Link></li>
        //                 <li class="hover"><Link to="/projects"><a href="#">Projects</a></Link></li>
        //                 <li><a href="#">About</a></li>
        //                 <li class="news-link"><a href="#">News</a></li>
        //                 <Link to="/login" type="button" className="btn btn-default navbar-btn">Log In</Link>
        //                 {/* <button type="button" class="btn btn-default navbar-btn">Log In</button> */}
        //             </ul>
        //         </div>
        //     </div>
        // </nav>

    }
}

export default Nav;