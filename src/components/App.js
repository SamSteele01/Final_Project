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
import WelcomePage from './WelcomePage.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      dashboard: 'Dashboard',
      profilePage: 'Profile',
      newEvent: 'New Event',
      event: 'Event'
    }
  }

// not sure if this is needed
  // componentWillMount() {
  //   this.setState({token: cookie.load('token')}); //get token from cookie, if it exists
  // }

// may need to intercept token from Url here. Or use hidden headers in the email link

  render() {
    return (
      <BrowserRouter>
        <BaseLayout
          // username={this.state.username} password={this.state.password} isLoggedIn={this.state.isLoggedIn} removeToken={this.removeToken.bind(this)} token={this.state.token}
          >
          <Switch>
            <Route path='/dashboard' render={(props) => (<Dashboard display={this.state.dashboard}/>)} />
            <Route path='/event-form' render={(props) => (<EventForm display={this.state.newEvent}/>)} />
            <Route path='/profile-page' render={(props) => (<ProfilePage display={this.state.profilePage}/>)} />
            <Route path='/login-page' render={(props) => (<LoginPage display={this.state.loginPage}/>)} />
            <Route path='/' component={WelcomePage} />
          </Switch>
        </BaseLayout>
      </BrowserRouter>
    );
  }
}

export default App;
