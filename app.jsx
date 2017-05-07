import React from 'react';
import ReactDOM from 'react-dom';
import UserList from './userList.jsx';

class App extends React.Component {
  render() {
    return (
      <div className="container" style={{'marginTop':'70px'}}>
        <UserList></UserList>
      </div>
    )
  }
}

export default App;
