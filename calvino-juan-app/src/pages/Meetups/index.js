import React, { Component } from 'react';
import { connect } from 'react-redux'

import Container from '../../components/Container';
import { getMeetupsRequest, getMeetupsUserRequest } from '../../store';

class Meetups extends Component {

    componentDidMount() {
        const { isLogin, history, getMeetups, getMeetupsUser, user } = this.props;
        if(isLogin) {
            const userId = user._id;
            getMeetupsUser(userId);
            getMeetups();
        } else {
            history.push('/login');
        }
    }

    render() {
        const { meetups, loading, error } = this.props;
        return (
            <Container data={meetups} loading={loading} error={error} />            
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.error,
        isLogin: state.isLogin,
        loading: state.loading,
        meetups: state.meetups,
        meetupsUser: state.meetupsUser,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getMeetups: () => dispatch(getMeetupsRequest()),
        getMeetupsUser: id => dispatch(getMeetupsUserRequest(id)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Meetups);