import './styles/App.css'
import 'font-awesome/css/font-awesome.min.css'

import React from 'react'

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
                  <div>
                    <i className="fa fa-cloud fa-5x app-logo" aria-hidden="true"></i>
                  </div>
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
