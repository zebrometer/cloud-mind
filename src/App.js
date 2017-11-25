import './styles/App.css'

import React from 'react'
import logo  from './logo.svg'

import { HashRouter as Router, Route, Redirect } from 'react-router-dom'

import MapView from './views/MapView'

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Route path="/" render={props => {
            return (
              <div>
                <header className="app-header">
                  <img src={logo} className="app-logo" alt="logo" />
                  <h1 className="app-title">Cloud Mind</h1>
                </header>

                <Route exact path="/" component={MapView} />
              </div>
            )
          }} />
        </div>
      </Router>
    )
  }
}
