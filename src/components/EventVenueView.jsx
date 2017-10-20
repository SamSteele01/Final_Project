import React, {Component} from 'react';
import AssetContainer from './AssetContainer.jsx';
import FormInput from './FormInput.jsx';
import ProfileMini from './ProfileMini.jsx';
import request from 'superagent';

export default class EventVenueView extends Component {

  constructor(props) {
    super(props);

    this.state= {
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
      hospitality_rider: "",
      token: null,
      userId: null
    }
  }
  // componentWillMount(){
  //   this.setState({token: cookie.load('token'), userId: cookie.load('userId')}); //get token from cookie, if it exists
  // }

  handleUpdateForm = (event) => {
  //needs to post to the DB and call an action for redux
   event.preventDefault();
   let userId = this.props.userId;
   let bandsId = this.props.bandsId;
   let eventId = this.props.eventId; //may need to change
    request
     .patch(`https://ez-tour.herokuapp.com/users/${userId}/bands/${bandsId}/events/${eventId}`)
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
    //  .set('Authorization', `Token token=${this.props.token}`)
     .end((err, res) =>{
       if(err) {
         console.log(err);
         console.log(res);
         this.setState({error: res.body.error});
       }else{
         console.log(res);
         let Data = res.body.event;
         this.setState({eventInfo: Data});
         // setToken('578gh423rebz7zjeno99'); //for testing purposes
       }
     })
  }
  render() {
    return (
      <div>
        <ProfileMini/>
        <AssetContainer/>
        <FormInput/>
      </div>
    );
  }
}

EventVenueView.propTypes = {
};
