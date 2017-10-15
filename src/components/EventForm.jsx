import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import FormInput from './FormInput.jsx';
import AssetToolbar from './AssetToolbar.jsx';
import ProfileMini from './ProfileMini.jsx';


export default class EventForm extends Component {
  constructor(props) {
    super(props);
  }

  fxnToCreateNewEvent(){

  }

// h1 should be new event if coming from button, should be event if coming from calendar
  render() {
    return (
      <div>
      {/* <ProfileMini/> */}
        <div className="d-flex justify-content-between">
          <div><button className="button create-new-event-button"><Link to="/dashboard">Dashboard</Link></button></div>
          <h1>New Event</h1>
          <div><button className="button create-new-event-button"><Link to="/profile-page">Edit Profile</Link></button></div>
        </div>
        <FormInput/>
        <AssetToolbar/>
      </div>
    );
  }
}
EventForm.propTypes = {
};
