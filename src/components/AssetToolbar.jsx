import React, {Component} from 'react';

export default class AssetToolbar extends Component {

  render() {
    return (
      <div>
        <div class="form-group asset-toolbar" >
            <div class="card-block">
              <h4 class="card-title">Assets</h4>
              <p class="card-text"></p>
            </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><a href="https://www.irs.gov/pub/irs-pdf/fw9.pdf" download>w9</a></li>
                <li class="list-group-item"><a href="" class="card-link">Set Layout</a></li>
                <li class="list-group-item"><a href="" class="card-link">What other Assets should we include?</a></li>
              </ul>
        </div>
      </div>);
  }
}
AssetToolbar.propTypes = {
};
