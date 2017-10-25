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
      name: null,
      vehicle: null,
      num_members: null,
      num_crew: null,
      // email: null,
      // phone: null,
      // address: null,
      // city: null,
      // state: null,
      // zipcode: null,
      // website: null,
      // info: null,
      w9: null,
      stage_plot: null,
      input_list: null,
      hospitality_rider: null
    };
    this.handleAddToProfile = this.handleAddToProfile.bind(this);
    this.updateFromField = this.updateFromField.bind(this);
  }

  componentWillMount(){
    this.setState({token: cookie.load('token'), userId: cookie.load('userId')}); //get token from cookie, if it exists
  }

  componentDidMount(){
    this.getBandInfo();
  }

  updateFromField(stateKey) {
    return (event) => {
      this.setState({[stateKey]: event.target.value});
    }
  }

  getBandInfo(){
    let userId = this.state.userId;
    let bandsId = this.props.bandsId;
    request
      .get(`https://ez-tour.herokuapp.com/users/${userId}/bands/${bandsId}`)
      .set('Authorization', `Token token=${this.state.token}`)
      .end((err, res) => {
        if(err) {
          this.setState({error: res.body.error});
        }
        if(res){
          this.setState({
            name: res.body.name,
            vehicle: res.body.vehicle,
            num_members: res.body.num_members,
            num_crew: res.body.num_crew,
            // email: res.body.email,
            // phone: res.body.,
            // address: res.body.address,
            // city: res.body.city,
            // state: res.body.state,
            // zipcode: res.body.zipcode,
            // website: res.body.website,
            // info: res.body.info,
            w9: res.body.w9,
            stage_plot: res.body.stage_plot,
            input_list: res.body.input_list,
            hospitality_rider: res.body.hospitality_rider
          })
        }
      });
  }

