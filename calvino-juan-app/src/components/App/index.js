import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import Layout from './../Layout';
import LoginPage from './../../pages/LoginPage';
import Meetups from '../../pages/Meetups';
import store from './../../store';

const GlobalStyle = createGlobalStyle`
  body {
    background: #EDEDED;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin: 0;
  }
`;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
            <GlobalStyle />
            <Layout/>
            <Switch>
              <Route path="/" exact component={Meetups} />
              <Route path="/login" exact component={LoginPage} />
            </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App;