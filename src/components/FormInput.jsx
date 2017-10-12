import React, {Component} from 'react';

export default class FormInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullname: "",
      date: "",
      city: "",
      state: "",
      dos_contact: "",
      parking: "",
      load_in: "",
      load_in_location: "",
      door_time: "",
      set_time: "",
      backline: "",
      hospitality: "",
      green_room: "",
      showers: "",
      laundry: "",
      wifi: "",
      misc: "",
    }
  }

  updateFromField(stateKey) {
    return (event) => {
      this.setState({[stateKey]: event.target.value});
    }
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>
          <input className="form-control" onChange={this.updateFromField('fullname')} type="text" id="fullname" placeholder="Fullname:" value={this.state.fullname}/>
        </div>
        <div className="form-group">
          <label htmlFor="phonenumber">Phone Number</label>
          <input className="form-control"
            onChange={this.updateFromField('phonenumber')}
            type="text" id="phonenumber" placeholder="Phone number:" value={this.state.phonenumber}/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input className="form-control" onChange={this.updateFromField('email')} type="email" id="email" placeholder="Email:" value={this.state.email}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input className="form-control"
            onChange={this.updateFromField('password')}
            type="text" id="password" placeholder="Password:" value={this.state.password}/>
        </div>
      </div>);
  }
}
FormInput.propTypes = {
};
