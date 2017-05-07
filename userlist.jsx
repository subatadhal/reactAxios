import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      userDetails: [],
      isHidden: 'false'
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
      isHidden: 'true'
    });
  }
  render() {
    const userArr = this.state.userList;
    const listItems = userArr.map((userObj) => {
      return <UserItems callbackUserDetails={(newDetails) => this.onChildUserDetails(newDetails)} key={userObj.id} data={userObj}/>;
    });

    if(this.state.isHidden === "true"){
      var pre = <ViewUserDetails datauserdetails={this.state.userDetails}/>
    }
    return (
      <div className="row">

        <div className="col-md-6">
          <h2><i className="zmdi zmdi-accounts-alt"></i> User List:</h2>
          <ul className="list-group">
            {listItems}
          </ul>
        </div>
        {pre}
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
        <i className="zmdi zmdi-long-arrow-right zmdi-hc-2x pull-right text-success"  ></i>
      </a>
    );
  }
};


class ViewUserDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="col-md-6 ">
        <div className="jumbotron">
            <h2><i className="zmdi zmdi-account "></i> {this.props.datauserdetails.name}</h2>
            <i className="zmdi zmdi-email"></i> &nbsp;&nbsp; {this.props.datauserdetails.email}<br/>
            <i className="zmdi zmdi-phone"></i> &nbsp;&nbsp; {this.props.datauserdetails.phone}<br/>
            <i className="zmdi zmdi-globe"></i> &nbsp;&nbsp; {this.props.datauserdetails.website}
            <Address address={this.props.datauserdetails.address}/>
            <Company company={this.props.datauserdetails.company}/>
        </div>
      </div>
    )
  }
}
class Address extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let address = null;
    if (this.props.address != undefined) {
      var street = this.props.address.street;
      var suite = this.props.address.suite;
      var city = this.props.address.city;
      var zipcode = this.props.address.zipcode;
    }
    return (
      <div className="details">
        <hr/>
        <h4><i className="zmdi zmdi-balance"></i> Address:</h4>
        {street}<br/>
        {suite}<br/>
        {city}<br/>
        {zipcode}
      </div>
    )
  }
}
class Company extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let company = null;
    if (this.props.company != undefined) {
      var name = this.props.company.name;
      var catchPhrase = this.props.company.catchPhrase;
      var bs = this.props.company.bs;
    }
    return (
      <div className="details">
        <hr/>
        <h4><i className="zmdi zmdi-city"></i> Company:</h4>
        {name}<br/>
        {catchPhrase}<br/>
        {bs}
      </div>
    )
  }
}

export default UserList;
