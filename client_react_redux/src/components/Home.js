import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import * as API from '../api/API';
import {connect} from 'react-redux';
import Navbar from './Navbar';

class Home extends Component {

  componentWillMount() {
    

  }

  render() {
      return (
          <div className="container-fluid">
            <div className="row offset-md-1">
                <img src="/fl-logo.svg" height="80" width="120" className="left-block" alt="logo"/>
            </div>
            <div className="row">
              <Navbar/>
            </div>
            <div className="offset-md-2 col-md-6 ">
              <div className="form-group pull-right">
                  <input
                      type="text"
                      className="search form-control"
                      placeholder="Search"/>
              </div>

            </div>
          </div>
      );
    }
}

const mapStateToProps = (state) => {
    return {
      pick: state.reducers
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Home));
