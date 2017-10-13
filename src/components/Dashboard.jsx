import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
// import momentLocalizer from 'react-widgets';

BigCalendar.momentLocalizer(moment);
let formats = {
  dateFormat: 'dd'
}

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [
        {
          'title': 'Career shit, meeting',
          'allDay': true,
          'start': new Date(2017, 9, 13),
          'end': new Date(2017, 9, 13)
        },
        {
          'title': 'Coding, and games',
          'start': new Date(2017, 9, 14),
          'end': new Date(2017, 9, 14)
        },

        {
          'title': 'Code Freeze',
          'start': new Date(2017, 9, 20, 0, 0, 0),
          'end': new Date(2017, 9, 20, 0, 0, 0)
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


  render() {
    return (
      <div className="dashboard">
        <div className="d-flex justify-content-between">
          <div><button className="button create-new-event-button"><Link to="/event-form">Create New Event</Link></button></div>
          <h1>Dashboard</h1>
          <div><button className="button create-new-event-button"><Link to="/profile-page">Edit Profile</Link></button></div>
        </div>
        <BigCalendar
          culture='en-GB'
          events={this.state.tasks}
          views={['month', 'week', 'day', 'agenda']}/>
      </div>
    );
  }
}


Dashboard.propTypes = {
};
