import React, {PropTypes} from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav class="navbar navbar-light bg-faded">
        <a class="navbar-brand" href="#">
          <img src="/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt=""/>
          <h3>EZ Tour</h3>
        </a>
      </nav>
    );
  }
}

Header.propTypes = {
};
