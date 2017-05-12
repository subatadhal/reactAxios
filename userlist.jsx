import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      userDetails: [],
      message:[],
      viewIsHidden: 'false',
      editIsHidden: 'false',
      deleteIsHidden: 'false',
      messageIsHidden: 'false'
    }
  }
  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then(res => {
      this.setState({userList: res.data});
    });
  }
  onChildUserDetails(newDetails) {
    this.setState({
      userDetails: newDetails,
      viewIsHidden: 'true'
    });
  }
  onCallbackBtnClickType(btnType){
    if(btnType==='edit'){
      this.setState({
           viewIsHidden: 'false',
           editIsHidden: 'true'
         });
    }else{
      this.setState({
           viewIsHidden: 'false',
           deleteIsHidden: 'true'
         });
    }
  }
  oncallbackEditView(editMessage){
    //console.log(editMessage);
    this.setState({
      message: editMessage,
      editIsHidden: 'false',
      messageIsHidden: 'true'
    });
  }
  oncallbackMessage(callbackMessage){
    this.setState({
      messageIsHidden: callbackMessage.messageIsHidden,
    });
  }
  render() {
    const userArr = this.state.userList;
    const listItems = userArr.map((userObj) => {
      return <UserItems callbackUserDetails={(newDetails) => this.onChildUserDetails(newDetails)} key={userObj.id} data={userObj}/>;
    });
    if(this.state.viewIsHidden === "true"){
      var viewUser = <ViewUserDetails callbackBtnClickType={(btnType) => this.onCallbackBtnClickType(btnType)} datauserdetails={this.state.userDetails}/>
    }
    if(this.state.editIsHidden === "true"){
      var edituser = <EditView callbackEditView={(editMessage) => this.oncallbackEditView(editMessage)} datauserdetails={this.state.userDetails}/>
    }
    if(this.state.deleteIsHidden === "true"){
      var deleteuser = <DeleteView datauserdetails={this.state.userDetails}/>
    }
    if(this.state.messageIsHidden === "true"){
      var message = <MessageView callbackMessage={(callbackMessage) => this.oncallbackMessage(callbackMessage)} messagedetails={this.state.message}/>
    }
    return (
      <div className="row">
        {message}
        <div className="col-md-6">
          <h2><i className="zmdi zmdi-accounts-alt"></i> User List:</h2>
          <ul className="list-group">
            {listItems}
          </ul>
        </div>
        {viewUser}
        {edituser}
        {deleteuser}
      </div>
    )
  }
}
class UserItems extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    var userID = e.target.getAttribute("data-itemid");
    axios.get(`https://jsonplaceholder.typicode.com/users/` + userID).then(res => {
      this.props.callbackUserDetails(res.data);
    });
  }
  render() {
    const data = this.props.data;
    return (
      <a href="#" className="list-group-item" onClick={this.handleClick.bind(this)} data-itemid={data.id}>
        {data.name}
        <i className="zmdi zmdi-long-arrow-right zmdi-hc-2x pull-right text-success"></i>
      </a>
    );
  }
};
class ViewUserDetails extends React.Component {
  constructor(props) {
    super(props);
    this.btnClick = this.btnClick.bind(this);
  }
  btnClick(e) {
    var btntype = e.target.getAttribute("data-btntype");
    this.props.callbackBtnClickType(btntype);
  }
  render() {
    return (
      <div className="col-md-6 ">
        <div className="jumbotron">
            <h2><i className="zmdi zmdi-account "></i> {this.props.datauserdetails.name}</h2>
            <i className="zmdi zmdi-email"></i> &nbsp;&nbsp; {this.props.datauserdetails.email}<br/>
            <i className="zmdi zmdi-phone"></i> &nbsp;&nbsp; {this.props.datauserdetails.phone}<br/>
            <i className="zmdi zmdi-globe"></i> &nbsp;&nbsp; {this.props.datauserdetails.website}
            <br/>
            <br/>
            <h4><i className="zmdi zmdi-balance"></i> Address:</h4>
            {this.props.datauserdetails.address.street}<br/>
            {this.props.datauserdetails.address.suite}<br/>
            {this.props.datauserdetails.address.city}<br/>
            {this.props.datauserdetails.address.zipcode}<br/><br/>
            <h4><i className="zmdi zmdi-city"></i> Company:</h4>
            {this.props.datauserdetails.company.name}<br/>
            {this.props.datauserdetails.company.catchPhrase}<br/>
            {this.props.datauserdetails.company.bs}
            <br/>
            <br/>
            <div className="btn-group" role="group" aria-label="...">
              <button onClick={this.btnClick} data-btntype='edit' type="button" className="btn btn-primary"><i className="zmdi zmdi-edit" aria-hidden="true"></i> Edit</button>
              <button onClick={this.btnClick} data-btntype='delete' type="button" className="btn btn-danger"><i className="zmdi zmdi-delete" aria-hidden="true"></i> Delete</button>
            </div>
        </div>
      </div>
    )
  }
}
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
class DeleteView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="col-md-6 ">
        del
      </div>
    )
  }
}
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

export default UserList;

// <div className="col-md-12">
//   <div className="alert alert-success" role="alert">...</div>
//   <div classNameclassName="alert alert-info" role="alert">...</div>
//   <div className="alert alert-warning" role="alert">...</div>
//   <div className="alert alert-danger" role="alert">...</div>
// </div>
