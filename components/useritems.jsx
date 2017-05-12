import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

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
export default UserItems;
