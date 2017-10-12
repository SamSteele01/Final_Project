import React, {Component} from 'react';
import request from 'superagent';
import cookie from 'react-cookies';
import ProfileEnter from './ProfileEnter.jsx';
import ProfileView from './ProfileView.jsx';

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

  fxnToCheckIfThisIsTheProfileOfTheUser(){
    // if(token matches user ID){
      this.setState({displayEditButton: true});
    // }
  }

  getProfileInfo(event){
    // need to get userId for profile to be displayed
    let id = this.props.userId;
    request
      .get('https://ez-tour.herokuapp.com/users/${id}')
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
        <ProfileEnter/>
      </div>);

  }
}
ProfilePage.propTypes = {
};
