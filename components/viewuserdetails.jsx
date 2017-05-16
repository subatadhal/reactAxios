import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

var divStyle = {
  background: "#eee",
  padding: "20px",
  margin: "20px"
};

class ViewUserDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      text: 'View more',
      classNAME: 'hide'
    };
    this.editBtnClick = this.editBtnClick.bind(this);
    this.deleteBtnClick = this.deleteBtnClick.bind(this);
    this.viewClick = this.viewClick.bind(this);
  }
  editBtnClick(e) {
    this.props.callbackBtnClickType('edit');
  }
  deleteBtnClick(e) {
    this.props.callbackBtnClickType('delete');
  }
  viewClick(e) {
    if(this.state.classNAME==='hide'){
      this.setState({
        text: 'View less',
        classNAME: 'show'
      });
    }else{
      this.setState({
        text: 'View more',
        classNAME: 'hide'
      });
    }
  }
  render() {
    var tx = this.state.text;
    var cln = this.state.classNAME;
    return (
      <div className="col-md-8">
        <div className="panel panel-primary">
          <div className="panel-heading">User Details</div>
          <div className="panel-footer">
            <h2><i className="zmdi zmdi-account "></i> {this.props.datauserdetails.name}</h2>
            <i className="zmdi zmdi-email"></i> &nbsp;&nbsp; {this.props.datauserdetails.email}<br/>
            <i className="zmdi zmdi-phone"></i> &nbsp;&nbsp; {this.props.datauserdetails.phone}<br/>
            <i className="zmdi zmdi-globe"></i> &nbsp;&nbsp; {this.props.datauserdetails.website}
            <br/>
            <br/>

            <div className={cln}>
                <h4><i className="zmdi zmdi-balance"></i> Address:</h4>
                {this.props.datauserdetails.address.street}<br/>
                {this.props.datauserdetails.address.suite}<br/>
                {this.props.datauserdetails.address.city}<br/>
                {this.props.datauserdetails.address.zipcode}
                <br/>
                <br/>
                <h4><i className="zmdi zmdi-city"></i> Company:</h4>
                {this.props.datauserdetails.company.name}<br/>
                {this.props.datauserdetails.company.catchPhrase}<br/>
                {this.props.datauserdetails.company.bs}
                <br/>
                <br/>
            </div>
            <a onClick={this.viewClick} className="btn btn-info btn-xs">{tx}</a>
            <hr/>
            <div className="clearfix" role="group" aria-label="...">
              <button onClick={this.deleteBtnClick} data-dbtntype='delete' type="button" className="btn btn-danger pull-right"><i className="zmdi zmdi-delete" aria-hidden="true"></i> Delete</button>
              <button onClick={this.editBtnClick} data-ebtntype='edit' type="button" className="btn btn-primary pull-right" style={{'marginRight':'15px'}}><i className="zmdi zmdi-edit" aria-hidden="true"></i> Edit</button>
            </div>
          </div>
      </div>
      </div>
    )
  }
}
export default ViewUserDetails;
