import React, {Component} from 'react';
// import {bindAll} from 'lodash';
import request from 'superagent';
import cookie from 'react-cookies';
import ImageUploader from './ImageUploader.jsx';



export default class UserProfileEnter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      userId: null,
      full_name: null,
      telephone: null,
      email: null,
      avatar: null,
      // address: '',
      // city: '',
      // state: '',
      // zipcode: '',
      // website: '',
      // info: '',
      userInfo: null
    };
    this.handleAddToProfile = this.handleAddToProfile.bind(this);
    this.updateFromField = this.updateFromField.bind(this);
    // bindAll(this, 'handleFile', 'handleSubmit');
  }

  componentWillMount(){
    this.setState({token: cookie.load('token'), userId: cookie.load('userId')}); //get token from cookie, if it exists
  }

  componentDidMount(){
    this.getUserInfo();
  }

  updateFromField(stateKey) {
    return (event) => {
      this.setState({[stateKey]: event.target.value});
    }
  }

  getUserInfo(){
    let userId = this.state.userId;
    request
      .get(`https://ez-tour.herokuapp.com/users/${userId}`)
      .set('Authorization', `Token token=${this.state.token}`)
      .end((err, res) => {
        if(err) {
          this.setState({error: res.body.error});
        }
        if(res){
          this.setState({full_name: res.body.full_name,
          telephone: res.body.telephone,
          email: res.body.email,
          avatar: res.body.avatar})
        }
      });
  }

// may be posting to a user or a bands DB. Need to have a dynamic/conditional route
  handleAddToProfile(event){
    event.preventDefault();
    let userId = this.state.userId;
    request
      .patch(`https://ez-tour.herokuapp.com/users/${userId}`)
      .send({full_name: this.state.full_name, telephone: this.state.telephone, email: this.state.email, password: this.state.password})
      .set('Authorization', `Token token=${this.state.token}`)
      .end((err, res) => {
        if(err) {
          this.setState({error: res.body.error});
        }
        if(res){
          console.log(res);
          debugger
        }
      });
  }

  render() {
    return (
      <div>
        {this.state.full_name &&
        <div className="profile_enter_container">
          <form className="well form-horizontal" method="post"  id="contact_form">
            <fieldset>
              <legend>Update Your User Profile</legend>
                <div className="form-group">
                  <label className="col-md-4 control-label">Full Name</label>
                  <div className="col-md-4 inputGroupContainer">
                    <div className="input-group">
                      <span className="input-group-addon"><i className="glyphicon glyphicon-user" aria-hidden="true" ></i></span>
                      <input  name="full_name"
                        // placeholder={this.state.userInfo.full_name}
                        className="form-control"  type="text" onChange={this.updateFromField('full_name')} value={this.state.full_name}/>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-4 control-label" htmlFor="email">E-Mail</label>
                  <div className="col-md-4 inputGroupContainer">
                    <div className="input-group">
                      <span className="input-group-addon"><i className="glyphicon glyphicon-envelope"></i></span>
                      <input name="email"
                        // placeholder={this.state.userInfo.email}
                        className="form-control"  type="email" onChange={this.updateFromField('email')} value={this.state.email}/>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-4 control-label" htmlFor="phone">Phone #</label>
                  <div className="col-md-4 inputGroupContainer">
                    <div className="input-group">
                      <span className="input-group-addon"><i className="glyphicon glyphicon-earphone"></i></span>
                      <input name="phone"
                        // placeholder={this.state.userInfo.telephone}
                        className="form-control" type="tel" maxLength="14" onChange={this.updateFromField('telephone')} value={this.state.telephone}/>
                    </div>
                  </div>
                </div>
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
                </div> */}
                  {/* <div className="form-group    organization-info">
                    <span><label className="col-md-4  control-label info" htmlFor="info">Tell Us  About Your Organization</label></span>
                    <div className="col-md-4  inputGroupContainer">
                      <div className="input-group">
        	               <textarea className="form-control"  name="comment" placeholder="Organization  Description" rows="10" cols="50"  onChange={this.handleUpdateProfile}   value={this.state.info}></textarea>
                       </div>
                     </div>
                   </div> */}
                <div className="form-group">
                  <div className="col-md-4 inputGroupContainer">
                    <div className="input-group">
                      <button onClick={event => this.handleAddToProfile(event)} type="submit" className="btn btn-primary">Submit</button>
                    </div>
                  </div>
                </div>
                {/* <ul className="list-group list-group-flush band-profile-list">
                  <li className="list-group-item band-profile-list">
                  </li>
                </ul> */}
            </fieldset>
          </form>
          <ImageUploader targetKey={"avatar"} label={"Upload Photo"} currentImage={this.state.avatar}/>
        </div>
        }
      </div>

    )}
}
