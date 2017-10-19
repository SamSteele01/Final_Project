import React, {Component} from 'react';
import FormInput from './FormInput.jsx';
import AssetContainer from './AssetContainer.jsx';

export default class EventBandView extends Component {

// displays the asset tool bar on the side of the page.

  render() {
    return (
      <div>
        <FormInput/>
        <AssetContainer/>
      </div>
    );
  }
}

EventBandView.propTypes = {
};
