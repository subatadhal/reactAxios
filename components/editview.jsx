import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class EditView extends React.Component {
  constructor(props) {
    super(props);
    this.handlePostClick = this.handlePostClick.bind(this);
  }
  handlePostClick(e){
    e.preventDefault();
    var _ = this.props;
    var id = _.datauserdetails.id;
    var that = this.refs;

    axios.put('http://jsonplaceholder.typicode.com/users/'+id, {
      data: {
        id: id,
        username: that.username.value,
        email: that.useremail.value,
        website: that.userwebsite.value,
        phone: that.userphone.value
      }
    }).then(function(data) {
      if(data.statusText === 'OK'){
        var reply={
          type: 'success',
          msg: 'Row successfully editted'
        }
        _.callbackEditView(reply);
      }else{
        var reply={
          type: 'notsuccess',
          msg: 'Sorry request not success'
        }
        _.callbackEditView(reply);
      }
    });

  }
  render() {
    return (
      <div className="col-md-6 ">
        <form className="form-horizontal" onSubmit={this.handlePostClick}>
          <h3>Edit User</h3>
          <div className="form-group">
              <label for="" className="col-sm-2 control-label">Name</label>
              <div className="col-sm-10">
                <input className="form-control" placeholder="Title" ref="username" defaultValue={this.props.datauserdetails.name}/>
              </div>
            </div>
            <div className="form-group">
              <label for="" className="col-sm-2 control-label">Email</label>
              <div className="col-sm-10">
                <input className="form-control" placeholder="Email" ref="useremail" defaultValue={this.props.datauserdetails.email}/>
              </div>
            </div>
            <div className="form-group">
              <label for="" className="col-sm-2 control-label">Phone</label>
              <div className="col-sm-10">
                <input className="form-control" placeholder="Phone" ref="userphone" defaultValue={this.props.datauserdetails.phone}/>
              </div>
            </div>
            <div className="form-group">
              <label for="" className="col-sm-2 control-label">Website</label>
              <div className="col-sm-10">
                <input className="form-control" placeholder="Website" ref="userwebsite" defaultValue={this.props.datauserdetails.website}/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2">
                <input type="submit" className="btn btn-success" value="Submit"/>
              </div>
            </div>
        </form>
      </div>
    )
  }
}
export default EditView;
