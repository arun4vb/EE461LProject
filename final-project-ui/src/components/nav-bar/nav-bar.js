import React, { Component } from 'react';
import './nav-bar.css'

class Nav extends Component {
    render() {
        return (
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">
                            <img class="resize" alt="Snowflake" src="http://assets.stickpng.com/thumbs/5846a02acef1014c0b5e47fa.png"></img>
                        </a>
                    </div>

                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav">
                        <h4 class="sf-heading">Snowflake</h4>
                        </ul>
                        <form class="navbar-form navbar-left">
                        </form>
                        <ul class="nav navbar-nav navbar-right">
                            <li><a href="#">Find</a></li>
                            <li><a href="#">Share</a></li>
                            <li><a href="#">About</a></li>
                            <li class="news-link"><a href="#">News</a></li>
                            <button type="button" class="btn btn-default navbar-btn">Log In</button>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Nav;