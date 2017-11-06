import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider as StoreProvider } from 'react-redux'
import App from './components/App'
import InsertCSSProvider from './components/InsertCSSProvider'
import reducer from './redux/reducers'

let initialRender = true

const store = createStore(
  reducer,
  __DEV__ && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

function render() {
  (initialRender ? ReactDOM.hydrate : ReactDOM.render)(
    <BrowserRouter>
      <StoreProvider store={store}>
        <InsertCSSProvider>
          <App />
        </InsertCSSProvider>
      </StoreProvider>
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
  module.hot.accept('./components/App', render)
}
