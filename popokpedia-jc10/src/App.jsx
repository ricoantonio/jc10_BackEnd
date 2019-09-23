import React from 'react';
import {Switch,Route,withRouter} from 'react-router-dom'
import Login from './components/Login'

class App extends React.Component{
  render() {
    return (
      <div>
        {/* <Switch> */}
          {/* switch buat cek kalo ada pagenya ato nga */}
          <Route component={Login} path="/"/>
        {/* </Switch> */}
      </div>
    )
  }
}

export default withRouter(App);
