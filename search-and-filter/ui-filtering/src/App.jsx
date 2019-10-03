import React, { Component } from 'react'
import axios from 'axios'
import {Route, Switch, withRouter} from 'react-router-dom'
import filterBE from './components/filterBE'


export class App extends Component {
  render() {
    return (
        <Switch>
          <Route component={filterBE} path='/' exact />
        </Switch>
    )
  }
}

export default withRouter(App) 
