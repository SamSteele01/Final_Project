import React, { Component } from 'react';
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
        <h1>dashboard</h1>
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
