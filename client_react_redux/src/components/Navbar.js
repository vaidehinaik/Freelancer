import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class Navbar extends Component {

  constructor (props) {
      super(props)
      this.state = {
        name: '',
        username: '',
        message: ''
      };
  }

  navigateToHome = () => {
    this.props.history.push('/home');
  }

  navigateToPostProject = () => {
    this.props.history.push('/postproject');
  }

  signout = () => {
    this.props.reset();
    this.props.history.push('/');
  }

  render() {
      return (
        <div className="container-fluid">
          <nav className="navbar navbar-inverse">
              <form className="form-inline">
                  <div className="navbar-header">
                      <a className="navbar-brand">Hello {this.props.pick.username}</a>
                  </div>
                  <div className="navbar-header">
                      <button
                          className="btn btn-outline-success"
                          type="button"
                          onClick={this.navigateToHome}>
                              Home
                      </button>
                      <button className="btn btn-outline-success" type="button">Dashboard</button>
                      <button className="btn btn-outline-success" type="button">Profile</button>
                      <button
                          className="btn btn-outline-success"
                          type="button"
                          onClick={this.navigateToPostProject}>
                              Post Project
                      </button>
                      <button
                          type="button"
                          className="btn btn-outline-danger navbar-right"
                          onClick={this.signout}>
                              Logout
                      </button>
                  </div>
              </form>
          </nav>
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
