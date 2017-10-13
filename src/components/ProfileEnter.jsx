import React, {Component} from 'react';
import ImageUploader from 'react-images-upload';

export default class ProfileEnter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      website: '',
      info: '',
      pictures: [],
    };
    this.handleAddToProfile = this.handleAddToProfile.bind(this);
    this.updateFromField = this.updateFromField.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  updateFromField(stateKey) {
    return (event) => {
      this.setState({[stateKey]: event.target.value});
    }
  }

  handleAddToProfile = (e) => {
    e.preventDefault();
    let profileItem = JSON.stringify(this.state);
    this.setState({ name: e.target.value, email: e.target.value, phone: e.target.value, address: e.target.value, city: e.target.value, state: e.target.value, zipcode: e.target.value, website: e.target.value, info: e.target.value});
    // fetch("https://ez-tour.herokuapp.com/users",
    //         {
    //           method: "POST",
    //           body: profileItem,
    //           headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json'
    //           }
    //         }
    //   ).then(response => {
    //     console.log(response, "yay");
    //     this.setState({name: '', email: '', phone: '', address:'', city:'', state:'', zipcode:'', website:'', info:''});
    //   }).catch(err => {
    //     console.log(err, "boo!");
    //   });
  }

  onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
  }

  render() {
    return (
      <div>
        <div className="profile_enter_container">

          <form className="well form-horizontal" action=" " method="post"  id="contact_form" onSubmit={this.handleAddToProfile}>
            <fieldset>
              <legend>Create a User Profile</legend>
              <div className="form-group">
                <label className="col-md-4 control-label">Full Name</label>
                <div className="col-md-4 inputGroupContainer">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="glyphicon glyphicon-user" aria-hidden="true" ></i></span>
                    <input  name="fullname" placeholder="Full Name" className="form-control"  type="text" onChange={this.updateFromField('name')}value={this.state.name}/>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="email">E-Mail</label>
                <div className="col-md-4 inputGroupContainer">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="glyphicon glyphicon-envelope"></i></span>
                    <input name="email" placeholder="E-Mail Address" className="form-control"  type="text" onChange={this.updateFromField('email')}value={this.state.email}/>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="phone">Phone #</label>
                <div className="col-md-4 inputGroupContainer">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="glyphicon glyphicon-earphone"></i></span>
                    <input name="phone" placeholder="(xxx) xxx-xxxx" className="form-control" type="text" onChange={this.updateFromField('phone')} value={this.state.phone}/>
                  </div>
                </div>
              </div>
              <div className="form-group">
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
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="info">Tell Us About Your Organization</label>
                <div className="col-md-4 inputGroupContainer">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="glyphicon glyphicon-pencil"></i></span>
	                   <textarea className="form-control" name="comment" placeholder="Organization Description" rows="10" cols="50" onChange={this.updateFromField('info')}value={this.state.info}></textarea>
                  </div>

                  <div className="form-group">
                    <label className="col-md-4 control-label" htmlFor="address">Address</label>
                    <div className="col-md-4 inputGroupContainer">
                      <div className="input-group">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-home"></i></span>
                        <input name="address" placeholder="Address" className="form-control" type="text" onChange={this.handleUpdateProfile} value={this.state.address}/>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="col-md-4 control-label" htmlFor="city">City</label>
                      <div className="col-md-4 inputGroupContainer">
                        <div className="input-group">
                          <span className="input-group-addon"><i className="glyphicon glyphicon-home"></i></span>
                          <input className="city" placeholder="City" className="form-control"  type="text" onChange={this.handleUpdateProfile} value={this.state.city}/>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="state">State</label>
                        <div className="col-md-4 inputGroupContainer">
                          <div className="input-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-list"></i></span>
                            <input className="State" placeholder="State"className="form-control" type="text" onChange={this.handleUpdateProfile} value={this.state.state}/>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="zipcode">Zip Code</label>
                        <div className="col-md-4 inputGroupContainer">
                          <div className="input-group">
                            <span className="input-group-addon"><i class="glyphicon glyphicon-home"></i></span>
                            <input nameName="zip" placeholder="Zip Code" className="form-control"  type="text" onChange={this.handleUpdateProfile} value={this.state.zipcode}/>
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <label className="col-md-4 control-label" htmlFor="website">Website or domain name</label>
                        <div className="col-md-4 inputGroupContainer">
                          <div className="input-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-globe"></i></span>
                            <input nameName="website" placeholder="Website or domain name" className="form-control" type="text" onChange={this.handleUpdateProfile} value={this.state.website}/>
                          </div>
                        </div>
                      </div>
                      <div className="image-upload">
                        <ImageUploader
                          withIcon={true}
                          buttonText='Choose image'
                          onChange={this.onDrop}
                          imgExtension={['.jpg', '.gif', '.png', '.gif']}
                          maxFileSize={5242880}
                        />
                      </div>
                      <div className="form-group organization-info">
                        <span><label className="col-md-4 control-label info" htmlFor="info">Tell Us About Your Organization</label></span>
                        <div className="col-md-4 inputGroupContainer">
                          <div className="input-group">
        	                   <textarea className="form-control" name="comment" placeholder="Organization Description" rows="10" cols="50" onChange={this.handleUpdateProfile} value={this.state.info}></textarea>
                           </div>
                         </div>
                       </div>
                       <div>
                         <button type="button" class="btn btn-primary profile-button">Submit</button>
                       </div>
                    </div>
                  </div>   
            </fieldset>
          </form>
        </div>
      </div>
    )}
}



/* ProfileEnter.propTypes = {
}; */
