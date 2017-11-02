import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'

ReactDOM.hydrate((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'))

if (module.hot) {
  app.hot = module.hot
  module.hot.accept('./components/App', () => {
    ReactDOM.hydrate((
      <BrowserRouter>
        <App />
      </BrowserRouter>
    ), document.getElementById('app'))
  })
}
