import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class WelcomePage extends Component {

  render() {
    return (
      <div>
        <div className="welcome-text">
          <h1> WELCOME TO EZ TOUR </h1>
        </div>
        <div className="welcome-text-2">
          <h2>Where managing your events just got simpler.</h2>
            <div className="btn-group btn-group-lg">
              <Link to='/login-page'><button type="button" className="btn btn-primary welcome-button">VIP Access</button></Link>
            </div>
        </div>
      </div>);
  }
}

WelcomePage.propTypes = {
};
