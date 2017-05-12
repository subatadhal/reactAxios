import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class MessageView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      class: "",
      msg: ""
    };
  }
  componentDidMount() {
    var that = this.props.messagedetails;
    var classname;
    if(that.type==='success'){
      classname = 'alert alert-success'
    }else if(that.type==='notsuccess'){
      classname = 'alert alert-danger'
    }
    this.setState({ class:classname, msg: that.msg });
    setTimeout(function() {
      var returnMessage={
        messageIsHidden: 'false'
      }
      this.props.callbackMessage(returnMessage);
    }.bind(this), 5000)
  }
  render() {
    return (
      <div className="col-md-12">
        <div className={this.state.class}> {this.state.msg} </div>
      </div>
    )
  }
}

export default MessageView;
