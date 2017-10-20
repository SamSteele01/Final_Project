import React, { Component } from 'react';
import '../styles/App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {bindAll} from 'lodash';
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
    bindAll(this, 'navCreateNewEvent', 'doneMakingCalendarEvents');
  }

// not sure if this is needed
  // componentWillMount() {
  //   this.setState({token: cookie.load('token')}); //get token from cookie, if it exists
  // }

// may need to intercept token from Url here. Or use hidden headers in the email link

  navCreateNewEvent(){
    this.setState({displayNew: true});
  }

  navCreateNewBand(){
    this.setState({displayNew: true});
  }

  navUpdateUserProfile(){
    this.setState({});
  }

  navUpdateBandProfile(){
    this.setState({});
  }

  navViewExistingEvent(){
    this.setState({});
  }

  doneMakingCalendarEvents(){
    this.setState({doneMakingCalendarEvents: true});
  }

  render() {
    return (
      <BrowserRouter>
        <BaseLayout>
          <Switch>
            <Route path='/dashboard' render={(props) => (<Dashboard navCreateNewEvent={this.navCreateNewEvent} doneMakingCalendarEvents={this.doneMakingCalendarEvents}
            confirmDone={this.state.doneMakingCalendarEvents}
            />)} />
            <Route path='/event-form' component={EventForm}
            />
            <Route path='/profile-page' render={(props) => (<ProfilePage displayNew={this.state.displayNew}
            />)} />
            <Route path='/login-page' component={LoginPage} />
            <Route path='/' component={WelcomePage} />
          </Switch>
        </BaseLayout>
      </BrowserRouter>
    );
  }
}

export default App;
