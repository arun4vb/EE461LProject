import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import './landingpage.css'

class Landing extends Component {
    render() {
        return (
            <div class="banner" style={{ width: '100%', margin: 'auto' }}>
                <Grid className="landing-grid">
                    <Cell col={12}>
                        <img
                            src=""
                            alt=""
                            className="avatar-img"
                        />

                        <div className="banner-text">
                            <h1>Welcome to Snowflake</h1>

                            <hr />

                            <p>The Research Resource for Complex Physiologic Signals</p>

                            <div className="social-links">

                                <div class="btn-group btn-group-justified" role="group">
                                    <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-default">Data</button>
                                    </div>
                                    <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-default">Software</button>
                                    </div>
                                    <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-default">Challenges</button>
                                    </div>
                                    <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-default">Tutorials</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Cell>
                </Grid>
            </div>
        )
    }
}

export default Landing;