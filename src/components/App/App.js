import React from 'react'
import { Switch, Route } from 'react-router'
import routes from '../../routes'

const App = () => (
  <Switch>
    {routes.map((route, idx) => <Route key={`route-${idx}`} {...route} />)}
  </Switch>
)

export default App
