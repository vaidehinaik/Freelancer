import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import * as API from '../api/API';
import {connect} from 'react-redux';

class Home extends Component {
    render() {
        return (
            <div className="container-fluid">
                {"Hello !!!" + this.props.pick.username}
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
    return {};
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Home));
