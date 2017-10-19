import React, {Component} from 'react';
import request from 'superagent';

export default class NewFormInput extends Component {
  constructor(props) {
    super(props);
    // this.handleUpdateForm = this.handleUpdateForm.bind(this);

    this.state = {
      date: "",
      venue: "",
      city: "",
      state: "",
      dos_contact: "",
      parking: "",
      load_in_time: "",
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
      w9: "",
	    stage_plot: "",
      input_list: "",
      hospitality_rider: ""
    }
  }

  // Needs to have this.props.new = true/false
  fxnToCheckIfEventIsNew(){

  }

  updateFromField(stateKey) {
    return (event) => {
      this.setState({[stateKey]: event.target.value});
    }
  }

 handleUpdateForm = (event) => {
 //needs to post to the DB and call an action for redux
  event.preventDefault();
  let userId = this.props.userId;
  let bandsId = this.props.bandsId;
   request
    .post(`https://ez-tour.herokuapp.com/users/${userId}/bands/${bandsId}/events`)
    .send({date: this.state.date,
    venue: this.state.venue,
    city: this.state.city,
    state: this.state.state,
    dos_contact: this.state.dos_contact,
    parking: this.state.parking,
    load_in_time: this.state.load_in_time,
    load_in_location: this.state.load_in_location,
    door_time: this.state.door_time,
    set_time: this.state.set_time,
    backline: this.state.backline,
    hospitality: this.state.hospitality,
    green_room: this.state.green_room,
    showers: this.state.showers,
    laundry: this.state.laundry,
    wifi: this.state.wifi,
    misc: this.state.misc})
    .set('Authorization', `Token token=${this.props.token}`)
    .end((err, res) =>{
      if(err) {
        this.setState({error: res.body.error});
      }else{
        //save the form
        this.props.setEventInfo();
      }
    })
 }


  render() {
    return (
      <div>
        <form onSubmit={this.handleUpdateForm}>
        <div className="form-group">
          <label htmlFor="date">Date of Event</label>
          <input className="form-control" onChange={this.updateFromField('date')}
            type="text" id="date" placeholder="Date of Event:" value={this.state.date}/>
        </div>
        <div className="form-group">
          <label htmlFor="venue">Venue Information</label>
          <input className="form-control" onChange={this.updateFromField('venue')}
            type="text" id="venue" placeholder="Name & Address of Venue:" value={this.state.venue}/>
        </div>
        <div className="form-group">
          <label htmlFor="dos_contact">Day of Event Contact</label>
          <input className="form-control"
            onChange={this.updateFromField('dos_contact')}
            type="text" id="dos_contact" placeholder="Venue Contact Name:"
            value={this.state.dos_contact}/>
        </div>
        <div className="form-group">
          <label htmlFor="dos_contact">Day of Event Contact Email</label>
          <input className="form-control"
            onChange={this.updateFromField('dos_contact_email')}
            type="text" id="dos_contact_email" placeholder="Venue Contact Email:"
            value={this.state.dos_contact_email}/>
        </div>
        <div className="form-group">
          <label htmlFor="parking">Parking Instructions</label>
          <input className="form-control"
            onChange={this.updateFromField('parking')} type="parking"
            id="parking" placeholder="Parking Instructions:" value={this.state.parking}/>
        </div>
        <div className="form-group">
          <label htmlFor="load_in_time">Load In</label>
          <input className="form-control"
            onChange={this.updateFromField('load_in_time')}
            type="text" id="load_in_time" placeholder="Load In:" value={this.state.load_in_time}/>
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
          <textarea className="form-control"
            onChange={this.updateFromField('misc')}
            type="text" id="misc" placeholder="Other Information needed for Day of Event & or questions for performers" value={this.state.misc}/>
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
NewFormInput.propTypes = {
};
