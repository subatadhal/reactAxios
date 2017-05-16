import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch, IndexRoute, HashRouter} from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <div className="container-fluid navbar navbar-default navbar-fixed-top">
        <div className="row">
          <div className="col-md-12">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand">reactAxios</Link>
            </div>
            <ul className="nav navbar-nav ">
              <li><Link to="/">User Management</Link></li>
              <li><Link to="/photo-album">Photo Album</Link></li>
            </ul>
          </div>
       </div>
     </div>
    )
  }
}

export default Header;
