/* global gapi */
import React, {PropTypes} from 'react';
import Logo from '../styles/two_tickets_white1600.png'


export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);

    this.state = {

    }
  }

    signOut() {
      let auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
    }


  render() {
    return (
      <nav className="navbar navbar-light bg-faded">
        <a className="navbar-brand" >
          <img src={Logo} width="50" height="50" className="d-inline-block " alt=""/>
          EZ Tour
        </a>
        <a href="#" onClick={this.signOut}>Sign out</a>

      </nav>
    );
  }
}

// function signOut() {
//   let auth2 = gapi.auth2.getAuthInstance();
//   auth2.signOut().then(function () {
//     console.log('User signed out.');
//   });
// }
Header.propTypes = {
};
