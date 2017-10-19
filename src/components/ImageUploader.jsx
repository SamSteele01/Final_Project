import React, {Component} from 'react';
import {bindAll} from 'lodash';
import request from 'superagent';
import cookie from 'react-cookies';

export default class ImageUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      userId: null,
      data_uri: null,
      processing: false
    }
    bindAll(this, 'handleFile', 'handleSubmit', 'createUrlForPatch');
  }

  componentWillMount(){
    this.setState({token: cookie.load('token'), userId: cookie.load('userId')}); //get token from cookie, if it exists
  }

  // needs userId and bandId as props to fill in the URL for the patch. Needs key for file to patch.
  createUrlForPatch(){
    let userId = this.state.userId;
    let url = ``;
    // if no bandId then just a URL for the user
    if(!this.props.bandId){
      url = `https://ez-tour.herokuapp.com/users/${userId}`;
    }
    if(this.props.bandId){
      let bandsId = this.props.bandId;
      url = `https://ez-tour.herokuapp.com/users/${userId}/bands/${bandsId}`;
    }
    return url;
  }

  handleSubmit(e) {
    e.preventDefault();
    let uploadTargetKey = this.props.targetKey;
    this.setState({
      processing: true
    });
    let userId = this.state.userId;
    request
      .patch(this.createUrlForPatch())
      .send({[uploadTargetKey]: this.state.data_uri
        // filename: this.state.filename,
        // filetype: this.state.filetype
      })
      .set('Authorization', `Token token=${this.state.token}`)
      .end((err, res) => {
        if(err){
          console.log(err);
        }
        if(res){
          console.log(res);
          this.setState({
          processing: false,
          uploaded_uri: this.state.data_uri
          });
        }
      });
  }

  handleFile(e) {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = (upload) => {
      this.setState({
        data_uri: upload.target.result,
        filename: file.name,
        filetype: file.type
      });
    };
    reader.readAsDataURL(file);
  }

  render() {
    let processing;
    let uploaded;
    if (this.state.uploaded_uri) {
      uploaded = (
        <div>
          <h4>Image uploaded!</h4>
          <img className='image-preview' src={this.state.uploaded_uri} />
          <pre className='image-link-box'>{this.state.uploaded_uri}</pre>
        </div>
      );
    }
    if (this.state.processing) {
      processing = "Processing image, hang tight";
    }
    return (
      <div className='row'>
        <div className='col-sm-12'>
          <label>{this.props.label}</label>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <input type="file" onChange={this.handleFile} />
            <input disabled={this.state.processing} className='btn btn-primary' type="submit" value="Upload" />
            {processing}
          </form>
          {uploaded}
        </div>
      </div>
    );
  }
}

ImageUploader.propTypes = {

};
