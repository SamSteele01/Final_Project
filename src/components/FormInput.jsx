import React, {Component} from 'react';

export default class FormInput extends Component {
  constructor(props) {
    super(props);
    // this.handleUpdateForm = this.handleUpdateForm.bind(this);

    this.state = {
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

 // handleUpdateForm = (e) => {
 //   event.preventDefault();
 //   request
 //    .post('https://ez-tour.herokuapp.com/users/events')
 //    .send({})
 //    .end((err, res) =>{
 //      if(err) {
 //        this.setState({error: res.body.error});
 //      }else{
 //        //save the form
 //      }
 //    })
 // }


  render() {
    return (
      <div>
        <form onSubmit={this.handleUpdateForm}>
        <div className="form-group">
          <label htmlFor="date">Date of Event</label>
          <input className="form-control" onChange={this.updateFromField('date')}
            type="text" id="date" placeholder="Date of Event:" value={this.state.event}/>
        </div>
        <div className="form-group">
          <label htmlFor="dos_contact">Day of Event Contact</label>
          <input className="form-control"
            onChange={this.updateFromField('dos_contact')}
            type="text" id="dos_contact" placeholder="Venue Contact:"
            value={this.state.dos_contact}/>
        </div>
        <div className="form-group">
          <label htmlFor="parking">Parking Instructions</label>
          <input className="form-control"
            onChange={this.updateFromField('parking')} type="parking"
            id="parking" placeholder="Parking Instructions:" value={this.state.parking}/>
        </div>
        <div className="form-group">
          <label htmlFor="load_in">Load In</label>
          <input className="form-control"
            onChange={this.updateFromField('load_in')}
            type="text" id="load_in" placeholder="Load In:" value={this.state.load_in}/>
        </div>
        <div className="form-group">
          <label htmlFor="load_in_location">Load In Location</label>
          <input className="form-control"
            onChange={this.updateFromField('load_in_location')} type="text"
             id="load_in_location" placeholder="Load In Location:"
             value={this.state.load_in_location}/>
        </div>
        <div className="form-group">
          <label htmlFor="door_time">Door Time</label>
          <input className="form-control"
            onChange={this.updateFromField('door_time')}
            type="text" id="door_time" placeholder="Door Time:" value={this.state.door_time}/>
        </div>
        <div className="form-group">
          <label htmlFor="set_time">Set Time</label>
          <input className="form-control" onChange={this.updateFromField('set_time')}
            type="text" id="set_time" placeholder="Set Time:" value={this.state.set_time}/>
        </div>
        <div className="form-group">
          <label htmlFor="backline">Back Line</label>
          <input className="form-control"
            onChange={this.updateFromField('backline')}
            type="text" id="backline" placeholder="Back Line:" value={this.state.backline}/>
        </div>
        <div className="form-group">
          <label htmlFor="hospitality">Hospitality</label>
          <input className="form-control" onChange={this.updateFromField('hospitality')}
            type="text" id="hospitality" placeholder="Hospitality Offered:" value={this.state.hospitality}/>
        </div>
        <div className="form-group">
          <label htmlFor="green_room">Green Room</label>
          <input className="form-control"
            onChange={this.updateFromField('green_room')}
            type="text" id="green_room" placeholder="Green Room Availability:" value={this.state.green_room}/>
        </div>
        <div className="form-group">
          <label htmlFor="showers">Showers</label>
          <input className="form-control" onChange={this.updateFromField('showers')}
            type="text" id="showers" placeholder="Shower Availability:" value={this.state.showers}/>
        </div>
        <div className="form-group">
          <label htmlFor="laundry">Laundry</label>
          <input className="form-control"
            onChange={this.updateFromField('laundry')}
            type="text" id="laundry" placeholder="Laundry Availability:" value={this.state.laundry}/>
        </div>
        <div className="form-group">
          <label htmlFor="wifi">Wifi Information</label>
          <input className="form-control" onChange={this.updateFromField('wifi')} type="text"
             id="wifi" placeholder="Wifi Information:" value={this.state.wifi}/>
        </div>
        <div className="form-group">
          <label htmlFor="misc">Miscellaneous</label>
          <input className="form-control"
            onChange={this.updateFromField('misc')}
            type="text" id="misc" placeholder="Other Information needed for Day of Event:" value={this.state.misc}/>
        </div>


        <div className="form-group">
          <button onClick={event => this.submit(event)} type="submit" className="btn btn-success">Save & Submit</button>
        {/* </div>
        <div className="form-group"> */}
          <button onClick={event => this.submit(event)} type="submit" className="btn btn-success">Email Form</button>
        </div>
        </form>
      </div>);
  }
}
FormInput.propTypes = {
};
