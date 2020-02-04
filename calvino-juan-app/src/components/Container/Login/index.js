import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import {
    StyledLoginContainer,
    StyledLoginWrapper,
} from './styled';

import beer from './../../../img/icons/beer.svg';

import { getUserRequest, getLogout } from './../../../store';

const StyledForm = styled(Form)`
    width: 100%;
    margin: 10px auto;
`;

class Login extends Component {

    state = {
        username: '',
        password: '',
    }

    componentDidMount() {
        const { isLogin, logout } = this.props;
        if(isLogin) {
            logout();
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.isLogin !== this.props.isLogin) {
            this.props.history.push("/");
        }
    }

    handleClickLogin = e => {
        e.preventDefault();
        const { getUser } = this.props;
        const { username, password } = this.state;
        
        const userLogin = {
            "username": username,
            "password": password
        }
        
        getUser(userLogin);
    }

    render() {
        const { username, password } = this.state;
        const { loading, error } = this.props;
        return (
            <StyledLoginContainer>
                <img src={beer} alt="beer-logo" width={80} />
                <StyledLoginWrapper>
                    <Card style={{ width: '20rem' }}>
                        <Card.Header as="h5">Bienvenido!</Card.Header>
                        <Card.Body>
                            <Card.Title>Ingrese sus datos para continuar</Card.Title>
                            <StyledForm>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="email" placeholder="Username" 
                                    value={username} 
                                    onChange={ e => this.setState({ username: e.target.value }) }/>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="Password" 
                                    value={password}
                                    onChange={ e => this.setState({ password: e.target.value }) }/>
                                </Form.Group>
                                <Button variant="success" onClick={this.handleClickLogin} >
                                    {(!loading && 'Ingresar') || <Loader type="ThreeDots" color="#FFFFFF" height={20} width={20} />}
                                </Button>
                            </StyledForm>
                        </Card.Body>
                    </Card>
                </StyledLoginWrapper>
                {!loading && error && <Alert variant="danger">{error}</Alert>}
            </StyledLoginContainer>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.error,
        user: state.user,
        loading: state.loading,
        isLogin: state.isLogin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUser: (user) => dispatch(getUserRequest(user)),
        logout: () => dispatch(getLogout()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
