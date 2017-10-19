import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import request from 'superagent';
import cookie from 'react-cookies';
import BandProfileEnter from './BandProfileEnter.jsx';
import UserProfileEnter from './UserProfileEnter.jsx';

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      displayEditButton: false,
      enterForm: false,
      profileInfo: null
    }
  }

  componentWillMount() {
    this.setState({token: cookie.load('token')}); //get token from cookie, if it exists
  }

// need to check if this is a profile for a user or a band. Should pass as props.source
  fxnToCheckIfThisIsTheProfileOfTheUser(){
    if(this.props.userProfile){
      // this.setState({displayEditButton: true});

    }
  }

  getProfileInfo(event){
    // need to get userId for profile to be displayed
    let id = this.props.userId;
    request
      .get(`https://ez-tour.herokuapp.com/users/${id}`)
      // .send({email: this.state.email, password: this.state.password})
      .set('Authorization', `Token token=${this.props.token}`)
      .end((err, res) =>{
        if(err) {
          console.log(err);
          console.log(res);
          this.setState({error: res.body.error});
        }else{
          console.log(res);
          let proData = res.body.user;
          this.setState({profileInfo: proData});
          // setToken('578gh423rebz7zjeno99'); //for testing purposes
        }
      })
  }

  render() {
    return (
      <div>
        <div className="d-flex justify-content-between">
          <div><button className="button create-new-event-button"><Link to="/dashboard">Dashboard</Link></button></div>
          <h1>Profile</h1>
          <div><button className="button create-new-event-button"><Link to="/event-form">Create New Event</Link></button></div>
        </div>
        {this.props.location.state.userProfile ?
          <UserProfileEnter/> :
          <BandProfileEnter/>
        }
      </div>);

  }
}
ProfilePage.propTypes = {
};
