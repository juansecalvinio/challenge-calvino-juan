import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import guestIcon from './../../../../../img//icons/guest-icon.svg';
import adminIcon from './../../../../../img//icons/admin-icon.svg';
import logout from './../../../../../img//icons/logout.svg';

import { 
    StyledUserInfoWrapper
} from './styled';

import { getUserRequest } from './../../../../../store';

class User extends Component {

    render() {
        const { user, isLogin } = this.props;
        return (
            <StyledUserInfoWrapper>
                {(isLogin && user.type === "admin" &&
                <img style={{ marginRight: '1em' }} src={adminIcon} alt="admin-icon" width={50} />) || 
                (isLogin && user.type === "guest" &&
                <img style={{ marginRight: '1em' }} src={guestIcon} alt="guest-icon" width={50} />)}
                {isLogin && <Link to="/login">
                    <img style={{ marginRight: '1em' }} src={logout} alt="logout" width={30} />
                </Link>}
            </StyledUserInfoWrapper>          
        )
    }    
}

const mapStateToProps = state => {
    return {
        user: state.user,
        loading: state.loading,
        isLogin: state.isLogin,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUser: () => dispatch(getUserRequest()),
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps,
)(User);
