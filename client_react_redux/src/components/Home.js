import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import cookie from 'react-cookies';
import * as API from '../api/API';
import {connect} from 'react-redux';
import Navbar from './Navbar';
import ReactTooltip from 'react-tooltip';
import InfoIcon from 'material-ui-icons/InfoOutline';

class Home extends Component {
  constructor (props) {
      super(props)
      this.state = {
        name: '',
        projectId: 1,
        username: '',
        projects: [],
        message: ''
      };
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    console.log("Home will mount called ... ");
    if(cookie.load('token') === undefined) {
      /*Redirect to login page if cookie not found*/
      this.props.history.push('/');
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("state project id :" + this.state.projectId);
    console.log("event project id :" +event.target.value);
    localStorage.setItem('projectId', 1);
    this.setState({projectId: event.target.value});
    this.props.updateProjectId(event.target.value);
    this.props.history.push('/projectinfo');
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
                <table id="projects" className="table table-striped table-bordered">
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
                        <p value = {this.state.projectId}
                           onClick={this.handleSubmit}>
                              <ReactTooltip/>
                              <InfoIcon color="primary" style={{ fontSize: 25 }} data-tip="View Details"/>
                        </p>
                        {/*<button
                            className="btn"
                            value = {this.state.projectId}
                            type="button"
                            onClick={this.handleSubmit}>
                                <InfoIcon/>
                        </button>*/}
                        {/*<Link to={`/postproject`} className="link">
                          <InfoIcon/>
                        </Link>*/}
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
        updateProjectId: (projectId) => {
            dispatch({
                type: "PROJECTID",
                payload : {projectId:projectId}
            });
        }
    };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Home));
