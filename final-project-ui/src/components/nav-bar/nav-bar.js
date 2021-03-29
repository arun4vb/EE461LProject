import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './nav-bar.css'

class Nav extends Component {
    render() {
        return (
            <div class="full-nav">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="#">
                        <Link to="/">
                            <img src="http://assets.stickpng.com/thumbs/5846a02acef1014c0b5e47fa.png" width="30" height="30" class="d-inline-block align-top" alt=""></img>
                        </Link>
                    </a>
                    <h4 class="sf-heading">Snowflake</h4>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="nav justify-content-end">
                            <li class="nav-item"><Link to="/hw-set"><a class="nav-link" href="#">Homework Sets</a></Link></li>
                            <li class="nav-item"><Link to="/projects"><a class="nav-link" href="#">Projects</a></Link></li>
                            <li class="nav-item"><a class="nav-link" href="#">About</a></li>
                            <li class="nav-item news-link"><a class="nav-link" href="#">News</a></li>
                            <Link to="/login" type="button" className="btn btn-default navbar-btn">Log In</Link>
                        </ul>
                    </div>
                </nav>
            </div>
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
        )
    }
}

export default Nav;