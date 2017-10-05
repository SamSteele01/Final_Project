import React, {Component} from 'react';
import LoginForm from './LoginForm.jsx';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="login-page">
        <LoginForm/>
      </div>
    );
  }
}
LoginPage.propTypes = {
};
