import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider as StoreProvider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
// import { incrementRequestSaga } from './redux/sagas'
import App from './components/App'
import reducer from './redux/reducers'

let initialRender = true

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers(applyMiddleware(...middleware)))

// sagaMiddleware.run(incrementRequestSaga)

function render() {
  (initialRender ? ReactDOM.hydrate : ReactDOM.render)(
    <BrowserRouter>
      <StoreProvider store={store}>
        <App />
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
