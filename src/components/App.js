import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../styles/App.css';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Dashboard from './Dashboard.jsx';
import EventForm from './EventForm.jsx';
import LoginPage from './LoginPage.jsx';
import ProfilePage from './ProfilePage.jsx';
import BaseLayout from './BaseLayout.jsx';

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
          <Route path='/dashboard' render={Dashboard} />
          <Route path='/event-form' render={EventForm} />
          <Route path='/profile-page' render={ProfilePage} />
          <Route path='/' component={LoginPage} />
        </Switch>
      </BaseLayout>
    </BrowserRouter>
    );
  }
}

export default App;
