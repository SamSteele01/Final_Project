import React, {Component} from 'react';

export default class AssetToolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      userId: null,
      bandData: null
    }
  }

  componentWillMount(){
    this.setState({token: cookie.load('token'), userId: cookie.load('userId')}); //get token from cookie, if it exists
  }

  componentDidMount(){
    this.fetchAllDataForBand();
  }

  fetchAllDataForBand(){
    let userId = this.state.userId;
    let bandsId = this.props.bandsId;
    request
      .get(`https://ez-tour.herokuapp.com/users/${userId}/bands/${bandsId}`)
      .set('Authorization', `Token token=${this.state.token}`)
      .end((err, res) => {
        let data = res.body;
        this.setState({bandData: data});
      });
  }

// need error message, checkbox listener and pass up the url to parent, pass down already checked
  render() {
    return (
      <div>
        <div className="form-group asset-toolbar" >
            <div className="card-block">
              <h4 className="card-title">Assets</h4>
              <p className="card-text"></p>
            </div>
            <form>
              <img className='image-preview' src={this.state.bandData.w9} />
              <label className="checkbox-inline"><input type="checkbox" value=""/>  w9</label>
              <img className='image-preview' src={this.state.bandData.stage_plot} />
              <label className="checkbox-inline"><input type="checkbox" value=""/>  Stage Plot</label>
              <img className='image-preview' src={this.state.bandData.input_list} />
              <label className="checkbox-inline"><input type="checkbox" value=""/>  Input List</label>
              <img className='image-preview' src={this.state.bandData.hospitality_rider} />
              <label className="checkbox-inline"><input type="checkbox" value=""/>  Hospitality Rider</label>
            </form>
        </div>
      </div>);
  }
}
AssetToolbar.propTypes = {
  userId: propTypes.number,
  bandsId: propTypes.number
};
