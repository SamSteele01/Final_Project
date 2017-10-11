import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../styles/App.css';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Dashboard from './Dashboard.jsx';
import EventForm from './EventForm.jsx';
import LoginPage from './LoginPage.jsx';
import ProfilePage from './ProfilePage.jsx';
import BaseLayout from './BaseLayout.jsx';
import ProfileEnter from './ProfileEnter.jsx';

class App extends Component {
  constructor(props) {
    super(props);


  }

  render() {

  return (
    <BrowserRouter>
      <BaseLayout
        // username={this.state.username} password={this.state.password} isLoggedIn={this.state.isLoggedIn} removeToken={this.removeToken.bind(this)} token={this.state.token}
        >
        <Switch>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/event-form' component={EventForm} />
          <Route path='/profile-page' component={ProfilePage} />
          <Route path='/profile-enter' component={ProfileEnter} />
          <Route path='/' component={LoginPage} />
        </Switch>
      </BaseLayout>
    </BrowserRouter>
    );
  }
}

export default App;
