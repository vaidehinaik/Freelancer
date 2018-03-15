import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Octicon from 'react-octicon';
import * as API from '../api/API';
import {connect} from 'react-redux';

class PostProject extends Component {
  constructor (props) {
      super(props)
      this.state = {
        username: this.props.pick.username,
        title: '',
        description: '',
        budgetLow: 0,
        budgetHigh: 0,
        projectSkills: [],
        message: ''
      };
      this.handleTitleChange = this.handleTitleChange.bind(this);
      this.handleDescChange = this.handleDescChange.bind(this);
      this.handleLowChange = this.handleLowChange.bind(this);
      this.handleHighChange = this.handleHighChange.bind(this);
      this.handleOptionChange = this.handleOptionChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange = (event) => {
    this.setState({title: event.target.value});
  }

  handleDescChange = (event) => {
    this.setState({description: event.target.value});
  }

  handleLowChange = (event) => {
    this.setState({budgetLow: parseInt(String, event.target.value)});
  }

  handleHighChange = (event) => {
    this.setState({budgetHigh: parseInt(String, event.target.value)});
  }

  handleOptionChange = (event) => {
    var skill = event.target.value;
    var projectSkills = this.state.projectSkills;
    projectSkills.push(skill);
    this.setState({projectSkills: projectSkills});
  }

  proceedToHome() {
    this.props.history.push("/home");
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

  componentDidMount() {
    if (localStorage.getItem('username') === null) {
        localStorage.setItem('username', this.props.pick.username);
    }
    this.setState({username: localStorage.getItem('username')});
  }

  componentWillUnmount() {
    console.log("component will unmount");
    localStorage.removeItem('username');
  }

  sleep = (time) => {
      return new Promise((resolve) => setTimeout(resolve, time));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("my username is : "+ this.state.username);
    console.log("state: " + JSON.stringify(this.state));
    if (this.state.title.length < 10) {
      this.notify("PROJECT NAME: Should be atleast 10 charcters long");
    } else if (this.state.description.length < 20) {
        this.notify("PROJECT DESCRIPTION: Should be atleast 20 characters long")
    } else if (this.state.budgetLow === 0 || this.state.budgetHigh === 0) {
        this.notify("BUDGET: Cannot be empty !!!")
    } else if(this.state.budgetHigh < this.state.budgetLow) {
        this.notify("'HIGHER BUDGET' value cannot be LESS than 'LOWER BUDGET' !!!")
    } else if(this.state.projectSkills.length === 0) {
        this.notify("Please select at least one skill before posting project !!!")
    } else {
      const projectInfo = {
                username: this.state.username,
                title: this.state.title,
                description: this.state.description,
                budgetLow: this.state.budgetLow,
                budgetHigh: this.state.budgetHigh,
                skills: this.state.projectSkills
              }
      console.log("Posting Project with info: " + JSON.stringify(projectInfo));
      var status;
      API.postProject(projectInfo)
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
                  const message = "Hurray !!! Project posted successfully.";
                  console.log(message);
                  this.notifySuccess(message);
                  this.sleep(4000).then(() => {
                    console.log("time to sleep");
                    this.proceedToHome();
                  });
              } else if (status === 401) {
                  const message = "Failed to upload project. Try again !!!";
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
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="offset-md-3 col-md-6 ">
          <br></br>
          <div className="row">
              <img src="/fl-logo.svg" height="120" width="180" className="left-block" alt="logo"/>
          </div>
          <div className="row">
            <Link to={`/home`} className="link">
                <Octicon name="home" mega/>Home
            </Link>
          </div>
          <br></br><br></br>
          <p><i><b>
              Hi !!! {this.props.pick.username} ... Ready to post your project
          </b></i></p><hr></hr>
          <div className="row justify-content-md-center">
                <form onSubmit={this.handleSubmit}>
                      <div className="form-group">
                          <h2><b>Tell us what you need done</b></h2>
                          <p>Get free quotes from skilled freelancers within minutes,
                          view profiles, ratings and portfolios and chat with them.
                          Pay the freelancer only when you are 100% satisfied with
                          their work.</p>
                          <br></br>
                      </div>
                      <hr></hr>

                      <div className="form-group">
                          <label htmlFor="title"><b>Choose a name for your project</b></label>
                          <input
                              className="form-control"
                              id="title"
                              type="text"
                              placeholder="eg. Build me a website"
                              value={this.state.title}
                              onChange={this.handleTitleChange}
                          />
                      </div>
                      <hr></hr>

                      <div className="form-group">
                          <br></br>
                          <label htmlFor="description"><b>Tell us more about your project</b></label>
                          <p>Great project descriptions include a little bit about yourself,
                          details of what you are trying to achieve, and any decisions that
                          you have already made about your project.
                          If there are things you are unsure of, dont worry, a freelancer will
                          be able to help you fill in the blanks.</p>
                          <textarea
                              className="form-control"
                              rows="10"
                              id="description"
                              placeholder='Description your project here ...'
                              value={this.state.description}
                              onChange={this.handleDescChange}
                          />
                      </div>

                      <div className="form-group">
                          <br></br>
                          <label htmlFor="lowBudget"><b>What is your lower estimated budget?</b></label>
                          <input
                              className="form-control"
                              type="text"
                              id="lowBudget"
                              placeholder="Lower Budget ($)"
                              value={this.state.lowBudget}
                              onChange={this.handleLowChange}
                          />
                      </div>
                      <hr></hr>

                      <div className="form-group">
                          <br></br>
                          <label htmlFor="highBudget"><b>What is your higher estimated budget?</b></label>
                          <input
                              className="form-control"
                              type="text"
                              id="highBudget"
                              placeholder="Higher Budget ($)"
                              value={this.state.highBudget}
                              onChange={this.handleHighChange}
                          />
                      </div>
                      <hr></hr>

                      <div className="form-group">
                          <br></br>
                          <label htmlFor="skills"><b>What skills are required?</b></label>
                          <p>Enter up to 5 skills that best describe your project.
                          Freelancers will use these skills to find projects they
                          are most interested and experienced in.</p>
                          <select
                              size="10"
                              multiple={true}
                              id="skills"
                              className="form-control"
                              value={this.state.projectSkills}
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
                                  <option>HTML5</option>
                                  <option>C</option>
                                  <option>JavaScript</option>
                          </select>
                      </div>
                      <hr></hr>

                      <div className="form-group">
                          <button
                              className="btn btn-primary"
                              type="submit">
                              Post Project
                          </button>
                      </div>
                      <hr></hr>
                      <ToastContainer />
                  </form>
              <br/>
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
        rehydrate: (username) => {
            dispatch({
                type: "persist/REHYDRATE",
                payload : {username:username}
            });
        },
    };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PostProject));
