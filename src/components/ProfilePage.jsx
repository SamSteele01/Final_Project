import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import request from 'superagent';
import cookie from 'react-cookies';
import NewBandProfileEnter from './NewBandProfileEnter.jsx';
import BandProfileEnter from './BandProfileEnter.jsx';
import UserProfileEnter from './UserProfileEnter.jsx';
import {connect} from 'react-redux';

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      userId: null,
      displayBandView: false,
      enterForm: false,
      profileInfo: null
    }
  }
  // this.props = displayNew, bandsId

  componentWillMount() {
    this.setState({token: cookie.load('token'), userId: cookie.load('userId')});
  }

  componentDidMount() {
    if(!this.state.token||!this.state.userId){
      window.location.href = "/";
    }
    if(this.props.bandsId||this.props.displayNew){
      this.setState({displayBandView: true});
    }
    console.log("BandId: "+this.props.bandsId+" displayNew: "+this.props.displayNew);
    this.getProfileInfo()
  }

// need to check if this is a profile for a user or a band. Should pass as props.source. Not needed for MVP
  // fxnToCheckIfThisIsTheProfileOfTheUser(){
  //   if(this.props.userProfile){
  //   }
  // }

  createUrlForPatch(){
    let userId = this.state.userId;
    let url = ``;
    // if no bandId then just a URL for the user
    if(!this.props.bandsId){
      url = `https://ez-tour.herokuapp.com/users/${userId}`;
    }
    if(this.props.bandsId){
      let bandsId = this.props.bandsId;
      url = `https://ez-tour.herokuapp.com/users/${userId}/bands/${bandsId}`;
    }
    return url;
  }

  getProfileInfo(){
    // need to get userId for profile to be displayed
    // let id = this.props.userId; // from redux
    let id = this.state.userId; // from cookie
    request
      .get(this.createUrlForPatch())
      // .send({email: this.state.email, password: this.state.password})
      .set('Authorization', `Token token=${this.state.token}`)
      .end((err, res) =>{
        if(err) {
          console.log(err);
          console.log(res);
          this.setState({error: res.body.error});
        }else{
          console.log(res);
          let proData = res.body;
          this.setState({profileInfo: proData});
        }
      })
  }

  render() {
    return (
      <div>
        {this.state.profileInfo &&
        <div>
          <div className="d-flex justify-content-between">
            <div><button className="button create-new-event-button"><Link to="/dashboard">Dashboard</Link></button></div>
            <h1>Profile</h1>
            <div><button className="button create-new-event-button"><Link to="/event-form">Create New Event</Link></button></div>
          </div>
          {this.state.displayBandView ?
            <div>
              {this.props.displayNew ?
                <NewBandProfileEnter/> :
                <BandProfileEnter profileInfo={this.state.profileInfo} bandsId={this.props.bandsId}/>
              }
            </div>:
            <UserProfileEnter profileInfo={this.state.profileInfo}/> //userId from cookie
          }
        </div>
        }
      </div>);

  }
}
ProfilePage.propTypes = {
};
