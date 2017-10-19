import React, {Component} from 'react';

export default class AssetToolbar extends Component {

  render() {
    return (
      <div>
        <div className="form-group asset-toolbar" >
            <div className="card-block">
              <h4 className="card-title">Assets</h4>
              <p className="card-text"></p>
            </div>
            <form>
              <label className="checkbox-inline"><input type="checkbox" value="<a href=https://www.irs.gov/pub/irs-pdf/fw9.pdf" download/>  w9</label>
              <label className="checkbox-inline"><input type="checkbox" value=""/>  Stage Plot</label>
              <label className="checkbox-inline"><input type="checkbox" value=""/>  Input List</label>
              <label className="checkbox-inline"><input type="checkbox" value=""/>  Hospitality Rider</label>
            </form>
        </div>
      </div>);
  }
}
AssetToolbar.propTypes = {
};
