import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch, IndexRoute, HashRouter} from 'react-router-dom';

import UserItems from './components/useritems.jsx';
import ViewUserDetails from './components/viewuserdetails.jsx';
import EditView from './components/editview.jsx';
import MessageView from './components/messageview.jsx';
import DeleteView from './components/deleteview.jsx';

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
      viewIsHidden: 'true',
      editIsHidden: 'false',
      deleteIsHidden: 'false',
      messageIsHidden: 'false'
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
  oncallbackReplyConfirmDelete(callbackMessage){
    this.setState({
      deleteIsHidden: 'false',
      messageIsHidden: 'true',
      message: callbackMessage
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
      var deleteuser = <DeleteView replyConfirmDelete={(callbackMessage) => this.oncallbackReplyConfirmDelete(callbackMessage)} datauserdetails={this.state.userDetails}/>
    }
    if(this.state.messageIsHidden === "true"){
      var message = <MessageView callbackMessage={(callbackMessage) => this.oncallbackMessage(callbackMessage)} messagedetails={this.state.message}/>
    }
    return (
      <div className="row">
        {message}
        <div className="col-md-12 clearfix" style={{'borderBottom':'1px solid #ddd','marginBottom':'15px'}}>
          <h2 className="pull-left"><i className="zmdi zmdi-accounts-alt"></i> User List:</h2>
          <Link to="/addnewuser" style={{'marginTop':'15px'}} className="btn btn-success pull-right"><i className="zmdi zmdi-plus"></i> Add New</Link>
        </div>
        <div className="col-md-4">
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
export default UserList;

// <div className="col-md-12">
//   <div className="alert alert-success" role="alert">...</div>
//   <div classNameclassName="alert alert-info" role="alert">...</div>
//   <div className="alert alert-warning" role="alert">...</div>
//   <div className="alert alert-danger" role="alert">...</div>
// </div>
