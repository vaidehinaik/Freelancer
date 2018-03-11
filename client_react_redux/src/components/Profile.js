import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import Octicon from 'react-octicon';
import * as API from '../api/API';
import {connect} from 'react-redux';

class Profile extends Component {
  constructor (props) {
      super(props)
      this.state = {
        username: this.props.pick.username,
        title: '',
        description: '',
        budgetLow: '',
        budgetHigh: '',
        skills: '',
        message: ''
      };
  }
}

export default withRouter(Profile);
