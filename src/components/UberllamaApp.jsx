//= require jquery - superagent
//= require lodash
//= require react
//= require_tree ./stores
//= require_tree ./components
//= require loader

// this will go in profileEnter pages. The EventForm will have to have the DocumentsList component and documents will need to be userDocuments and bandDocuments
var App = React.createClass({

  getInitialState: function() {
    return {
      documents: []
    }
  },

  componentDidMount: function() {
    FileStore.getResources()
    .then(function(data) {
      this.setState({ documents: data.documents });
    }.bind(this));
  },

  handleCreateDocument: function(document) {
    this.setState({ documents: $.merge([document], this.state.documents) });
  },

  render: function() {
    return (
      <div>
        <DocumentsList documents={this.state.documents} />
        <FileInput onCreateDocument={this.handleCreateDocument} />
      </div>
    )
  }
});
