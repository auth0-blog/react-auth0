import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Grid, Row, Col } from 'react-bootstrap';

class AppComponent extends Component {
  
  componentWillMount() {
    this.lock = new Auth0Lock('w4ibtscMzP2Zs3jk6MteHwXZ422gGyQc', 'blogtest.auth0.com');
  }
  
  render() {
    return (
      <div>
        <Header lock={this.lock}></Header>
        <Grid>
          <Row>
            <Col xs={12} md={3}>
              <Sidebar />
            </Col>
            <Col xs={12} md={9}>
              {this.props.children}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default AppComponent;
