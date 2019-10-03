import React, { Component } from 'react'
import axios from 'axios'
import {Route, Switch, BrowserRouter, withRouter} from 'react-router-dom'
import filterBE from './components/filterBE'


export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route component={filterBE} path='/' exact />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