// may be posting to a user or a bands DB. Need to have a dynamic/conditional route
  handleAddToProfile(){
    let userId = this.state.userId;
    let bandsId = this.props.bandsId;  // may not need as a param
    request
      .patch(`https://ez-tour.herokuapp.com/users/${userId}/bands/${bandsId}`)
      .send({
        name: this.state.name,
        vehicle: this.state.vehicle,
        num_members: this.state.num_members,
        num_crew: this.state.num_crew
        // email: this.state.email,
        // phone: this.state.phone,
        // address: this.state.address,
        // city: this.state.city,
        // state: this.state.state,
        // zipcode: this.state.zipcode,
        // website: this.state.website,
        // info: this.state.info
      })
      .set('Authorization', `Token token=${this.state.token}`)
      .end((err, res) => {
        if(err) {
          this.setState({error: res.body.error});
        }
        if(res){
          console.log(res);
        }
      });
  }

  render() {
    return (
      <div>
        {this.state.name &&
        <div className="profile_enter_container">
          <form className="well form-horizontal" method="post"  id="contact_form">
            <fieldset>
              <legend>Update Your Band Profile</legend>
                <div className="form-group">
                  <label className="col-md-4 control-label">Name of Performer(s):</label
                  <div className="col-md-4 inputGroupContainer">
                    <div className="input-group">
                      {/* <span className="input-group-addon"><i className="glyphicon glyphicon-user" aria-hidden="true" ></i></span> */}
                      <input  name="name" placeholder="Performer(s)" className="form-control"  type="text" onChange={this.updateFromField('name')}value={this.state.name}/>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-4 control-label" htmlFor="vehicle">Traveling in:</label>
                  <div className="col-md-4 inputGroupContainer">
                    <div className="input-group">
                      {/* <span className="input-group-addon"><i className="glyphicon glyphicon-envelope"></i></span> */}
                      <input name="vehicle" placeholder="Traveling in" className="form-control"  type="text" onChange={this.updateFromField('vehicle')}value={this.state.vehicle}/>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-4 control-label" htmlFor="num_members">Number of Members:</label
                  <div className="col-md-4 inputGroupContainer">
                    <div className="input-group">
                      {/* <span className="input-group-addon"><i className="glyphicon glyphicon-earphone"></i></span> */}
                      <input name="num_members" placeholder="No. of Members" className="form-control" type="text" onChange={this.updateFromField('num_members')} value={this.state.num_members}/>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-4 control-label" htmlFor="num_crew">Number of Crew Members:</label
                  <div className="col-md-4 inputGroupContainer">
                    <div className="input-group">
                      {/* <span className="input-group-addon"><i className="glyphicon glyphicon-earphone"></i></span> */}
                      <input name="num_crew" placeholder="No. of Crew Members" className="form-control" type="text" onChange={this.updateFromField('num_crew')} value={this.state.num_crew}/>
                    </div>
                  </div>
                </div>
                <div>
                  <button onClick={this.handleAddToProfile} type="button" className="btn btn-primary ">Submit</button>
                </div>
              </fieldset>
            </form>
            <ul className="list-group list-group-flush band-profile-list">
              <li className="list-group-item band-profile-list">
                <a href="https://www.irs.gov/pub/irs-pdf/fw9.pdf" className="card-link">Link to a new w9</a>
              </li>
              <li className="list-group-item band-profile-list">
                <ImageUploader targetKey={"w9"} label={"Upload your w9 pdf"} bandsId={this.props.bandsId} currentImage={this.state.w9}/>
              </li>
              <li className="list-group-item band-profile-list">
                {/* <a href="" className="card-link">Stage Plot</a> */}
                <ImageUploader targetKey={"stage_plot"} label={"Upload your Stage Plot pdf"} bandsId={this.props.bandsId} currentImage={this.state.stage_plot}/>
              </li>
              <li className="list-group-item band-profile-list">
                {/* <a href="" className="card-link">Input List</a> */}
                <ImageUploader targetKey={"input_list"} label={"Upload your Input List pdf"} bandsId={this.props.bandsId} currentImage={this.state.input_list}/>
              </li>
              <li className="list-group-item band-profile-list">
                {/* <a href="" className="card-link">Promos</a> */}
                <ImageUploader targetKey={"hospitality_rider"} label={"Upload your Hospitality Rider pdf"} bandsId={this.props.bandsId} currentImage={this.state.hospitality_rider}/>
              </li>
            </ul>
            {/* <div className="form-group">
              <label className="col-md-4 control-label" htmlFor="address">Address:</label
              <div className="col-md-4 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-home"></i></span>
                  <input name="address" placeholder="Address" className="form-control" type="text" onChange={this.updateFromField('address')}value={this.state.address}/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-4 control-label" htmlFor="city">City:</label
              <div className="col-md-4 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-home"></i></span>
                  <input name="city" placeholder="City" className="form-control"  type="text" onChange={this.updateFromField('city')}value={this.state.city}/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-4 control-label" htmlFor="state">State:</label
              <div className="col-md-4 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-list"></i></span>
                  <input name="State" placeholder="State"className="form-control" type="text" onChange={this.updateFromField('state')}value={this.state.state}/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-4 control-label" htmlFor="zipcode">Zip Code:</label
              <div className="col-md-4 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-home"></i></span>
                  <input name="zip" placeholder="Zip Code" className="form-control"  type="text" onChange={this.updateFromField('zipcode')}value={this.state.zipcode}/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-4 control-label" htmlFor="website">Website or domain name:</label
              <div className="col-md-4 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-globe"></i></span>
                  <input name="website" placeholder="Website or domain name" className="form-control" type="text" onChange={this.updateFromField('website')}value={this.state.website}/>
                </div>
              </div>
            </div> */}
              {/* <div className="form-group    organization-info">
                <span><label className="col-md-4  control-label info" htmlFor="info">Tell Us  About Your Organization:</label</span>
                <div className="col-md-4  inputGroupContainer">
                  <div className="input-group">
    	               <textarea className="form-control"  name="comment" placeholder="Organization  Description" rows="10" cols="50"  onChange={this.handleUpdateProfile}   value={this.state.info}></textarea>
                   </div>
                 </div>
               </div> */}
        </div>
        }
      </div>

    )}
}
