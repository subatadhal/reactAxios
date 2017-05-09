import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      userDetails: [],
      viewIsHidden: 'false',
      editIsHidden: 'false',
      deleteIsHidden: 'false'
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
  render() {
    const userArr = this.state.userList;
    const listItems = userArr.map((userObj) => {
      return <UserItems callbackUserDetails={(newDetails) => this.onChildUserDetails(newDetails)} key={userObj.id} data={userObj}/>;
    });
    if(this.state.viewIsHidden === "true"){
      var viewUser = <ViewUserDetails callbackBtnClickType={(btnType) => this.onCallbackBtnClickType(btnType)} datauserdetails={this.state.userDetails}/>
    }
    if(this.state.editIsHidden === "true"){
      var edituser = <EditIsHidden datauserdetails={this.state.userDetails}/>
    }
    if(this.state.deleteIsHidden === "true"){
      var deleteuser = <DeleteIsHidden datauserdetails={this.state.userDetails}/>
    }
    return (
      <div className="row">
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
class EditIsHidden extends React.Component {
  constructor(props) {
    super(props);
  }
  handlePostClick(e){
    e.preventDefault();

    axios.put('http://jsonplaceholder.typicode.com/users/1', {
      data: {
        id: 1,
        name: 'foo',
        phone: '9876543210'
      }
    }).then(function(data) {
      console.log(data);
    });

  }
  render() {
    return (
      <div className="col-md-6 ">
        <form onSubmit={this.handlePostClick}>
          <h3>Edit User</h3>
          <div className="row">
            <div className="medium-12 columns">
              <label>Name
                <input type="text" placeholder="Title" ref="username"  />
              </label>
            </div>
            <div className="medium-12 columns">
              <label>Email
                <input type="text" placeholder="Title" ref="useremail" />
              </label>
            </div>
            <div className="medium-12 columns">
              <label>Phone
                <input type="text" placeholder="Title" ref="userphone"  />
              </label>
            </div>
            <div className="medium-12 columns">
              <label>Website
                <input type="text" placeholder="Title" ref="userwebsite" />
              </label>
            </div>
            <input type="submit" className="button" value="Submit"/>
          </div>
        </form>
      </div>
    )
  }
}
class DeleteIsHidden extends React.Component {
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
export default UserList;
