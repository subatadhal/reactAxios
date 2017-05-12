import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

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
export default ViewUserDetails;
