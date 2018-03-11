import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Octicon from 'react-octicon';
import * as API from '../api/API';
import {connect} from 'react-redux';

class Login extends Component {

    constructor (props) {
          super(props)
          this.state = {
            username: '',
            password: '',
            message: ''
          };
          this.handleUsernameInput = this.handleUsernameInput.bind(this);
          this.handlePasswordInput = this.handlePasswordInput.bind(this);
    }

    componentDidMount() {
      document.getElementById("loginErr").style.visibility = "hidden";
    }

    handleUsernameInput = (event) => {
      var lc_username = event.target.value.toLowerCase();
      this.props.updateUsername(lc_username);
      this.setState({username: lc_username});
    }

    handlePasswordInput = (event) => {
      this.setState({password: event.target.value});
    }

    proceedToHome() {
      /*On Successful login*/
      this.props.history.push("/home");
    }

    displayErrMsg() {
      document.getElementById("loginErr").style.visibility = "visible";
      document.getElementById('loginErr').style.display="inline-block";
    }

    notify = (message) => {
      toast.error(message, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 3000
      });
    }

    handleSubmit = (loginInfo) => {
      if(loginInfo.username === "" || loginInfo.password === "") {
          const message = "Enter username and password !!!"
          this.setState({
              message: message
          });
          this.displayErrMsg();
          this.notify(message);
      } else {
          var status;
          API.doLogin(loginInfo)
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
                      this.proceedToHome();
                  } else if (status === 401) {
                      const message = "Incorrect username or password. Try again !!!"
                      this.setState({
                          message: message
                      });
                      this.displayErrMsg();
                      this.notify(message);
                  } else {
                      const message = "Server error... Try again later !!!"
                      this.setState({
                          message: message
                      });
                      this.displayErrMsg();
                      this.notify(message);
                  }
          });
        }
    }

    render() {
          return (
            <div className="container-fluid">
                <div className="row justify-content-md-center">
                    <img src="/fl-logo.svg" height="150" width="300" className="left-block" alt="logo"/>
                </div>
                <br></br><br></br>
                <div className="row justify-content-md-center">
                  <div className="panel panel-primary">
                    <div className="panel-body">
                      <form>
                          <div className="form-group">
                              <h3><i>Welcome to CMPE-273 Freelancer App</i></h3>
                              <br></br>
                          </div>
                          <div className="form-group">
                              <input
                                  className="form-control"
                                  type="text"
                                  label="Username"
                                  placeholder="Username"
                                  required="required"
                                  value={this.state.username}
                                  onChange={this.handleUsernameInput}
                              />
                          </div>

                          <div className="form-group">
                              <input
                                  className="form-control"
                                  type="password"
                                  label="password"
                                  placeholder="Password"
                                  required="required"
                                  value={this.state.password}
                                  onChange={this.handlePasswordInput}
                              />
                          </div>
                          <div className="form-group">
                              <button
                                  className="btn btn-primary"
                                  type="button"
                                  onClick={() => this.handleSubmit(this.state)}>
                                      Login
                              </button>
                              <hr></hr>
                              <p>New User?
                                  <Link to={`/signup`} className="link">
                                      Register Here
                                  </Link>
                              </p>
                          </div>
                          <div className="form-group">
                              <div id="loginErr" className="alert alert-danger">
                                  <Octicon name="alert"/>
                              </div>
                              <ToastContainer />
                          </div>
                      </form>
                    </div>
                  </div>
                </div>
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
      return{
          updateUsername: (username) => {
              dispatch({
                  type: "USERNAME",
                  payload : {username:username}
              });
          },
      };
  };

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login));
