import React, {PropTypes} from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='header'>
        <h4>EZ Tour</h4>
      </div>
    );
  }
}

Header.propTypes = {
};
