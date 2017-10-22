// container
import React, {Component} from 'react';
import request from 'superagent';
import cookie from 'react-cookies';
import AssetToolbar from './AssetToolbar.jsx';

export default class FormInput extends Component {
  constructor(props) {
    super(props);
    this.setUsedImages = this.setUsedImages.bind(this);

    this.state = {
      date: this.props.placeholders.date,
      venue: this.props.placeholders.venue,
      city: this.props.placeholders.city,
      state: this.props.placeholders.state,
      dos_contact: this.props.placeholders.dos_contact,
      parking: this.props.placeholders.parking,
      load_in_time: this.props.placeholders.load_in_time,
      load_in_location: this.props.placeholders.load_in_location,
      door_time: this.props.placeholders.door_time,
      set_time: this.props.placeholders.set_time,
      backline: this.props.placeholders.backline,
      hospitality: this.props.placeholders.hospitality,
      green_room: this.props.placeholders.green_room,
      showers: this.props.placeholders.showers,
      laundry: this.props.placeholders.laundry,
      wifi: this.props.placeholders.wifi,
      misc: this.props.placeholders.misc,
      w9: this.props.placeholders.w9,
	    stage_plot: this.props.placeholders.stage_plot,
      input_list: this.props.placeholders.input_list,
      hospitality_rider: this.props.placeholders.hospitality_rider
    }
  }

  componentWillMount(){
    this.setState({token: cookie.load('token'), userId: cookie.load('userId')}); //get token from cookie, if it exists
    console.log("Loading FormInput. BandsId is: "+this.props.bandsId);
  }

  updateFromField(stateKey) {
    return (event) => {
      this.setState({[stateKey]: event.target.value});
    }
  }

  setUsedImages(){

  }

 handleUpdateForm = (event) => {
 //needs to post to the DB and call an action for redux
  event.preventDefault();
  let userId = this.state.userId;
  let bandsId = this.props.bandsId;
   request
    .patch(`https://ez-tour.herokuapp.com/users/${userId}/bands/${bandsId}/events`)
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
    misc: this.state.misc,
    w9: "",
    stage_plot: "",
    input_list: "",
    hospitality_rider: ""
    })
    .set('Authorization', `Token token=${this.state.token}`)
    .end((err, res) =>{
      if(err) {
        this.setState({error: res.body.error});
      }else{

      }
    })
 }

  render() {
    return (
      <div>
        <AssetToolbar bandsId={this.props.bandsId} setUsedImages={this.setUsedImages}/>
        {this.props.placeholders &&
        <form onSubmit={this.handleUpdateForm}>
        <div className="form-group">
          <label htmlFor="date">Date of Event</label>
          <input className="form-control" onChange={this.updateFromField('date')}
            type="text" id="date" placeholder={this.props.placeholders.date} value={this.state.date}/>
        </div>
        <div className="form-group">
          <label htmlFor="venue">Venue Information</label>
          <input className="form-control" onChange={this.updateFromField('venue')}
            type="text" id="venue" placeholder={this.props.placeholders.venue} value={this.state.venue}/>
        </div>
        <div className="form-group">
          <label htmlFor="dos_contact">Day of Event Contact</label>
          <input className="form-control"
            onChange={this.updateFromField('dos_contact')}
            type="text" id="dos_contact" placeholder={this.props.placeholders.dos_contact}
            value={this.state.dos_contact}/>
        </div>
        <div className="form-group">
          <label htmlFor="dos_contact">Day of Event Contact Email</label>
          <input className="form-control"
            onChange={this.updateFromField('dos_contact_email')}
            type="text" id="dos_contact_email" placeholder={this.props.placeholders.dos_contact_email}
            value={this.state.dos_contact_email}/>
        </div>
        <div className="form-group">
          <label htmlFor="parking">Parking Instructions</label>
          <input className="form-control"
            onChange={this.updateFromField('parking')} type="parking"
            id="parking" placeholder={this.props.placeholders.parking} value={this.state.parking}/>
        </div>
        <div className="form-group">
          <label htmlFor="load_in_time">Load In</label>
          <input className="form-control"
            onChange={this.updateFromField('load_in_time')}
            type="text" id="load_in_time" placeholder={this.props.placeholders.load_in_time} value={this.state.load_in_time}/>
        </div>
        <div className="form-group">
          <label htmlFor="load_in_location">Load In Location</label>
          <input className="form-control"
            onChange={this.updateFromField('load_in_location')} type="text"
             id="load_in_location" placeholder={this.props.placeholders.load_in_location}
             value={this.state.load_in_location}/>
        </div>
        <div className="form-group">
          <label htmlFor="door_time">Door Time</label>
          <input className="form-control"
            onChange={this.updateFromField('door_time')}
            type="text" id="door_time" placeholder={this.props.placeholders.door_time} value={this.state.door_time}/>
        </div>
        <div className="form-group">
          <label htmlFor="set_time">Set Time</label>
          <input className="form-control" onChange={this.updateFromField('set_time')}
            type="text" id="set_time" placeholder={this.props.placeholders.set_time} value={this.state.set_time}/>
        </div>
        <div className="form-group">
          <label htmlFor="backline">Back Line</label>
          <input className="form-control"
            onChange={this.updateFromField('backline')}
            type="text" id="backline" placeholder={this.props.placeholders.backline} value={this.state.backline}/>
        </div>
        <div className="form-group">
          <label htmlFor="hospitality">Hospitality</label>
          <input className="form-control" onChange={this.updateFromField('hospitality')}
            type="text" id="hospitality" placeholder={this.props.placeholders.hospitality} value={this.state.hospitality}/>
        </div>
        <div className="form-group">
          <label htmlFor="green_room">Green Room</label>
          <input className="form-control"
            onChange={this.updateFromField('green_room')}
            type="text" id="green_room" placeholder={this.props.placeholders.green_room} value={this.state.green_room}/>
        </div>
        <div className="form-group">
          <label htmlFor="showers">Showers</label>
          <input className="form-control" onChange={this.updateFromField('showers')}
            type="text" id="showers" placeholder={this.props.placeholders.showers} value={this.state.showers}/>
        </div>
        <div className="form-group">
          <label htmlFor="laundry">Laundry</label>
          <input className="form-control"
            onChange={this.updateFromField('laundry')}
            type="text" id="laundry" placeholder={this.props.placeholders.laundry} value={this.state.laundry}/>
        </div>
        <div className="form-group">
          <label htmlFor="wifi">Wifi Information</label>
          <input className="form-control" onChange={this.updateFromField('wifi')} type="text"
             id="wifi" placeholder={this.props.placeholders.wifi} value={this.state.wifi}/>
        </div>
        <div className="form-group">
          <label htmlFor="misc">Miscellaneous</label>
          <textarea className="form-control"
            onChange={this.updateFromField('misc')}
            type="text" id="misc" placeholder={this.props.placeholders.misc} value={this.state.misc}/>
        </div>
        <div className="form-group">
          <button onClick={event => this.submit(event)} type="submit" className="btn btn-success">Save & Submit</button>
        {/* </div>
        <div className="form-group"> */}
          <button onClick={event => this.submit(event)} type="submit" className="btn btn-success">Send Form</button>
        </div>
        </form>
        }
      </div>);
  }
}
FormInput.propTypes = {
  // placeholders: propTypes.object,
  // bandsId: propTypes.number
};
