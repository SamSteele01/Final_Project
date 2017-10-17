import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import request from 'superagent';
import cookie from 'react-cookies';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

BigCalendar.momentLocalizer(moment);
let formats = {
  dateFormat: 'dd'
}

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);

    this.state = {
      token: null,
      error: null,
      dropdownOpen: false,
      userId: null, //from login. May just be this.props.userId
      bandsArray: null, //array of band objects
      doneMapping: false,
      doneMakingCalendarEvents: false,
      eventsArray: [], //array of objects, from fetch. Has band and user Ids
      calendarEvents: [
        {
          'title': "Collins night club",
          'allDay': true,
          'start': new Date(2017, 9, 13),
          'end': new Date(2017, 9, 13)
        },
        {
          'title': "Lyman's rockin jazz daddio swingers club",
          'start': new Date(2017, 9, 14, 21, 30 ),
          'end': new Date(2017, 9, 14, 1, 0 ),
          desc: 'Pre-meeting meeting, to prepare for the meeting'
        },

        {
          'title': 'Spruill concert hall',
          'start': new Date(2017, 9, 20, 19, 0, ),
          'end': new Date(2017, 9, 20, 21, 30, 0)
        },

        {
          'title': 'All Things Open',
          'start': new Date(2017, 9, 23, 0, 0, 0),
          'end': new Date(2017, 9, 25, 0, 0, 0)
        },
        {
          'title': 'Demo Day',
          'start': new Date(2017, 9, 25),
          'end': new Date(2017, 9, 25),
          desc: 'Big conference for important people'
        }
      ]
    }
  }

  componentWillMount(){
    this.setState({token: cookie.load('token')}); //get token from cookie, if it exists
    this.setState({userId: cookie.load('userId')}); //get token from cookie, if it exists
  }

  componentDidMount(){
    this.fetchAllBandsForUser();
  }

  fetchAllBandsForUser(){
    let userId = this.state.userId; // may not need as a param
    request
      .get(`https://ez-tour.herokuapp.com/users/${userId}/bands`)
      .set('Authorization', `Token token=${this.state.token}`)
      .end((err, res) => {
        let data = res.body.band;
        this.setState({bandsArray: data});
      });
  }

  mapOverBandsArrayAndFetchEvents = (arrayOfBands) => {
    let events = arrayOfBands.map((band) =>{
      // console.log(band.id);
      return( this.fetchAllEventsForBand(band.id))
    })
    console.log(this.state.eventsArray);
  }

  fetchAllEventsForBand(bandsId){
    let userId = this.state.userId; // may not need as a param
    request
      .get(`https://ez-tour.herokuapp.com/users/${userId}/bands/${bandsId}/events`)
      .set('Authorization', `Token token=${this.state.token}`)
      .end((err, res) => {
        let data = res.body.events; //array
        // console.log(data);
        let eventsArray = this.state.eventsArray;
        let holderArray = eventsArray.concat(data);
        this.setState({eventsArray: holderArray});
      });
  }

  createCalendarEvents = (arrayOfEvents) => {
    console.log(arrayOfEvents);
    let calendarEventArray = this.state.calendarEvents;
    let calEvents = arrayOfEvents.map((event) =>{
      console.log(event);
      return( calendarEventArray.push(this.createSingleEvent(event)))
    })
    this.setState({calendarEvents: calendarEventArray})
  }

  createSingleEvent = (theDeets) => {
    let eventObject = {
      'title': theDeets.venue,
      'start': new Date(theDeets.date),
      'end': new Date(theDeets.date)
    };
    console.log(eventObject);
    return eventObject
  }

  formatDateAndTime(date, time){

    return (2017, 9, 20, 21, 30, 0)
  }

  componentDidUpdate(){
    if(this.state.eventsArray.length>0 && this.state.doneMapping && !this.state.doneMakingCalendarEvents){
      console.log(this.state.eventsArray);
      // debugger
      this.createCalendarEvents(this.state.eventsArray);
      console.log(this.state.calendarEvents);
      this.setState({doneMakingCalendarEvents: true});
      // this.props.setBandList(this.state.bandsArray); redux action
    }
    if(this.state.bandsArray && !this.state.doneMapping){
      this.mapOverBandsArrayAndFetchEvents(this.state.bandsArray);
      this.setState({doneMapping: true});
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    // map to create DropdownItems = user and bands - need Ids and Links
    return (
      <div className="dashboard">
        <div className="d-flex justify-content-between">
          <div><button className="button create-new-event-button"><Link to="/event-form">Create New Event</Link></button></div>
          <h1>Dashboard</h1>
          {/* <div><button className="button create-new-event-button"><Link to="/profile-page">Edit Profile</Link></button></div> */}
          <div>
            <Dropdown className="button create-new-event-button" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
               <DropdownToggle caret className="button create-new-event-button">
                 Edit Profile
               </DropdownToggle>
               <DropdownMenu>
                 {/* <DropdownItem header>Header</DropdownItem> */}
                 {/* <DropdownItem disabled>Action</DropdownItem> */}
                 <DropdownItem><Link to={{ pathname: "/profile-page", state: { userProfile: true} }}>User Profile</Link></DropdownItem>
                 <DropdownItem divider />
                 <DropdownItem><Link to={{ pathname: "/profile-page", state: { userProfile: false} }}>Band Profile</Link></DropdownItem>
               </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        {this.state.doneMakingCalendarEvents &&
          <BigCalendar
            culture='en'
            events={this.state.calendarEvents}
            views={['month', 'week', 'day', 'agenda']}/>
        }
      </div>
    );
  }
}


Dashboard.propTypes = {
};
