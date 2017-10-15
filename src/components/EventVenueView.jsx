import React, {Component} from 'react';
import AssetContainer from './AssetContainer.jsx';
import FormInput from './FormInput.jsx';

export default class EventVenueView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AssetContainer/>
        <FormInput/>
      </div>
    );
  }
}

EventVenueView.propTypes = {
};
