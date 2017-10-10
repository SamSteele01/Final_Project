import React, {Component} from 'react';
import request from 'superagent';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.toggleLoginRegisterForm = this.toggleLoginRegisterForm.bind(this);
    this.state = {
      register: false,
      username: "",
      password: "",
      error: false,
      token: false
    }
  }

  updateFromField(stateKey) {
    return (event) => {
      this.setState({[stateKey]: event.target.value});
    }
  }

  // sendLoginFormRequestUp(goBack){
  //   this.props.sendLoginFormRequestUp(goBack);
  // }

  toggleLoginRegisterForm(event){
    event.preventDefault();
    if (event.target.id !== "" && event.target.id !== undefined && event.target.id !== null){
      console.log(event);
      if(event.target.id==="register"){
        this.setState({register: true});
      }
      if(event.target.id==="login"){
        this.setState({register: false});
      }
    }
  }

  register(event){
    event.preventDefault();
    request
      .post('https://murmuring-fjord-57185.herokuapp.com/api/users')
      .send({user: {username: this.state.username, password: this.state.password}})
      .end((err, res) =>{
        if(err) {
          this.setState({error: res.body.error});
        }else{
          this.sendLoginFormRequestUp("register");
        }
      })
  }

  login(event){
    let setToken = this.props.setToken;
    event.preventDefault();
    request
      .post('https://murmuring-fjord-57185.herokuapp.com/api/users/login')
      .send({username: this.state.username, password: this.state.password})
      .end((err, res) =>{
        if(err) {
          this.setState({error: res.body.error});
        }else{
          // setToken(res.body.token);
          setToken('578gh423rebz7zjeno99'); //for testing purposes
          this.sendLoginFormRequestUp("login");
        }
      })
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
              {this.props.display==="register" ?
                <h3>Register</h3> :
                <h3>Login</h3>
              }
              {this.state.error &&
                <div className="alert">
                  {this.state.error}
                </div>
              }
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input className="form-control" onChange={this.updateFromField('username')} type="text" id="username" placeholder="Username:" value={this.state.username}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input className="form-control"
                onChange={this.updateFromField('password')}
                type="text" id="password" placeholder="Password:" value={this.state.password}/>
            </div>

            {this.props.display==="register" ?
              <div className="form-group">
                <button onClick={event => this.register(event)} type="submit" className="btn btn-primary">Register</button>
              </div> :
              <div>
                <div className="form-group">
                  <button onClick={event => this.login(event)} type="submit" className="btn btn-success">Login</button>
                </div>
                <div className="g-signin2" data-onsuccess="onSignIn">

                </div>
              </div>
            }
          </form>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
};
