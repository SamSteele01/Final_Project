import React, { Component } from 'react';
import '../styles/App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from './Dashboard.jsx';
import EventForm from './EventForm.jsx';
import LoginPage from './LoginPage.jsx';
import ProfilePage from './ProfilePage.jsx';
import BaseLayout from './BaseLayout.jsx';
import WelcomePage from './WelcomePage.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      userId: null,
      bandsArray: null,
      bandsId: null,
      event_token: null,
      doneMapping: false,
      doneMakingCalendarEvents: false,
      calendarEvents: [],
      displayNew: false
    }
  }

// not sure if this is needed
  // componentWillMount() {
  //   this.setState({token: cookie.load('token')}); //get token from cookie, if it exists
  // }

// may need to intercept token from Url here. Or use hidden headers in the email link

  navCreateNewEvent(){
    this.setState({displayNew: true});
  }

  navCreateNewEvent(){
    this.setState({});
  }

  navCreateNewEvent(){
    this.setState({});
  }

  navCreateNewEvent(){
    this.setState({});
  }

  render() {
    return (
      <BrowserRouter>
        <BaseLayout>
          <Switch>
            <Route path='/dashboard' render={(props) => (<Dashboard navCreateNewEvent={this.navCreateNewEvent} />)} />
            <Route path='/event-form' component={EventForm} />
            {/* need to pass userId (from cookie) and bandsId (from Dashboard) as well as specifing display= user/band */}
            <Route path='/profile-page' component={ProfilePage} />
            <Route path='/login-page' component={LoginPage} />
            <Route path='/' component={WelcomePage} />
          </Switch>
        </BaseLayout>
      </BrowserRouter>
    );
  }
}

export default App;
