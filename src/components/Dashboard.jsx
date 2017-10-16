import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import request from 'superagent';
import cookie from 'react-cookies';
// import momentLocalizer from 'react-widgets';

BigCalendar.momentLocalizer(moment);
let formats = {
  dateFormat: 'dd'
}

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      error: null,
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
          'title': 'DTS ENDS',
          'start': new Date(2018, 10, 6, 0, 0, 0),
          'end': new Date(2018, 10, 13, 0, 0, 0)
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
        },
        {
          'title': 'Meeting',
          'start': new Date(2017, 3, 12, 10, 30, 0, 0),
          'end': new Date(2017, 3, 12, 12, 30, 0, 0),
          desc: 'Pre-meeting meeting, to prepare for the meeting'
        },
        {
          'title': 'Lunch',
          'start':new Date(2017, 3, 12, 12, 0, 0, 0),
          'end': new Date(2017, 3, 12, 13, 0, 0, 0),
          desc: 'Power lunch'
        },
        {
          'title': 'Meeting',
          'start':new Date(2017, 3, 12,14, 0, 0, 0),
          'end': new Date(2017, 3, 12,15, 0, 0, 0)
        },
        {
          'title': 'Happy Hour',
          'start':new Date(2017, 3, 12, 17, 0, 0, 0),
          'end': new Date(2017, 3, 12, 17, 30, 0, 0),
          desc: 'Most important meal of the day'
        },
        {
          'title': 'Dinner',
          'start':new Date(2017, 3, 12, 20, 0, 0, 0),
          'end': new Date(2017, 3, 12, 21, 0, 0, 0)
        },
        {
          'title': 'Birthday Party',
          'start':new Date(2017, 3, 13, 7, 0, 0),
          'end': new Date(2017, 3, 13, 10, 30, 0)
        },
        {
          'title': 'Late Night Event',
          'start':new Date(2017, 3, 17, 19, 30, 0),
          'end': new Date(2017, 3, 18, 2, 0, 0)
        },
        {
          'title': 'Multi-day Event',
          'start':new Date(2017, 3, 20, 19, 30, 0),
          'end': new Date(2017, 3, 22, 2, 0, 0)
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

  mapOverBandsArrayAndFetchEvents(arrayOfBands){
    let events = arrayOfBands.map((band) =>{
      console.log(band.id);
      return( this.fetchAllEventsForBand(band.id))
    })
    this.setState({doneMapping: true});
  }

  fetchAllEventsForBand(bandsId){
    let userId = this.state.userId; // may not need as a param
    request
      .get(`https://ez-tour.herokuapp.com/users/${userId}/bands/${bandsId}/events`)
      .set('Authorization', `Token token=${this.state.token}`)
      .end((err, res) => {
        let data = res.body.events; //array
        console.log(data);
        let eventsArray = this.state.eventsArray;
        let holderArray = eventsArray.concat(data);
        this.setState({eventsArray: holderArray});
      });
  }

  createCalendarEvents(eventsArray){
    let calEvents = eventsArray.map((event) =>{
        let eventObject = {
          'title': 'Spruill concert hall',
          'start': new Date(2017, 9, 20, 19, 0, ),
          'end': new Date(2017, 9, 20, 21, 30, 0)
        }
        let calendarEvents = this.state.calendarEvents;
        let holderArray = calendarEvents.push(eventObject);
        return(
        this.setState({calendarEvents: holderArray})
      )
    })
    this.setState({doneMakingCalendarEvents: true});
  }

  componentDidUpdate(){
    if(this.state.doneMapping && !this.state.doneMakingCalendarEvents){
      this.createCalendarEvents(this.state.eventsArray);
      // this.props.setBandList(this.state.bandsArray); redux action
    }
    if(this.state.bandsArray && !this.state.doneMapping){
      this.mapOverBandsArrayAndFetchEvents(this.state.bandsArray);
    }
  }

  render() {
    return (
      <div className="dashboard">
        <div className="d-flex justify-content-between">
          <div><button className="button create-new-event-button"><Link to="/event-form">Create New Event</Link></button></div>
          <h1>Dashboard</h1>
          <div><button className="button create-new-event-button"><Link to="/profile-page">Edit Profile</Link></button></div>
        </div>
        <BigCalendar
          culture='en'
          events={this.state.calendarEvents}
          views={['month', 'week', 'day', 'agenda']}/>
      </div>
    );
  }
}


Dashboard.propTypes = {
};
