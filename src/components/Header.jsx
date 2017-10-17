/* global gapi */
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Logo from '../styles/two_tickets_white1600.png';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);

    this.state = {
      loggedIn: true,
      // display: null
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
        {this.props.display &&
          <div>
            <h2>{this.props.display}</h2>
          {this.props.display==='Dashboard' &&
            <div className="create-new-event-button">
              <div><button className="button create-new-event-button"><Link to="/event-form">Create New Event</Link></button></div>
            </div>
          }
          </div>
        }
        {this.state.loggedIn &&
          <div className="sign-out-button">
            <a className="button" onClick={this.signOut}>Sign out</a>
          </div>
        }
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
// Header.propTypes = {
// };
