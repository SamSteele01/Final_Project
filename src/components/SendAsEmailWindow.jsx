import React, {Component} from 'react';
import cookie from 'react-cookies';
import request from 'superagent';

export default class SendAsEmailWindow extends Component {
  constructor(props) {
    super(props);
    this.updateFromField = this.updateFromField.bind(this);

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

  sendEmailAddressToBackEnd(event){
    event.preventDefault();
    let setCookie = this.setCookie;
    request
      .post('https://ez-tour.herokuapp.com/users/')
      .send({email: this.state.email})
      .set('Authorization', `Token token=${this.props.token}`)
      .end((err, res) =>{
        if(err) {
          console.log(err);
          console.log(res);
          this.setState({error: res.body.error});
        }else{
          let user_id = res.body.user_id;
          this.props.closeWindow(false);
        }
      })
  }
// with a z-index in CSS
  render() {
    return (
      <div>
        <form onSubmit={this.sendEmailAddressToBackEnd}>
          {this.state.error &&
          <div className="alert alert-danger" role="alert">
            <h3>{this.state.error}</h3>
          </div>}
          <div class="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}
SendAsEmailWindow.propTypes = {
};
