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

                                <div class="mx-auto">
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" class="btn btn-secondary">Data</button>
                                        <button type="button" class="btn btn-secondary">Software</button>
                                        <button type="button" class="btn btn-secondary">Challenges</button>
                                        <button type="button" class="btn btn-secondary">Tutorials</button>
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