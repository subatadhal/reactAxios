import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      userDetails: []
    }
  }
  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then(res => {
      this.setState({userList: res.data});
    });
  }
  onChildUserDetails(newDetails) {
    this.setState({userDetails: newDetails});
  }
  render() {
    const userArr = this.state.userList;
    const listItems = userArr.map((userObj) => {
      return <UserItems callbackUserDetails={(newDetails) => this.onChildUserDetails(newDetails)} key={userObj.id} data={userObj}/>;
    });
    return (
      <div className="row">
        <div className="large-3 columns">
          <h2>User List:</h2>
          <ul>
            {listItems}
          </ul>
        </div>
        <ViewUserDetails datauserdetails={this.state.userDetails}/>
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
        <h4>Address:</h4>
        {street}<br/> {suite}<br/> {city}<br/> {zipcode}
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
        <h4>Company:</h4>
        {name}<br/> {catchPhrase}<br/> {bs}
      </div>
    )
  }
}

class ViewUserDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <div className="large-6 columns">
        <div className="card">
          <div className="card-divider">
            <h4>{this.props.datauserdetails.name}</h4>
            <p>{this.props.datauserdetails.email}<br/> {this.props.datauserdetails.phone}<br/> {this.props.datauserdetails.website}</p>
          </div>
          <div className="card-section">
            <Address address={this.props.datauserdetails.address}/>
            <Company company={this.props.datauserdetails.company}/>
          </div>
        </div>
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
      <li onClick={this.handleClick.bind(this)} data-itemid={data.id}>{data.id}
        - {data.name}</li>
    );
  }
};

export default UserList;
