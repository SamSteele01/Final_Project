import React, {Component} from 'react';
import ImageUploader from 'react-images-upload';
import request from 'superagent';
import cookie from 'react-cookies';

export default class UpdateBandProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      userId: null,
      name: '',
      vehicle: '',
      num_members: '',
      num_crew: '',
      avatars: [],
      w9: '',
      stage_plot: '',
      input_list: '',
      promo_asset: ''
    };
    this.handleUpdateBandProfile = this.handleUpdateBandProfile.bind(this);
    this.updateFromField = this.updateFromField.bind(this);
    this.onDrop = this.onDrop.bind(this);

  }

  componentDidMount(){
    this.setState({token: cookie.load('token')}); //get token from cookie, if it exists
    this.setState({userId: cookie.load('userId')}); //get token from cookie, if it exists
  }

  updateFromField(stateKey) {
    return (event) => {
      this.setState({[stateKey]: event.target.value});
    }
  }

// may be posting to a user or a bands DB. Need to have a dynamic/conditional route
handleUpdateBandProfile(){
  let userId = this.state.userId;
  let bandsId = this.props.bandsId;  // may not need as a param
  request
    .patch(`https://ez-tour.herokuapp.com/users/${userId}/bands/${bandsId}/events`)
    .send({

    })
    .set('Authorization', `Token token=${this.state.token}`)
    .end((err, res) => {

    });
}

  onDrop(avatar) {
        this.setState({
            avatars: this.state.avatars
        });
  }


  render() {
    return (
      <div>
        <div className="profile_enter_container">

          <form className="well form-horizontal" action=" " method="post"  id="contact_form" onSubmit={this.handleAddToProfile}>
            <fieldset>
              <legend>Update Band Profile</legend>
                <div className="form-group">
                  <label className="col-md-4 control-label">Name of Performer(s)</label>
                  <div className="col-md-4 inputGroupContainer">
                    <div className="input-group">
                      {/* <span className="input-group-addon"><i className="glyphicon glyphicon-user" aria-hidden="true" ></i></span> */}
                      <input  name="name" placeholder="Performer(s)" className="form-control"  type="text" onChange={this.updateFromField('name')}value={this.state.name}/>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-4 control-label" htmlFor="vehicle">Vehicle(s)</label>
                  <div className="col-md-4 inputGroupContainer">
                    <div className="input-group">
                      {/* <span className="input-group-addon"><i className="glyphicon glyphicon-envelope"></i></span> */}
                      <input name="vehicle" placeholder="Vehicle(s)" className="form-control"  type="text" onChange={this.updateFromField('vehicle')}value={this.state.vehicle}/>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-4 control-label" htmlFor="num_members">Number of Members</label>
                  <div className="col-md-4 inputGroupContainer">
                    <div className="input-group">
                      {/* <span className="input-group-addon"><i className="glyphicon glyphicon-earphone"></i></span> */}
                      <input name="num_members" placeholder="No. of Members" className="form-control" type="text" onChange={this.updateFromField('num_members')} value={this.state.num_members}/>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-4 control-label" htmlFor="num_crew">Number of Crew Members</label>
                  <div className="col-md-4 inputGroupContainer">
                    <div className="input-group">
                      {/* <span className="input-group-addon"><i className="glyphicon glyphicon-earphone"></i></span> */}
                      <input name="num_crew" placeholder="No. of Crew Members" className="form-control" type="text" onChange={this.updateFromField('num_crew')} value={this.state.num_crew}/>
                    </div>
                  </div>
                </div>
                <ul className="list-group list-group-flush band-profile-list">
                  <li className="list-group-item band-profile-list"><a href="https://www.irs.gov/pub/irs-pdf/fw9.pdf" class="card-link">w9</a></li>
                  <li className="list-group-item band-profile-list"><a href="" class="card-link">Stage Plot</a></li>
                  <li className="list-group-item band-profile-list"><a href="" class="card-link">Input List</a></li>
                  <li className="list-group-item band-profile-list"><a href="" class="card-link">Promos</a></li>
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
                  {/* <div className="image-upload">
                    <ImageUploader
                      withIcon={true}
                      buttonText='Choose image'
                      onChange={this.onDrop}
                      imgExtension={['.jpg', '.gif', '.png',  '.gif']}
                      maxFileSize={5242880}
                    />
                  </div> */}
                  {/* <div className="form-group    organization-info">
                    <span><label className="col-md-4  control-label info" htmlFor="info">Tell Us  About Your Organization</label></span>
                    <div className="col-md-4  inputGroupContainer">
                      <div className="input-group">
        	               <textarea className="form-control"  name="comment" placeholder="Organization  Description" rows="10" cols="50"  onChange={this.handleUpdateProfile}   value={this.state.info}></textarea>
                       </div>
                     </div>
                   </div> */}
                <div>
                  <button type="button" className="btn btn-primary profile-button">Submit</button>
                </div>
            </fieldset>
          </form>
        </div>
      </div>

    )}
}
