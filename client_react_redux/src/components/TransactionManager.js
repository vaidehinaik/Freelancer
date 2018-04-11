import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import cookie from 'react-cookies';
import Octicon from 'react-octicon';
import * as API from '../api/API';
import {connect} from 'react-redux';
import Navbar from './Navbar';

class TransactionManager extends Component {

    constructor (props) {
          super(props)
          this.state = {
            total_funds: '',
            transactions: '',
            input_fund: '',
            message: ''
          };
          this.handleInputFunds = this.handleInputFunds.bind(this);
    }

    componentWillMount() {
      if(cookie.load('token') === undefined) {
        /*Redirect to login page if cookie not found*/
        this.props.history.push('/');
      }
    }

    componentDidMount() {
      document.getElementById("inputErr").style.visibility = "hidden";
    }

    handleInputFunds = (event) => {
      this.setState({input_fund: event.target.value});
    }

    displayErrMsg() {
      document.getElementById("inputErr").style.visibility = "visible";
      document.getElementById('inputErr').style.display="inline-block";
    }

    notify = (message) => {
      toast.error(message, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 3000
      });
    }

    handleSubmit = (input_fund, fund_type) => {
      console.log("sending funds: " + input_fund);
      console.log("fund type: " + fund_type);
      if(input_fund === 0) {
          const message = "Input fund cannot be 0"
          this.setState({
              message: message
          });
          this.displayErrMsg();
          this.notify(message);
      } else {
          var status;
          API.doTransaction({amount: input_fund, type: fund_type})
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
                      this.props.udpateTotalFunds({total_funds: json.total_funds});
                      this.setState({
                          message: json.message
                      });
                      localStorage.setItem('total_funds', json.total_funds);
                  } else if (status === 401) {
                      const message = "Something went wrong. Try again !!!"
                      this.setState({
                          message: json.message
                      });
                      this.displayErrMsg();
                      this.notify(json.message);
                  } else {
                      const message = "Server error... Try again later !!!"
                      this.setState({
                          message: json.message
                      });
                      this.displayErrMsg();
                      this.notify(json.message);
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
                <div className="row">
                  <div className="col-md-12 col-md-offset-2 mx-auto">
                    <Navbar />
                  </div>
                  <div className="panel panel-primary">
                    <div className="panel-body">
                      <form>
                          <div className="form-group">
                              <h3><i>{this.props.pick.username} Transactions</i></h3>
                              <br></br>
                          </div>
                          <div className="form-group">
                              <input
                                  className="form-control"
                                  type="text"
                                  label="amount"
                                  placeholder="Input Amount"
                                  value={this.state.input_fund}
                                  onChange={this.handleInputFunds}
                              />
                          </div>
                          <div className="form-group">
                              <button
                                  className="btn btn-success"
                                  type="button"
                                  onClick={() => this.handleSubmit(this.state, "recieved")}>
                                      Add Money
                              </button>
                              <button
                                  className="btn btn-danger"
                                  type="button"
                                  onClick={() => this.handleSubmit(this.state, "withdraw")}>
                                      Withdraw
                              </button>
                              <hr></hr>
                          </div>
                          <div className="form-group">
                              <div id="inputErr" className="alert alert-danger">
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
      return {
          pick: state.reducers
      };
  };

  const mapDispatchToProps = (dispatch) => {
      return{
          udpateTotalFunds: (payload) => {
              dispatch({
                  type: "TOTAL_FUNDS",
                  payload: {total_funds: payload.total_funds}
              });
          },
      };
  };

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(TransactionManager));
