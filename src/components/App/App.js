import React, { Component } from 'react'
import { Switch, Route } from 'react-router'
import Home from '../../pages/Home'
import About from '../../pages/About'
import Error from '../../pages/Error'

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route render={({ staticContext }) => {
          if (staticContext) { staticContext.statusCode = 404 }
          return <Error title="404" body="Page Not Found" />
        }} />
      </Switch>
    )
  }
}
