import React, {Component} from 'react';

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
      info: ''
    };
    this.handleAddToProfile = this.handleAddToProfile.bind(this);
    this.updateFromField = this.updateFromField.bind(this);
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
                </div>
              </div>
              <div>
                <button type="button" className="btn btn-primary">Submit</button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    )}
}



/* ProfileEnter.propTypes = {
}; */
