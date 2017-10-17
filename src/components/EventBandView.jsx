import React, {Component} from 'react';
import FormInput from './FormInput.jsx';
import AssetToolbar from './AssetToolbar.jsx';

export default class EventBandView extends Component {

// displays the asset tool bar on the side of the page.

  render() {
    return (
      <div>
        <FormInput/>
        <AssetToolbar/>
      </div>
    );
  }
}

EventBandView.propTypes = {
};
