import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, Switch, IndexRoute, HashRouter} from 'react-router-dom';
//import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';

// import App from './App.jsx';
//
// ReactDOM.render(<App/>, document.getElementById('app'));
//

// For this demo, we are using the UMD build of react-router-dom
// const {
//   HashRouter,
//   Switch,
//   Route,
//   Link
// } = ReactRouterDOM

// A simple data API that will be used to get the data for our
// components. On a real website, a more robust data fetching
// solution would be more appropriate.
const PlayerAPI = {
  players: [
    { number: 1, name: "Ben Blocker", position: "G" },
    { number: 2, name: "Dave Defender", position: "D" },
    { number: 3, name: "Sam Sweeper", position: "D" },
    { number: 4, name: "Matt Midfielder", position: "M" },
    { number: 5, name: "William Winger", position: "M" },
    { number: 6, name: "Fillipe Forward", position: "F" }
  ],
  all: function() { return this.players},
  get: function(id) {
    const isPlayer = p => p.number === id
    return this.players.find(isPlayer)
  }
}

// The FullRoster iterates over all of the players and creates
// a link to their profile page.
class FullRoster extends React.Component {
  render() {
    return (
  <div>
    <ul>
      {
        PlayerAPI.all().map(p => (
          <li key={p.number}>
            <Link to={`/roster/${p.number}`}>{p.name}</Link>
          </li>
        ))
      }
    </ul>
  </div>
)
}
}
// The Player looks up the player using the number parsed from
// the URL's pathname. If no player is found with the given
// number, then a "player not found" message is displayed.
const Player = (props) => {
  const player = PlayerAPI.get(
    parseInt(props.match.params.number, 10)
  )
  if (!player) {
    return <div>Sorry, but the player was not found</div>
  }
  return (
    <div>
      <h1>{player.name} (#{player.number})</h1>
      <h2>Position: {player.position}</h2>
      <Link to='/roster'>Back</Link>
    </div>
  )
}

// The Roster component matches one of two different routes
// depending on the full pathname
class Roster extends React.Component {
  render() {
    return (
  <Switch>
    <Route exact path='/roster' component={FullRoster}/>
    <Route path='/roster/:number' component={Player}/>
  </Switch>
)
}
}

class Schedule extends React.Component {
  render() {
    return (
  <div>
    <ul>
      <li>6/5 @ Evergreens</li>
      <li>6/8 vs Kickers</li>
      <li>6/14 @ United</li>
    </ul>
  </div>
)
}
}

class Home extends React.Component {
  render() {
    return (
  <div>
    <h1>Welcome to the Tornadoes Website!</h1>
  </div>
)
}
}

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
class Main extends React.Component {
  render() {
    return (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/roster' component={Roster}/>
      <Route path='/schedule' component={Schedule}/>
    </Switch>
  </main>
)
}
}
// The Header creates links that can be used to navigate
// between routes.
class Header extends React.Component {
  render() {
    return (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/roster'>Roster</Link></li>
        <li><Link to='/schedule'>Schedule</Link></li>
      </ul>
    </nav>
  </header>
)}}

class App extends React.Component {
  render() {
    return (
  <div>
    <Header />
    <Main />
  </div>
)
}
}
// This demo uses a HashRouter instead of BrowserRouter
// because there is no server to match URLs
ReactDOM.render((
  <HashRouter>
    <App />
  </HashRouter>
), document.getElementById('root'))

// <Switch>
//   <Route exact path="/" component={Home}/>
//   <Route path="/about" component={About}/>
//   <Route path="/:user" component={User}/>
//   <Route component={NoMatch}/>
// </Switch>
