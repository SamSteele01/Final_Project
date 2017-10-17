import React, {Component} from 'react';
import BandProfileEnter from './BandProfileEnter.jsx';
import UserProfileEnter from './UserProfileEnter.jsx';

export default class ProfileMini extends Component {

  render() {
    return (
      <div className="mini-profile">
        <div className="card band-profile" >
          <img className="card-img-top" src="{avatar:{this.state.avatars}" alt="Band and/or Manager Image"/>
            <div className="card-block">
              <h4 className="card-title">Profile</h4>
              <p className="card-text">Imported information from profile</p>
            </div>
        </div>
      </div>);
  }
}
ProfileMini.propTypes = {
};
