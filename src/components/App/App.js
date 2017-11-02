import React, { Component } from 'React'
import { Switch, Route } from 'react-router'
import Home from '../../pages/Home'
import About from '../../pages/About'

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    )
  }
}
