import React, {Component} from 'react';
import request from 'superagent';
import cookie from 'react-cookies';

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
    console.log("Loading AssetToolbar. BandsId is: "+this.props.bandsId);
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
        console.log(res);
        let data = res.body;
        this.setState({bandData: data});
      });
  }

// need error message, checkbox listener/toggle: pass up the url to parent, pass down already checked
  render() {
    return (
      <div>
        <div className="asset-toolbar" >
            <div>
              <h4 className="card-title">Assets</h4>
              <p className="card-text">These will be attached in the email</p>
            </div>
            {this.state.bandData &&
              <form className="d-flex justify-content-around">
                <div className="d-flex image-object">
                  <object className='image-preview img-thumbnail' data={this.state.bandData.w9} />
                  <label className="checkbox-inline">
                    {/* <input type="checkbox"
                      // value={value}
                      // checked={this.props.filter === value}
                      // onChange={event => this.props.setImagesToSend(value)}
                    />   */}
                    W9
                  </label>
                </div>
                <div className="d-flex image-object">
                  <object className='image-preview img-thumbnail' data={this.state.bandData.stage_plot} />
                  <label className="checkbox-inline">
                    {/* <input type="checkbox"
                      // value={value}
                      // checked={this.props.filter === value}
                      // onChange={event => this.props.setImagesToSend(value)}
                    />   */}
                    Stage Plot
                  </label>
                </div>
                <div className="d-flex image-object">
                  <object className='image-preview img-thumbnail' data={this.state.bandData.input_list} />
                  <label className="checkbox-inline">
                    {/* <input type="checkbox"
                      // value={value}
                      // checked={this.props.filter === value}
                      // onChange={event => this.props.setImagesToSend(value)}
                    />   */}
                    Input List
                  </label>
                </div>
                <div className="d-flex image-object">
                  <object className='image-preview img-thumbnail' data={this.state.bandData.hospitality_rider} />
                  <label className="checkbox-inline">
                    {/* <input type="checkbox"
                      // value={value}
                      // checked={this.props.filter === value}
                      // onChange={event => this.props.setImagesToSend(value)}
                    />   */}
                    Hospitality Rider
                  </label>
                </div>
              </form>
            }
        </div>
      </div>);
  }
}
AssetToolbar.propTypes = {
  // userId: propTypes.number,
  // bandsId: propTypes.number
};
