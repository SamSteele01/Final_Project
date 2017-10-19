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
            <form>
              <label class="checkbox-inline"><input type="checkbox" value="<a href=https://www.irs.gov/pub/irs-pdf/fw9.pdf" download/>  w9</label>
              <label class="checkbox-inline"><input type="checkbox" value=""/>  Stage Plot</label>
              <label class="checkbox-inline"><input type="checkbox" value=""/>  Input List</label>
              <label class="checkbox-inline"><input type="checkbox" value=""/>  Hospitality Rider</label>
            </form>
              {/* <ul class="list-group list-group-flush">
                <li class="list-group-item"><a href="https://www.irs.gov/pub/irs-pdf/fw9.pdf" download>w9</a></li>
                <li class="list-group-item"><a href="" class="card-link" download>Stage Plot</a></li>
                <li class="list-group-item"><a href="" class="card-link" download>Input List</a></li>
                <li class="list-group-item"><a href="" class="card-link" download>Hospitality Rider</a></li>
              </ul> */}
        </div>
      </div>);
  }
}
AssetToolbar.propTypes = {
};
