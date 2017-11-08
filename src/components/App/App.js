import React from 'react'
import { Switch, Route } from 'react-router'
import NotFoundPage from '../NotFoundPage'

const App = () => (
  <Switch>
    <Route component={NotFoundPage} />
  </Switch>
)

export default App
