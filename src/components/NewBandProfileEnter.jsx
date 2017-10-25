import React, {Component} from 'react';
import ImageUploader from './ImageUploader.jsx';
import request from 'superagent';
import cookie from 'react-cookies';

export default class BandProfileEnter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      userId: null,
      name: '',
      vehicle: '',
      num_members: '',
      num_crew: '',
      // email: '',
      // phone: '',
      // address: '',
      // city: '',
      // state: '',
      // zipcode: '',
      // website: '',
      // info: '',
      avatar: [],
      w9: '',
      stage_plot: '',
      input_list: '',
      promo_asset: ''
    };
    this.handleAddToProfile = this.handleAddToProfile.bind(this);
    this.updateFromField = this.updateFromField.bind(this);
    // this.onDrop = this.onDrop.bind(this);
    // this.handleUpdateBandProfile = this.handleUpdateBandProfile.bind(this);
  }

  componentWillMount(){
    this.setState({token: cookie.load('token')}); //get token from cookie, if it exists
    this.setState({userId: cookie.load('userId')}); //get token from cookie, if it exists
  }

  updateFromField(stateKey) {
    return (event) => {
      this.setState({[stateKey]: event.target.value});
    }
  }

// may be posting to a user or a bands DB. Need to have a dynamic/conditional route
  handleAddToProfile(){
    let userId = this.state.userId;
    request
      .post(`https://ez-tour.herokuapp.com/users/${userId}/bands`)
      .send({
        name: this.state.name,
        vehicle: this.state.vehicle,
        num_members: this.state.num_members,
        num_crew: this.state.num_crew,
      })
      .set('Authorization', `Token token=${this.state.token}`)
      .end((err, res) => {
        console.log(err);
        console.log(res);
      });
  }

  render() {
    return (
      <div>
        <div className="profile_enter_container">

          <form >
            <fieldset>
              <legend>Create a New Band Profile</legend>
                <div className="form-group">
                  <label className="col-md-4 control-label">Name of Act:</label>
                  <div className="col-md-4 inputGroupContainer">
                    <div className="input-group">
                      {/* <span className="input-group-addon"><i className="glyphicon glyphicon-user" aria-hidden="true" ></i></span> */}
                      <input  name="name" placeholder="e.g. Rush, Sara Watkins, Death Cab for Cutie" className="form-control"  type="text" onChange={this.updateFromField('name')}value={this.state.name}/>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-4 control-label" htmlFor="vehicle">Traveling in:</label>
                  <div className="col-md-4 inputGroupContainer">
                    <div className="input-group">
                      {/* <span className="input-group-addon"><i className="glyphicon glyphicon-envelope"></i></span> */}
                      <input name="vehicle" placeholder="e.g Ford E-350" className="form-control"  type="text" onChange={this.updateFromField('vehicle')}value={this.state.vehicle}/>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-4 control-label" htmlFor="num_members">Number of members:</label>
                  <div className="col-md-4 inputGroupContainer">
                    <div className="input-group">
                      {/* <span className="input-group-addon"><i className="glyphicon glyphicon-earphone"></i></span> */}
                      <input name="num_members" className="form-control" type="text" onChange={this.updateFromField('num_members')} value={this.state.num_members}/>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-4 control-label" htmlFor="num_crew">Number of crew:</label>
                  <div className="col-md-4 inputGroupContainer">
                    <div className="input-group">
                      {/* <span className="input-group-addon"><i className="glyphicon glyphicon-earphone"></i></span> */}
                      <input name="num_crew" className="form-control" type="text" onChange={this.updateFromField('num_crew')} value={this.state.num_crew}/>
                    </div>
                  </div>
                </div>
                <div>
                  <button onClick={this.handleAddToProfile} type="button" className="btn btn-primary ">Submit</button>
                </div>
              </fieldset>
            </form>
            <ul class="list-group list-group-flush band-profile-list">
              <li class="list-group-item band-profile-list">
                <ImageUploader targetKey={"w9"} label={"Upload your W-9:"}/>
              </li>
              <li className="list-group-item band-profile-list">
                {/* <a href="" className="card-link">Stage Plot</a> */}
                <ImageUploader targetKey={"stage_plot"} label={"Upload your Stage Plot pdf"}/>
              </li>
              <li className="list-group-item band-profile-list">
                {/* <a href="" className="card-link">Input List</a> */}
                <ImageUploader targetKey={"input_list"} label={"Upload your Input List pdf"}/>
              </li>
              <li className="list-group-item band-profile-list">
                {/* <a href="" className="card-link">Promos</a> */}
                <ImageUploader targetKey={"hospitality_rider"} label={"Upload your Hospitality Rider pdf"}/>
              </li>
            </ul>
            {/* <div className="form-group">
              <label className="col-md-4 control-label" htmlFor="address">Address</label>
              <div className="col-md-4 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-home"></i></span>
                  <input name="address" placeholder="Address" className="form-control" type="text" onChange={this.updateFromField('address')}value={this.state.address}/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-4 control-label" htmlFor="city">City</label>
              <div className="col-md-4 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-home"></i></span>
                  <input name="city" placeholder="City" className="form-control"  type="text" onChange={this.updateFromField('city')}value={this.state.city}/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-4 control-label" htmlFor="state">State</label>
              <div className="col-md-4 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-list"></i></span>
                  <input name="State" placeholder="State"className="form-control" type="text" onChange={this.updateFromField('state')}value={this.state.state}/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-4 control-label" htmlFor="zipcode">Zip Code</label>
              <div className="col-md-4 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-home"></i></span>
                  <input name="zip" placeholder="Zip Code" className="form-control"  type="text" onChange={this.updateFromField('zipcode')}value={this.state.zipcode}/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-4 control-label" htmlFor="website">Website or domain name</label>
              <div className="col-md-4 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-globe"></i></span>
                  <input name="website" placeholder="Website or domain name" className="form-control" type="text" onChange={this.updateFromField('website')}value={this.state.website}/>
                </div>
              </div>
            </div> */}
              {/* <div className="form-group    organization-info">
                <span><label className="col-md-4  control-label info" htmlFor="info">Tell Us  About Your Organization</label></span>
                <div className="col-md-4  inputGroupContainer">
                  <div className="input-group">
    	               <textarea className="form-control"  name="comment" placeholder="Organization  Description" rows="10" cols="50"  onChange={this.handleUpdateProfile}   value={this.state.info}></textarea>
                   </div>
                 </div>
               </div> */}
        </div>
      </div>

    )}
}
