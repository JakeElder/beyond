import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'
import InsertCSSProvider from './components/InsertCSSProvider'

let initialRender = true

function render() {
  (initialRender ? ReactDOM.hydrate : ReactDOM.render)(
    <BrowserRouter>
      <InsertCSSProvider>
        <App />
      </InsertCSSProvider>
    </BrowserRouter>,
    document.getElementById('app'),
    () => {
      if (initialRender) {
        const elem = document.getElementById('css')
        if (elem) { elem.parentNode.removeChild(elem) }
        initialRender = false
      }
    }
  )
}

render()

if (module.hot) {
  app.hot = module.hot
  module.hot.accept('./components/App', render)
}
