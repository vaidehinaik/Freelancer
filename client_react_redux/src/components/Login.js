import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import * as API from '../api/API';
import {connect} from 'react-redux';

class Login extends Component {

  state = {
        username: '',
        password: '',
        message: ''
    };

    componentDidMount() {
      document.getElementById("loginErr").style.visibility = "hidden";
    }

    handleUsernameInput = (event) => {
      this.props.editUsername(event.target.value);
      this.setState({username: event.target.value});
    }

    handlePasswordInput = (event) => {
      this.setState({password: event.target.value});
    }

    doLogin() {
      this.props.history.push("/home");
    }

    handleSubmit = (loginInfo) => {
        document.getElementById("loginErr").style.visibility = "visible";
        if(loginInfo.username==="" || loginInfo.password==="") {
            this.setState({
                message: "Enter both username and password !!"
            });
            document.getElementById('loginErr').style.display="inline-block";
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
                    const token = json.token;
                    localStorage.setItem('jwtToken',token);
                    this.login();
                } else if (status === 401) {
                    this.setState({
                        message: "Incorrect username or password. Try again !!!"
                    });
                    document.getElementById('loginErr').style.display="inline-block";
                } else {
                    this.setState({
                        message: "Server error... Try again later !!!"
                    });
                    document.getElementById('loginErr').style.display="inline-block";
                }
            });
        }
    };

    render() {
          return (
            <div className="container-fluid">
                <div className="col-md-3">
                    <form>
                        <div className="form-group">
                            <h1>Login</h1>
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                label="Username"
                                placeholder="Enter Username"
                                required="required"
                                value={this.state.username}
                                onChange={this.handleUsernameInput.bind(this)}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                className="form-control"
                                type="password"
                                label="password"
                                placeholder="Enter Password"
                                required="required"
                                value={this.state.password}
                                onChange={this.handlePasswordInput.bind(this)}
                            />
                        </div>
                        <div className="form-group">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => this.handleSubmit(this.state)}>
                                    Submit
                            </button>
                            <hr>
                            </hr>
                            <p>First time users: Register Here ?
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
          select1: state.reducers
      };
  };

  const mapDispatchToProps = (dispatch) => {
      return{
          editUsername: (username) => {
              dispatch({
                  type: "EDITUSERNAME",
                  payload : {username:username}
              });
          },
      };
  };

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login));
