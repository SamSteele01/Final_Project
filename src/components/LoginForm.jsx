/* global gapi */
import React, {Component} from 'react';
// import Global from 'react-global';
import request from 'superagent';
import cookie from 'react-cookies';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.toggleLoginRegisterForm = this.toggleLoginRegisterForm.bind(this);
    this.updateFromField = this.updateFromField.bind(this);
    this.onSignIn = this.onSignIn.bind(this);

    this.state = {
      register: false,
      full_name: "",
      telephone: "",
      email: "",
      password: "",
      error: false,
      userId: false,
      token: false
    }
  }

  updateFromField(stateKey) {
    return (event) => {
      this.setState({[stateKey]: event.target.value});
    }
  }

  componentDidMount() {
    gapi.signin2.render('g-signin2', {
      'scope': 'https://www.googleapis.com/auth/plus.login',
      'width': 150,
      'height': 40,
      'longtitle': false,
      'theme': 'dark',
      'onsuccess': this.onSignIn
    });
  }

  toggleLoginRegisterForm(event){
    event.preventDefault();
    if (event.target.id !== "" && event.target.id !== undefined && event.target.id !== null){
      if(event.target.id==="register"){
        this.setState({register: true});
      }
      if(event.target.id==="login"){
        this.setState({register: false});
      }
    }
  }

  onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    let id_token = googleUser.getAuthResponse().id_token;
    console.log('Token: '+ id_token);
  }

  register(event){
    event.preventDefault();
    request
      .post('https://ez-tour.herokuapp.com/users')
      .send({user: {full_name: this.state.full_name, telephone: this.state.telephone, email: this.state.email, password: this.state.password}})
      .end((err, res) =>{
        if(err) {
          console.log(err);
          console.log(res);
          this.setState({error: res.body.error});
        }else{
          console.log(res);
          this.setState({register: false});
          // alert('Thank you for registering!');
        }
      })
  }

  login(event){
    let setToken = this.setToken;
    event.preventDefault();
    request
      .post('https://ez-tour.herokuapp.com/users/login')
      .send({email: this.state.email, password: this.state.password})
      .end((err, res) =>{
        if(err) {
          console.log(err);
          console.log(res);
          this.setState({error: res.body.error});
        }else{
          console.log(res);
          setToken(res.body.token);
          this.setState({userId: false, token: false});
          // setToken('578gh423rebz7zjeno99'); //for testing purposes
        }
      })
  }

  setToken(token) {
    this.setState({token: token});
    cookie.save('token', token); //saves token in cookie
    console.log(token);
    console.log(this.state.token);
  }

  handleError(){}

  render() {
    return (
      <div className="card">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item"
              // onClick={this.toggleLoginRegisterForm('login')}
              id="login"
              >
               { this.state.register ?
                 <a className="nav-link "
                   onClick={event => this.toggleLoginRegisterForm(event)}
                   id="login"
                   >Login</a> :
                 <a className="nav-link active"
                   onClick={event => this.toggleLoginRegisterForm(event)}
                   id="login"
                   >Login</a>
              }
            </li>
            <li className="nav-item"
              // onClick={this.toggleLoginRegisterForm('register')}
              id="register"
              >
              { this.state.register ?
                <a className="nav-link active"
                  onClick={event => this.toggleLoginRegisterForm(event)}
                  id="register"
                  >Register</a> :
                <a className="nav-link "
                  onClick={event => this.toggleLoginRegisterForm(event)}
                  id="register"
                  >Register</a>
              }
            </li>
          </ul>
        </div>
        <div className="card-block">
          <form>
            <div className="Header">
              {this.state.register ?
                <h3>Register</h3> :
                <h3>Login</h3>
              }
              {this.state.error &&
                <div className="alert">
                  {this.state.error}
                </div>
              }
            </div>
            {this.state.register ?
              <div>
                <div className="form-group">
                  {/* <label htmlFor="full_name">Full Name</label> */}
                  <input className="form-control" onChange={this.updateFromField('full_name')} type="text" id="full_name" placeholder="Fullname:" value={this.state.full_name}/>
                </div>
                <div className="form-group">
                  {/* <label htmlFor="telephone">Phone Number</label> */}
                  <input className="form-control"
                    onChange={this.updateFromField('telephone')}
                    type="text" id="telephone" placeholder="Phone number:" value={this.state.telephone}/>
                </div>
                <div className="form-group">
                  {/* <label htmlFor="email">Email</label> */}
                  <input className="form-control" onChange={this.updateFromField('email')} type="email" id="email" placeholder="Email:" value={this.state.email}/>
                </div>
                <div className="form-group">
                  {/* <label htmlFor="password">Password</label> */}
                  <input className="form-control"
                    onChange={this.updateFromField('password')}
                    type="text" id="password" placeholder="Password:" value={this.state.password}/>
                </div>
              </div>
              :
              <div>
                <div className="form-group">
                  {/* <label htmlFor="email">Email</label> */}
                  <input className="form-control" onChange={this.updateFromField('email')} type="email" id="email" placeholder="email:" value={this.state.email}/>
                </div>
                <div className="form-group">
                  {/* <label htmlFor="password">Password</label> */}
                  <input className="form-control"
                    onChange={this.updateFromField('password')}
                    type="text" id="password" placeholder="Password:" value={this.state.password}/>
                </div>
              </div>
            }
            {this.state.register ?
              <div className="form-group">
                <button onClick={event => this.register(event)} type="submit" className="btn btn-primary">Register</button>
              </div> :
              <div>
                <div className="form-group">
                  <button onClick={event => this.login(event)} type="submit" className="btn btn-success">Login</button>
                </div>
                <div id="g-signin2" />
              </div>
            }
          </form>
        </div>
      </div>
    );
  }
}
// sign in with google button goes away after switching to register and back

LoginForm.propTypes = {
};

// const mapStateToProps = function(state) {
//     return {}
// }
//
// const mapDispatchToProps = function(dispatch) {
//     return {
//         createTodo: function(text) {
//             return dispatch(createTodo(text));
//         }
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
