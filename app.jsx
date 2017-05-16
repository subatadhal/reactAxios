import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Link, Switch, IndexRoute, HashRouter} from 'react-router-dom';
import UserList from './userlist.jsx';
import UserItems from './components/useritems.jsx';
import ViewUserDetails from './components/viewuserdetails.jsx';
import EditView from './components/editview.jsx';
import MessageView from './components/messageview.jsx';
import DeleteView from './components/deleteview.jsx';
import PhotoAlbum from './components/photoalbum.jsx';
import Header from './components/header.jsx';
import AddNewUser from './components/addnewuser.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header></Header>
        <div className="container" style={{'marginTop':'70px'}}>
          <Switch>
            <Route exact path='/' component={UserList}/>
            <Route exact path='/addnewuser' component={AddNewUser}/>
            <Route path='/photo-album' component={PhotoAlbum}/>
          </Switch>
        </div>
      </div>
    )
  }
}


export default App;

// <div className="container" style={{'marginTop':'70px'}}>
//   <UserList></UserList>
// </div>

// <div>
//   <Header></Header>
//   <div className="container" style={{'marginTop':'70px'}}>
//     <UserList></UserList>
//     <About></About>
//   </div>
// </div>
