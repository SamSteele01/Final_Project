import React, { Component } from 'react';
import moment from 'moment';
import {bindAll} from 'lodash';
import request from 'superagent';
import cookie from 'react-cookies';
import {connect} from 'react-redux';
import BigCalendar from 'react-big-calendar';
import {setBand, setEvent} from "../actions";
import createHistory from 'history/createBrowserHistory';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Link, Redirect, withRouter} from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

BigCalendar.momentLocalizer(moment);
let formats = {
  dateFormat: 'dd'
}
//
// const history = createHistory();
// const location = history.location;
// // Listen for changes to the current location.
// const unlisten = history.listen((location, action) => {
//   // location is an object like window.location
//   console.log(action, location.pathname, location.state)
// })

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      error: null,
      eventDropdownOpen: false,
      profileDropdownOpen: false,
      userId: null, //from login. May just be this.props.userId
      bandsArray: null, //array of band objects
      doneMapping: false,
      doneMakingCalendarEvents: false,
      eventsArray: [], //array of objects, from fetch. Has band and user Ids
      calendarEvents: []
    }
    bindAll(this, 'navigateToEvent', 'toggleEventDropdown', 'toggleProfileDropdown');
  }

  // props = {
  //   userId: null,
  //   bandsId: null,
  //   event_token: null,
  //   doneMakingCalendarEvents: false,
  //   calendarEvents: [],
  //   displayNew: false
  // }

  componentWillMount(){
    this.setState({token: cookie.load('token'), userId: cookie.load('userId')}); //get token from cookie, if it exists
    if(this.props.confirmDone&&this.props.calendarEvents){
      this.setState({doneMapping: true, doneMakingCalendarEvents: true, calendarEvents: this.props.calendarEvents});
    }else{
      this.setState({doneMapping: false, doneMakingCalendarEvents: false});
    }
  }

  componentDidMount(){
    if(!this.state.token||!this.state.userId){
      window.location.href = "/";
    }else{
      if(!this.state.eventsArray.length>0){
        this.fetchAllEventsForUser(this.state.userId);
      }
      this.fetchFullnameForUser(this.state.userId);
      this.fetchAllBandsForUser(this.state.userId);
    }
  }

  fetchAllEventsForUser(userId){
    // if(!this.state.doneMapping){
      request
        .get(`https://ez-tour.herokuapp.com/users/${userId}/my_events`)
        .set('Authorization', `Token token=${this.state.token}`)
        .end((err, res) => {
          let data = res.body.events;
          this.setState({eventsArray: data});
        });
    // }
  }

  fetchFullnameForUser(userId){
    request
      .get(`https://ez-tour.herokuapp.com/users/${userId}`)
      .set('Authorization', `Token token=${this.state.token}`)
      .end((err, res) => {
        let data = res.body.full_name;
        this.setState({fullName: data});
      });
  }

  fetchAllBandsForUser(userId){
    request
      .get(`https://ez-tour.herokuapp.com/users/${userId}/bands`)
      .set('Authorization', `Token token=${this.state.token}`)
      .end((err, res) => {
        let data = res.body.band;
        this.setState({bandsArray: data});
      });
  }

