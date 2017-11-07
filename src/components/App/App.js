import React from 'react'
import { Switch, Route } from 'react-router'
import HomePage from '../../containers/HomePage'
import AboutPage from '../AboutPage'
import NotFoundPage from '../NotFoundPage'

const App = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/about" component={AboutPage} />
    <Route component={NotFoundPage} />
  </Switch>
)

export default App
