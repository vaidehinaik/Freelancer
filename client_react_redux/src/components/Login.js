import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
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

    handleSubmit = (loginInfo) => {
      if(loginInfo.username === "" || loginInfo.password === "") {
          this.setState({
              message: "Enter both username and password !!!"
          });
          this.displayErrMsg();
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
                      this.setState({
                          message: "Incorrect username or password. Try again !!!"
                      });
                      this.displayErrMsg();
                  } else {
                      this.setState({
                          message: "Server error... Try again later !!!"
                      });
                      this.displayErrMsg();
                  }
          });
        }
    }

    render() {
          return (
            <div className="container-fluid">
                <div className="row justify-content-md-center">
                    <img src="/freelancer_logo.jpg" height="200" width="500" className="left-block" alt="logo"/>
                </div>
                <br></br><br></br>
                <div className="row justify-content-md-center">
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
                            <p>New User: Register Here ?
                                <Link to={`/signup`} className="link">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                        <div className="form-group">
                            <div id="loginErr" className="alert alert-danger">
                                {this.state.message}
                            </div>
                        </div>
                    </form>
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
