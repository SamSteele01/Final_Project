import React, {Component} from 'react';
import cookie from 'react-cookies';
import request from 'superagent';

export default class SendAsEmailWindow extends Component {
  constructor(props) {
    super(props);
    this.updateFromField = this.updateFromField.bind(this);
    this.sendEmailAddressToBackEnd = this.sendEmailAddressToBackEnd.bind(this);

    this.state = {
      email: '',
      token: null
    }
  }

  componentWillMount(){
    this.setState({token: cookie.load('token'), userId: cookie.load('userId')}); //get token from cookie, if it exists
  }

  updateFromField(stateKey) {
    return (event) => {
      this.setState({[stateKey]: event.target.value});
    }
  }

  createEventHashPatch(){
    let hash = '';
    if(this.props.eventTokenFromHash){
      hash = this.props.eventTokenFromHash;
    }
    if(this.props.eventToken){
      hash = this.props.eventToken;
    }
    return hash;
  }

  sendEmailAddressToBackEnd(){
    // event.preventDefault();
    let setCookie = this.setCookie;
    request
      .post('https://ez-tour.herokuapp.com/send_event')
      .send( {email: this.state.email, event_hash: this.createEventHashPatch()})
      .set('Authorization', `Token token=${this.state.token}`)
      .end((err, res) =>{
        if(err) {
          console.log(err);
          console.log(res);
          this.setState({error: res.body.error});
        }
        if(res){
          console.log(res);
          this.props.closeEmailWindow();
        }
      })
  }
// with a z-index in CSS
  render() {
    return (
      <div className="card send-email-window">
        <form>
          {this.state.error &&
            <div className="alert alert-danger" role="alert">
            <h3>{this.state.error}</h3>
          </div>}
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address of venue contact:</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={this.updateFromField('email')} placeholder="ex: Mr-shows@club.com" value={this.state.email}/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <button type="button" onClick={this.sendEmailAddressToBackEnd} className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}
SendAsEmailWindow.propTypes = {
};
