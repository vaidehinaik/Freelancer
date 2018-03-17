import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import * as API from '../api/API';
import {connect} from 'react-redux';
import ReactTooltip from 'react-tooltip';
import HomeIcon from 'material-ui-icons/Home';
import { ToastContainer, toast } from 'react-toastify';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class EditProfile extends Component {
  constructor (props) {
      super(props)
      this.state = {
        username: this.props.pick.username,
        name: this.props.pick.userinfo.name,
        contact: this.props.pick.userinfo.contact,
        aboutMe: this.props.pick.userinfo.aboutMe,
        skills: this.props.pick.userinfo.skills,
        message: ''
      };
      this.handeNameChange = this.handeNameChange.bind(this);
      this.handleAboutMeChange = this.handleAboutMeChange.bind(this);
      this.handleContactChange = this.handleContactChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handeNameChange = (event) => {
    this.setState({name: event.target.value});
  }

  handleAboutMeChange = (event) => {
    this.setState({aboutMe: event.target.value});
  }

  handleContactChange = (event) => {
    this.setState({contact: event.target.value});
  }

  handleOptionChange = (event) => {
    var skills = this.state.skills;
    if (skills.includes("Add skills to your profile")) {
      const index = skills.indexOf("Add skills to your profile");
      skills.splice(index, 1);
    }
    if (!skills.includes(event.target.value)) {
      skills.push(event.target.value);
      this.setState({skills: skills});
    }
  }

  proceedToProfile() {
    this.props.history.push("/profile");
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

  componentWillMount() {
    var userinfo = localStorage.getItem('userinfo');
    this.setState(
      {
        username: localStorage.getItem('username'),
        name: userinfo.name,
        contact: userinfo.contact,
        aboutMe: userinfo.aboutMe,
        skills: userinfo.skills
      });
  }

  componentDidMount() {
    if (localStorage.getItem('username') === null) {
        localStorage.setItem('username', this.props.pick.username);
    }
  }

  sleep = (time) => {
      return new Promise((resolve) => setTimeout(resolve, time));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userInfo = {
                  username: this.state.username,
                  name: this.state.name,
                  contact: this.state.contact,
                  aboutMe: this.state.aboutMe,
                  skills: this.state.skills
                }
    console.log("Updating user profile with info: " + JSON.stringify(userInfo));

    var status;
    API.updateUserInfo(userInfo)
        .then((res) => {
            status = res.status;
            try {
                return res.json();
            }
            catch(error) {
              console.log("Error in response: " + error);
            }
        }).then((json) => {
            if (status === 201) {
                const message = "Hurray !!! User Profile Updated.";
                console.log(message);
                this.props.updateUserDetails(userInfo);
                this.notifySuccess(message);
                this.sleep(4000).then(() => {
                  console.log("time to sleep");
                  this.proceedToProfile();
                });
            } else if (status === 401) {
                const message = "Failed to update user profile. Try again !!!";
                this.setState({
                    message: message
                });
                this.notify(message);
            } else {
                const message = "Server error... Try again later !!!";
                this.setState({
                    message: message
                });
                this.notify(message);
            }
      });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="container-fluid">
          <div className="offset-md-3 col-md-6 ">
            <br></br>
            <div className="row">
                <img src="/fl-logo.svg" height="120" width="180" className="left-block" alt="logo"/>
            </div>
            <div className="row">
              <ReactTooltip/>
              <Link to={`/home`} className="link">
                  <HomeIcon color="primary" style={{ fontSize: 60 }} data-tip="Home"/>
              </Link>
            </div>
            <br/>
            <div className="row justify-content-md-center">
            <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                      <h2><b>Edit User Profile -:- <i>{this.props.pick.username}</i></b></h2>
                      <br/>
                  </div>
                  <hr/>

                  <div className="form-group">
                      <label htmlFor="name"><b>Name:</b></label>
                      <input
                          className="form-control"
                          id="name"
                          type="text"
                          placeholder="Name"
                          value={this.state.name}
                          onChange={this.handeNameChange}
                      />
                  </div>
                  <hr/>

                  <div className="form-group">
                      <br/>
                      <label htmlFor="about"><b>About Me:</b></label>
                      <textarea
                          className="form-control"
                          rows="10"
                          id="about"
                          placeholder='About Me.... Minimum 20 characters'
                          value={this.state.aboutMe !== "null" ? this.state.aboutMe: ''}
                          onChange={this.handleAboutMeChange}
                      />
                  </div>
                  <hr/>

                  <div className="form-group">
                      <br/>
                      <label htmlFor="contact"><b>Contact:</b></label>
                      <input
                          className="form-control"
                          type="text"
                          id="contact"
                          placeholder="Contact"
                          value={this.state.contact !== "null" ? this.state.contact: ''}
                          onChange={this.handleContactChange}
                      />
                  </div>
                  <hr/>

                  <div className="form-group">
                      <br/>
                      <label htmlFor="skills"><b>What skills are required?</b></label>
                      <p>Enter up to 5 skills that best describe your project.
                      Freelancers will use these skills to find projects they
                      are most interested and experienced in.</p>
                      <select
                          multiple={true}
                          id="skills"
                          size="10"
                          className="form-control"
                          value={this.state.skills}
                          onChange={this.handleOptionChange}>
                              <option>Java</option>
                              <option>Python</option>
                              <option>Scala</option>
                              <option>Go</option>
                              <option>React</option>
                              <option>Express</option>
                              <option>Django</option>
                              <option>Bootstrap</option>
                              <option>Jquery</option>
                              <option>MongoDB</option>
                              <option>MySql</option>
                              <option>C</option>
                              <option>JavaScript</option>
                              <option>HTML5</option>
                      </select>
                  </div>
                  <hr/>

                  <div className="form-group">
                      <button
                          className="btn btn-primary"
                          type="submit">
                          Save
                      </button>
                  </div>
                  <hr/>
                  <ToastContainer />
              </form>
              <br/>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      pick: state.reducers
    };
};

const mapDispatchToProps = (dispatch) => {
  return{
      updateUserDetails: (userinfo) => {
          dispatch({
              type: "USERINFO",
              payload : {userinfo:userinfo}
          });
      },
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(EditProfile));
