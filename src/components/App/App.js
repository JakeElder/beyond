/* eslint-disable react/no-array-index-key */

import React from 'react'
import { Switch, Route } from 'react-router'
import routes from '../../routes'
import s from './App.css'

const App = () => (
  <div className={s.root}>
    <Switch>
      {routes.map((route, idx) => <Route key={`route-${idx}`} {...route} />)}
    </Switch>
  </div>
)

export default App
