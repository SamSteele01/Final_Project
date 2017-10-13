import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
// import momentLocalizer from 'react-widgets';


export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: []
    }
  }


  render() {
    return (
      <div className="dashboard">
        <div className="d-flex justify-content-between">
          <h1>Dashboard</h1>
          <div><button className="button create-new-event-button"><Link to="/event-form">Create New Event</Link></button></div>
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
BigCalendar.momentLocalizer(moment);

Dashboard.propTypes = {
};
