import React, {Component} from 'react';
import ProfileEnter from './ProfileEnter.jsx';

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ProfileEnter/>
      </div>);
  }
}
ProfilePage.propTypes = {
};
