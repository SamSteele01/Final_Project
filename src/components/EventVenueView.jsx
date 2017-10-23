import React, {Component} from 'react';
import AssetContainer from './AssetContainer.jsx';
import FormInput from './FormInput.jsx';
import ProfileMini from './ProfileMini.jsx';
import request from 'superagent';

export default class EventVenueView extends Component {

  constructor(props) {
    super(props);

    this.state= {
      eventInfo: null,
      token: null,
      userId: null
    }
  }

  componentWillMount(){
    if(!this.props.eventTokenFromHash){
      window.location.href = "/";
    }
  }

  componentDidMount(){
    console.log(this.props.eventTokenFromHash);
    if(this.props.eventTokenFromHash){
      this.getFormData();
    }
  }

  getFormData(){
   let eventId = this.props.eventTokenFromHash; //may need to change
    request
     .get(`https://ez-tour.herokuapp.com/events/${eventId}`)
     .end((err, res) =>{
       if(err) {
         console.log(err);
         console.log(res);
         this.setState({error: res.body.error});
       }else{
         console.log(res);
         let data = res.body;
         this.setState({eventInfo: data});
       }
     })
  }

  render() {
    return (
      <div>
        {/* <ProfileMini/> */}
        {/* <AssetContainer/> */}
        {this.state.eventInfo &&
          <FormInput placeholders={this.state.eventInfo} eventTokenFromHash={this.props.eventTokenFromHash}/>
        }
        {/* <h1>VenueView!!</h1> */}
        {/* <p>Your hash is: {this.props.eventToken}</p> */}
      </div>
    );
  }
}

EventVenueView.propTypes = {
};
