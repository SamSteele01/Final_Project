import React, {Component} from 'react';

export default class ProfileMini extends Component {

  render() {
    return (
      <div className="mini-profile">
        <div class="card band-profile" >
          <img class="card-img-top" src="" alt="Band and/or Manager Image"/>
            <div class="card-block">
              <h4 class="card-title">Profile</h4>
              <p class="card-text">Imported information from profile</p>
            </div>
        </div>
      </div>);
  }
}
ProfileMini.propTypes = {
};
