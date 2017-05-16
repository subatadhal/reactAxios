import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class DeleteView extends React.Component {
  constructor(props) {
    super(props);
    this.confirmDeleteBtnClick = this.confirmDeleteBtnClick.bind(this);
  }
  confirmDeleteBtnClick(e) {
    var reply={
      type: 'success',
      msg: 'Row successfully deleted'
    }
    this.props.replyConfirmDelete(reply);
  }
  render() {
    return (
    <div className = "col-md-8" > <div className="panel panel-danger">
      <div className="panel-heading">Delete user</div>
        <div className="panel-body text-center">
          Are you sure you want to delete the user account?
          <div className="clearfix" style={{'marginTop':'20px'}}>
              <input onClick={this.confirmDeleteBtnClick} type="button" className="btn btn-warning" value="Confirm"/>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default DeleteView;
