import React, { Component } from 'react';
import '../styles/App.css';
import {MemoryRouter, Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {bindAll} from 'lodash';
import Dashboard from './Dashboard.jsx';
import EventForm from './EventForm.jsx';
import LoginPage from './LoginPage.jsx';
import ProfilePage from './ProfilePage.jsx';
import BaseLayout from './BaseLayout.jsx';
import WelcomePage from './WelcomePage.jsx';

const history = createHistory();
const location = history.location;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      userId: null,
      bandsArray: null,
      bandsId: null,
      eventToken: null,
      doneMapping: false,
      doneMakingCalendarEvents: false,
      calendarEvents: null,
      displayNew: false
    }
    bindAll(this, 'navCreateNewEvent', 'doneMakingCalendarEvents', 'navCreateNewBand', 'navUpdateUserProfile', 'navUpdateBandProfile', 'navViewExistingEvent');
  }

// not sure if this is needed
  // componentWillMount() {
  //   this.setState({token: cookie.load('token')}); //get token from cookie, if it exists
  // }

// may need to intercept token from Url here. Or use hidden headers in the email link

  navCreateNewEvent(bandsId){
    console.log("navCreateNewEvent just fired. BandId is:" + bandsId);
    this.setState({displayNew: true, bandsId: bandsId});
  }

  navCreateNewBand(){
    this.setState({displayNew: true, bandsId: null});
  }

  navUpdateUserProfile(){
    this.setState({bandsId: null, displayNew: false});
  }

  navUpdateBandProfile(bandsId){
    this.setState({displayNew: false, bandsId: bandsId});
  }

  navViewExistingEvent(bandsId, eventId){
    console.log(" Nav to existing. BandsId: "+bandsId+" EventId: "+eventId);
    // debugger
    this.setState({bandsId: bandsId, eventToken: eventId, displayNew: false});
    history.push('/event-form', {bandsId: bandsId, eventToken: eventId, displayNew: false});
  }

  doneMakingCalendarEvents(calendarEvents){
    this.setState({doneMakingCalendarEvents: true, calendarEvents: calendarEvents});
  }

  noLongerNew(){
    this.setState({displayNew: false});
  }

  render() {
    return (
      // <MemoryRouter history={history}> //proxyConsole.js:54 Warning: <MemoryRouter> ignores the history prop. To use a custom history, use `import { Router }` instead of `import { MemoryRouter as Router }`.
      <Router history={history}>
        <BaseLayout>
          {/* <Switch> */}
            <Route path='/dashboard' render={(props) => (<Dashboard navCreateNewEvent={this.navCreateNewEvent}
            navCreateNewBand={this.navCreateNewBand}
            navUpdateUserProfile={this.navUpdateUserProfile}
            navUpdateBandProfile={this.navUpdateBandProfile}
            navViewExistingEvent={this.navViewExistingEvent}
            doneMakingCalendarEvents={this.doneMakingCalendarEvents}
            confirmDone={this.state.doneMakingCalendarEvents}
            calendarEvents={this.state.calendarEvents}
            />)} />
            <Route path='/event-form' render={(props) => (<EventForm displayNew={this.state.displayNew}
            bandsId={this.state.bandsId}
            eventToken={this.state.eventToken}
            noLongerNew={this.noLongerNew}
            />)} />
            {/* <Route path='/event-form' component={EventForm} /> */}
            <Route path='/profile-page' render={(props) => (<ProfilePage displayNew={this.state.displayNew}
            bandsId={this.state.bandsId}
            />)} />
            <Route path='/login-page' component={LoginPage} />
            <Route exact path='/' component={WelcomePage} />
          {/* </Switch> */}
        </BaseLayout>
      </Router>
      // </MemoryRouter>
    );
  }
}

export default App;
