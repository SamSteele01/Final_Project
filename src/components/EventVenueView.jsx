import React, {Component} from 'react';
import AssetContainer from './AssetContainer.jsx';
import FormInput from './FormInput.jsx';
import ProfileMini from './ProfileMini.jsx';

export default class EventVenueView extends Component {

  render() {
    return (
      <div>
        <ProfileMini/>
        <AssetContainer/>
        <FormInput/>
      </div>
    );
  }
}

EventVenueView.propTypes = {
};
