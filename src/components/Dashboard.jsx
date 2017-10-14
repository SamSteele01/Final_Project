import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import request from 'superagent';
// import momentLocalizer from 'react-widgets';

BigCalendar.momentLocalizer(moment);
let formats = {
  dateFormat: 'dd'
}

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: null, //from login. May just be this.props.userId
      bandsArray: null, //array of band
      bandsIds: null, //array of numbers, to be mapped over. Need to keep track of which events b

      eventsArray: [], //array of objects, from fetch.
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

  fetchAllBands(userId){
    request
      .get(`https://ez-tour.herokuapp.com/users/${userId}/bands`)
      .set('Authorization', `Token token=${this.props.token}`)
      .end((err, res) => {
        let data = res.body.band;
        this.setState({bandsArray: data});
      });
  }

  fetchAllEvents(userId, bandsId){
    request
      .get(`https://ez-tour.herokuapp.com/users/${userId}/bands/${bandsId}/events`)
      .set('Authorization', `Token token=${this.props.token}`)
      .end((err, res) => {
        let data = res.body.events; //array
        let holderArray = this.state.eventsArray;
        holderArray.concat(data);
        this.setState({eventsArray: holderArray});
      });
  }

  createCalendarEvents(){

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
