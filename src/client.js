import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider as StoreProvider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { videoListPageNavigatedToWithoutDataSaga } from './redux/sagas/video-list-page-navigated-to-without-data'
import App from './components/App'
import reducer from './redux/reducers'

let initialRender = true

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducer,
  window.__APP_STATE__,
  composeEnhancers(applyMiddleware(...middleware))
)

sagaMiddleware.run(videoListPageNavigatedToWithoutDataSaga)

function render() {
  (initialRender ? ReactDOM.hydrate : ReactDOM.render)(
    <BrowserRouter>
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </BrowserRouter>,
    document.getElementById('app'),
    () => { initialRender = false }
  )
}

render()

if (module.hot) {
  module.hot.accept('./components/App', render)
}
