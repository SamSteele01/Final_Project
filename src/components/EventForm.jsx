import React, {Component} from 'react';
import FormInput from './FormInput.jsx';

export default class EventForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      <FormInput/>
    </div>);
  }
}
EventForm.propTypes = {
};
