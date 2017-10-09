import React, {PropTypes} from 'react';
import Logo from '../styles/two_tickets_white1600.png'

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav class="navbar navbar-light bg-faded">
        <a class="navbar-brand" >
          <img src={Logo} width="50" height="50" class="d-inline-block " alt=""/>
          EZ Tour
        </a>
      </nav>
    );
  }
}

Header.propTypes = {
};
