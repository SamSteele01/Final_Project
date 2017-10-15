// component
import React, {Component} from 'react';
import LoginForm from './LoginForm.jsx';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row justify-content-sm-center">
        <div className="col-auto">
        </div>
        <div className="col-sm-8 col-md-6">
          <LoginForm/>
        </div>
        <div className="col-auto">
        </div>
      </div>
    );
  }
}
LoginPage.propTypes = {
};