// mapOverBandsArrayAndFetchEvents = (arrayOfBands, callback) => {
//     let events = arrayOfBands.map((band) =>{
//       // console.log(band.id);
//       return( this.fetchAllEventsForBand(band.id))
//     })
//     // callback("doneMapping");
//     console.log(this.state.eventsArray);
//   }
//
//   fetchAllEventsForBand(bandsId){
//
//     let userId = this.state.userId; // may not need as a param
//     request
//       .get(`https://ez-tour.herokuapp.com/users/${userId}/bands/${bandsId}/events`)
//       .set('Authorization', `Token token=${this.state.token}`)
//       .end((err, res) => {
//         let data = res.body.events; //array
//         // console.log(data);
//         let eventsArray = this.state.eventsArray;
//         let holderArray = eventsArray.concat(data);
//         this.setState({eventsArray: holderArray});
//       });
//   }
//
  createCalendarEvents = (arrayOfEvents) => {
    let calendarEventArray = this.state.calendarEvents;
    let calEvents = arrayOfEvents.map((event) =>{
      return( calendarEventArray.push(this.createSingleEvent(event)))
    })
    this.setState({calendarEvents: calendarEventArray})
  }

  createSingleEvent = (theDeets) => {
    let eventObject = {
      'title': theDeets.venue,
      'start': new Date(theDeets.date),
      'end': new Date(theDeets.date),
      'bandId': theDeets.band_id,
      'eventId': theDeets.event_hash
      // +" "+theDeets.
    };
    return eventObject
  }

  // setDoneToTrue(stateVar){
  //   this.setState({[stateVar]: true});
  // }

  componentDidUpdate(){
    if(this.state.doneMakingCalendarEvents&&!this.props.confirmDone){
      this.props.doneMakingCalendarEvents(this.state.calendarEvents);
    }
    if(this.state.eventsArray.length>0 && this.state.doneMapping && !this.state.doneMakingCalendarEvents){
      // debugger
      this.createCalendarEvents(this.state.eventsArray);
      console.log(this.state.eventsArray);
      console.log(this.state.calendarEvents);
      this.setState({doneMakingCalendarEvents: true});
      // this.props.setBandList(this.state.calendarEvents); redux action
    }
    if(this.state.eventsArray.length>0 && !this.state.doneMapping){
      this.setState({doneMapping: true});
    }
  }

  toggleEventDropdown() {
    this.setState({
      eventDropdownOpen: !this.state.eventDropdownOpen
    });
  }

  toggleProfileDropdown() {
    this.setState({
      profileDropdownOpen: !this.state.profileDropdownOpen
    });
  }

  navigateToEvent(event){
    console.log("Event "+event.eventId+" has been clicked.");
    this.props.navViewExistingEvent(event.bandId, event.eventId); //setting state in App.js
    // to='/event-form'; // error
    //  withRouter(({ history}) => {() => { history.push('/event-form') }}); //does not work
    // history.push('/event-form'); // not working: see the url change but page does not rerender
    // this.props.history.push('/event-form', {bandsId: event.bandId, eventToken: event.eventId, displayNew: false}); // not working: see the url change but page does not rerender
    // debugger
    // history.go('/event-form', {bandsId: event.bandId, eventToken: event.eventId, displayNew: false}); // not working: no url change or rerender
    // history.goForward(); // changes url, does not rerender
    // this.props.history.push({pathname: '/event-form', state: {bandsId: event.bandId, eventToken: event.eventId, displayNew: false}})
    // history.go(); // gets it to nav/redirect, but looses the props
  }

  displayDropdowns(navTo, fxnName){
    if(this.state.bandsArray){
      let bandNameDropdownItem = this.state.bandsArray.map((band, index) => {
        return(
          <DropdownItem key={index}>
            <Link to={navTo} onClick={event => fxnName(band.id)}>{band.name}</Link>
          </DropdownItem>
        )
      })
      return(
        <div>
          {bandNameDropdownItem}
        </div>
      )
    }else{
      return null;
    }
  }

  render() {
    // map to create DropdownItems = user and bands - need Ids and Links

    return (
      <div className="dashboard">
        <div className="d-flex justify-content-between dash-buttons">
          {/* <div><button className="button create-new-event-button"><Link to="/event-form" onClick={event => this.props.navCreateNewEvent(event)} >Create New Event</Link></button></div> */}
          <Dropdown isOpen={this.state.eventDropdownOpen} toggle={this.toggleEventDropdown}>
             <DropdownToggle caret className="toggle-button">
               Create New Event
             </DropdownToggle>
             <DropdownMenu>
               {this.displayDropdowns("/event-form", this.props.navCreateNewEvent)}
               <DropdownItem>
               </DropdownItem>
             </DropdownMenu>
          </Dropdown>
          {/* <h1>Dashboard</h1> */}
          <div className="row right-dash-buttons">
            <div><button className="button create-new-event-button"><Link to="/profile-page" onClick={event => this.props.navCreateNewBand(event)} >Create New Band</Link></button></div>
            <Dropdown isOpen={this.state.profileDropdownOpen} toggle={this.toggleProfileDropdown}>
               <DropdownToggle caret className="toggle-button">
                 Edit Profile
               </DropdownToggle>
               <DropdownMenu right>
                 <DropdownItem>User:</DropdownItem>
                 <DropdownItem><Link to="/profile-page" onClick={event => this.props.navUpdateUserProfile(this.state.userId)} >{this.state.fullName}</Link></DropdownItem>
                 <DropdownItem divider />
                 <DropdownItem>Bands:</DropdownItem>
                 {this.displayDropdowns("/profile-page", this.props.navUpdateBandProfile)}
               </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      {this.state.doneMakingCalendarEvents &&
        <BigCalendar
          popup
          selectable
          culture='en'
          onSelectEvent={event => this.navigateToEvent(event)}
          events={this.state.calendarEvents}
          views={['month', 'week', 'day', 'agenda']}/>
      }
    </div>
    );
  }
}

// const mapStateToProps = function(state) {
//     return {setBand: state.setBand}
// }
//
// const mapDispatchToProps = function(dispatch) {
//     return {
//         setBand: function(filter) {
//             dispatch(setBand(filter));
//         }
//     }
// }

// const mapStateToProps = function(state) {
//     return {setBand: state.setBand}
// }
// // setEvent: state.setEvent
// const mapDispatchToProps = (dispatch) => (
//     {
//         setBand: (filter) =>  dispatch(setBand(filter)),
//         setEvent: (filter) =>  dispatch(setEvent(filter))
//     }
// )
//
// export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


Dashboard.propTypes = {
};
