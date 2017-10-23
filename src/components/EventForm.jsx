// component
import React, {Component} from 'react';
import EventBandView from './EventBandView.jsx';
import EventVenueView from './EventVenueView.jsx';
import ProfileMini from './ProfileMini.jsx';
import { Link, Redirect, withRouter, Switch, Route} from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import cookie from 'react-cookies';

export default class EventForm extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);

    this.state = {
      displayNew: false,
      displayBandView: true,
      dropdownOpen: false,
      token: null,
      userId: null,
      bandsId: null,
      eventToken: null,
      eventTokenFromHash: null
    }
  }

// need a function to catch token from url if coming from an email. This will cause VenueView to render.

  fxnToGrabTokenFromUrl(){ //finish writing!
    // doTheThing()
    // this.setState({eventTokenFromHash: theHash, displayBandView: false});
  }

  // apply props to conditionally render either EventBandView or EventVenueView
  componentWillMount(){ //finish writing!
    if(this.props.displayNew || this.props.bandsId){
      this.setState({displayBandView: true});
    }
    this.setState({token: cookie.load('token'), userId: cookie.load('userId')});
    console.log("Props: displayNew: "+this.props.displayNew+" bandsId: "+this.props.bandsId+" eventToken: "+this.props.eventToken);
    console.log("State: displayNew: "+this.state.displayNew+" bandsId: "+this.state.bandsId+" eventToken: "+this.state.eventToken);
  }

  componentDidMount(){
    console.log("Props: displayNew: "+this.props.displayNew+" bandsId: "+this.props.bandsId+" eventToken: "+this.props.eventToken);
    console.log("State: displayNew: "+this.state.displayNew+" bandsId: "+this.state.bandsId+" eventToken: "+this.state.eventToken);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

// if displayNew then dropdown needs to show list of bands. If only one, then auto select. Pass displayButtons as props.
  render() {
    return (
      <div>
      {/* <ProfileMini/> */}
        <div className="d-flex justify-content-between">
          <div><button className="button create-new-event-button"><Link to="/dashboard">Dashboard</Link></button></div>
          {this.props.displayNew ?
            <h1>New Event for</h1> :
            <h1>Scheduled Event</h1>
          }
          <div>
            <Dropdown className="button create-new-event-button" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
               <DropdownToggle caret className="button create-new-event-button">
                 Edit Profile
               </DropdownToggle>
               <DropdownMenu>
                 {/* <DropdownItem header>Header</DropdownItem> */}
                 {/* <DropdownItem disabled>Action</DropdownItem> */}
                 <DropdownItem><Link to={{ pathname: "/profile-page", state: { userProfile: true} }}>User Profile</Link></DropdownItem>
                 <DropdownItem divider />
                 <DropdownItem><Link to={{ pathname: "/profile-page", state: { userProfile: false} }}>Band Profile</Link></DropdownItem>
               </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <Switch>
          <Route exact path='/event-form' render={(props) => (<EventBandView bandsId={this.props.bandsId} displayNew={this.props.displayNew} eventToken={this.props.eventToken} noLongerNew={this.props.noLongerNew}/>)} />
          <Route exact path='/event-form/:hash' render={(props) => (<EventVenueView eventTokenFromHash={props.match.params.hash}/>)} />
        </Switch>
      </div>
    );
  }
}
EventForm.propTypes = {
  // displayNew.boolean
  // bandsId.number
};
