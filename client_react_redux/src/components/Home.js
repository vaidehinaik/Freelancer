import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import cookie from 'react-cookies';
import * as API from '../api/API';
import {connect} from 'react-redux';
import Navbar from './Navbar';
import InfoIcon from 'material-ui-icons/InfoOutline';

class Home extends Component {
  constructor (props) {
      super(props)
      this.state = {
        name: '',
        username: '',
        projects: [],
        message: ''
      };
  }

  componentWillMount() {
    console.log("Home will mount called ... ");
    if(cookie.load('token') === undefined) {
      // Redirect to login page if cookie not found
      this.props.history.push('/');
    }
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
            <div className="col-md-12 ">
              <div className="form-group">
                <h4><i>Available Projects:</i></h4>
              </div>
              <div className="form-group pull-right">
                <input type="text" className="search form-control" placeholder="Search"/>
              </div>
                <table className="table table-striped">
                  <thead>
                      <tr>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Email</th>
                        <th scope="col">View</th>
                      </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Sushant</td>
                      <td>K</td>
                      <td>sk@example.com</td>
                      <td scope="col">
                        <Link to={`/postproject`} className="link">
                          <InfoIcon/>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
