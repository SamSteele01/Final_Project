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
      full_name: '',
      telephone: '',
      email: '',
      password: '',
      // address: '',
      // city: '',
      // state: '',
      // zipcode: '',
      // website: '',
      // info: '',
      // data_uri: null,
      // processing: false
    };
    this.handleAddToProfile = this.handleAddToProfile.bind(this);
    this.updateFromField = this.updateFromField.bind(this);
    // bindAll(this, 'handleFile', 'handleSubmit');
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
      .patch(`https://ez-tour.herokuapp.com/users/${userId}`)
      .send({full_name: this.state.full_name, telephone: this.state.telephone, email: this.state.email, password: this.state.password})
      .set('Authorization', `Token token=${this.state.token}`)
      .end((err, res) => {
      });
  }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   // const _this = this;
  //   this.setState({
  //     processing: true
  //   });
  //   let userId = this.state.userId;
  //   request
  //     .patch(`https://ez-tour.herokuapp.com/users/${userId}`)
  //     .send({avatar: this.state.data_uri
  //       // filename: this.state.filename,
  //       // filetype: this.state.filetype
  //     })
  //     .set('Authorization', `Token token=${this.state.token}`)
  //     .end((err, res) => {
  //       if(err){
  //         console.log(err);
  //       }
  //       if(res){
  //         console.log(res);
  //         this.setState({
  //         processing: false,
  //         uploaded_uri: this.state.data_uri
  //         });
  //       }
  //     });
  // }


  // handleFile(e) {
  //   const reader = new FileReader();
  //   const file = e.target.files[0];
  //   reader.onload = (upload) => {
  //     this.setState({
  //       data_uri: upload.target.result,
  //       filename: file.name,
  //       filetype: file.type
  //     });
  //   };
  //   reader.readAsDataURL(file);
  // }

  render() {
    // let processing;
    // let uploaded;
    // if (this.state.uploaded_uri) {
    //   uploaded = (
    //     <div>
    //       <h4>Image uploaded!</h4>
    //       <img className='image-preview' src={this.state.uploaded_uri} />
    //       <pre className='image-link-box'>{this.state.uploaded_uri}</pre>
    //     </div>
    //   );
    // }
    // if (this.state.processing) {
    //   processing = "Processing image, hang tight";
    // }

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
                      <input  name="full_name" placeholder="Full Name" className="form-control"  type="text" onChange={this.updateFromField('full_name')}value={this.state.full_name}/>
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
                      <input name="phone" placeholder="(xxx) xxx-xxxx" className="form-control" type="tel" maxlength="12" onChange={this.updateFromField('phone')} value={this.state.phone}/>
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
                <div className="form-group">
                  <div className="col-md-4 inputGroupContainer">
                    <div className="input-group">
                      <button type="button" className="btn btn-primary">Submit</button>
                    </div>
                  </div>
                </div>
                <ul className="list-group list-group-flush band-profile-list">
                  <li className="list-group-item band-profile-list">
                    <ImageUploader targetKey={"avatar"} />
                  </li>
                </ul>
            </fieldset>
          </form>
          {/* <form className="well form-horizontal" action=" " method="post"  id="contact_form" onSubmit={this.handleImageUpload}>
            <div className="form-group">
              <label className="col-md-4 control-label" htmlFor="website">Website or domain name</label>
              <div className="col-md-4 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-globe"></i></span>
                  <input name="avatar"
                    id="upload" ref="upload" accept="image/*"
                    // placeholder="Upload avatar"
                    className="form-control"
                    encType="multipart/form-data"
                    type="file"
                    onClick={(event)=> {event.target.value = null}}
                    onChange={(event)=> {this.readFile(event)}}
                    // value={this.state.avatar}
                  />
                </div>
              </div>
            </div>
          </form> */}
          {/* <div className='row'>
            <div className='col-sm-12'>
              <label>Upload an image</label>
              <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                <input type="file" onChange={this.handleFile} />
                <input disabled={this.state.processing} className='btn btn-primary' type="submit" value="Upload" />
                {processing}
              </form>
              {uploaded}
            </div>
          </div> */}
        </div>
      </div>

    )}
}
