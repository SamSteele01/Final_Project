import React, {Component} from 'react';
import AssetToolbar from './AssetToolbar.jsx';

export default class AssetContainer extends React.Component {


// displays assets (images, pdfs..) each with a download button across the top of the page

  render() {
    return (
      <div>
        {/* <h2>Asset Container!!</h2> */}
        <AssetToolbar/>
      </div>
    );
  }
}

AssetContainer.propTypes = {
};
