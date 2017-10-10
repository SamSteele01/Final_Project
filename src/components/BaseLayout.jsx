import React, {Component} from 'react';
import Header from './Header.jsx';

export default class BaseLayout extends Component {

  render() {
    return (
      <div>
        <Header/>
        {this.props.children}
      </div>
    );
  }
}

// BaseLayout.propTypes = {
// };
