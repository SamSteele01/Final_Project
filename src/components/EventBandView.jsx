import React, {Component} from 'react';
import FormInput from './FormInput.jsx';
import AssetToolbar from './AssetToolbar.jsx';

export default class EventBandView extends Component {
  constructor(props) {
    super(props);

    this.state ={

    }
  }



  render() {
    return (
      <div>
        <AssetToolbar/>
        <FormInput/>
      </div>
    );
  }
}

EventBandView.propTypes = {
};
