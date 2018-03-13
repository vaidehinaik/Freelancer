import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import cookie from 'react-cookies';
import {connect} from 'react-redux';
import Octicon from 'react-octicon';
import * as API from '../api/API';

class Navbar extends Component {

  constructor (props) {
      super(props)
      this.state = {
        username: this.props.pick.username,
        message: ''
      };
      this.logout = this.logout.bind(this);
  }

  notify = (message) => {
    toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000
    });
  }

  notifySuccess = (message) => {
    toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000
    });
  }

  performLogoutActions = () => {
      console.log("Logging out ...");
      this.props.reset();
      localStorage.clear();
      if (cookie.load('token') !== undefined) {
          console.log("Removing cookie token");
          cookie.remove('token', { path: '/' });
      }
      this.props.history.push('/');
  }

  componentDidMount() {
    if (localStorage.getItem('username') === null) {
        localStorage.setItem('username', this.props.pick.username);
    }
    this.setState({username: localStorage.getItem('username')});
  }

  sleep = (time) => {
      return new Promise((resolve) => setTimeout(resolve, time));
  }

  logout = (event) => {
    event.preventDefault();
    var status;
    API.doLogout({username:this.state.username})
        .then((res) => {
            status = res.status;
            try{
                return res.json();
            }
            catch(error) {
              console.log("Error in response: " + error);
            }
        }).then((json) => {
              if (status === 201) {
                this.setState({
                    message: json.message
                });
                this.notifySuccess(json.message);
            } else if (status === 401) {
                const message = "Failed to Log out... !!!"
                this.setState({
                    message: message
                });
                this.notify(message);
            } else {
                const message = "Server error... Try again later !!!"
                this.setState({
                    message: message
                });
                this.notify(message);
            }
        });
        this.sleep(4000).then(() => {
          console.log("sleep & log out");
          this.performLogoutActions();
        });
  }

  render() {
      return (
        <div className="container-fluid">
          <nav className="navbar navbar-expand-md bg-light navbar-light">
            <a className="navbar-brand">
              <img src="/fl-small.png"
                 height="40"
                 width="40"
                 className="left-block"
                 alt="logo"/>
              <p><i>{this.props.pick.username}</i></p>
            </a>
            <ul className="navbar-nav mx-auto w-100 justify-content-center">
              <li className="nav-item active">
                <Link to={`/home`} className="nav-link">
                  <Octicon name="home" mega/>Home
                </Link>
              </li>
              <span>&nbsp;&nbsp;&nbsp;</span>
              <li className="nav-item active">
                <Link to={`/profile`} className="nav-link">
                  <Octicon name="person" mega/>Profile
                </Link>
              </li>
              <span>&nbsp;&nbsp;&nbsp;</span>
              <li className="nav-item active">
                <Link to={`/profile`} className="nav-link">
                  <Octicon name="dashboard" mega spin/>Dashboard
                </Link>
              </li>
              <span>&nbsp;&nbsp;&nbsp;</span>
              <li className="nav-item active">
                <Link to={`/postproject`} className="nav-link">
                  <Octicon name="plus" mega/>Post Project
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <button
                    type="button"
                    className="btn"
                    onClick={this.logout}>
                        <Octicon name="sign-out" mega/>Logout
                </button>
              </li>
            </ul>
          </nav>
          <ToastContainer />
        </div>
      );
  }
}

const mapStateToProps = (state) => {
    return{
        pick: state.reducers
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => {
        dispatch({
          type: "RESET"
      });
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));