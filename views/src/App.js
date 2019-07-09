import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Profile from './components/Profile'
import Post from './components/Post'
import Menu from './Menu'

class App extends Component{
  render(){
    return(
      <div>
        <Menu/>
        <Switch>
          <Route path='/profile' component={Profile} />
          <Route path='/post' component={Post} />
        </Switch>
      </div>
    )
  }
}

export default App
