// component
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import FormInput from './FormInput.jsx';
import EventBandView from './EventBandView.jsx';
import EventVenueView from './EventVenueView.jsx';

export default class EventForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayBandView: false
    }
  }

// need to catch token from url if coming from an email. This will cause VenueView to render.

  // fxnToGrabTokenFromUrl(){
  //
  // }


// h1 should be new event if coming from button, should be event if coming from calendar,
  render() {
    return (
      <div>
        <div className="d-flex justify-content-between">
          <div><button className="button create-new-event-button"><Link to="/dashboard">Dashboard</Link></button></div>
          <h1>New Event</h1>
          <div><button className="button create-new-event-button"><Link to="/profile-page">Edit Profile</Link></button></div>
        </div>
        {this.state.displayBandView ?
          <EventBandView/> :
          <EventVenueView/>
        }
      </div>
    );
  }
}
EventForm.propTypes = {
};
