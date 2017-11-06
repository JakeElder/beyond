import React from 'react'
import { Switch, Route } from 'react-router'
import Home from '../../pages/Home'
import About from '../../pages/About'
import NotFound from '../../pages/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route component={NotFound} />
  </Switch>
)

export default App
