import React from 'react'
import ReactDOM from 'react-dom/server'
import Koa from 'koa'
import resetCSS from 'reset-css'
import serve from 'koa-static'
import mount from 'koa-mount'
import { createStore } from 'redux'
import { Provider as StoreProvider } from 'react-redux'
import { StaticRouter } from 'react-router'

import App from './components/App'
import reducer from './redux/reducers'
import pkg from '../package.json'

const app = new Koa()

app.use(mount('/assets', serve(__DEV__ ? '.tmp' : 'build')))

app.use((ctx) => {
  const context = {}
  const css = new Set()

  const store = createStore(reducer)

  const html = ReactDOM.renderToString((
    <StaticRouter
      location={ctx.url}
      context={context}
    >
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </StaticRouter>
  ))

  if (context.statusCode) { ctx.status = context.statusCode }

  const scripts = []
  const styles = [resetCSS]

  if (!__DEV__) {
    const { dependencies } = pkg
    scripts.push(
      `https://unpkg.com/react@${dependencies.react}/umd/react.production.min.js`,
      `https://unpkg.com/react-dom@${dependencies['react-dom']}/umd/react-dom.production.min.js`,
      `https://unpkg.com/react-router@${dependencies['react-router']}/umd/react-router.min.js`,
      `https://unpkg.com/react-router-dom@${dependencies['react-router']}/umd/react-router-dom.min.js`
    )
    styles.push('/assets/styles.css')
  }

  ctx.body = `
    <!doctype html>
    <head>
      ${styles.map(s => `<link rel="stylesheet" href="${s}" />`).join('\n')}
      ${scripts.map(s => `<script src="${s}"></script>`).join('\n')}
    </head>
    <body>
      <div id="app">${html}</div>
      <script>window.__APP_STATE__ = ${JSON.stringify(store.getState())}</script>
      <script src="/assets/client.js"></script>
    </body>
  `
})

if (!__DEV__) {
  /* eslint-disable no-console */
  app.listen(80, () => console.log('App listening on port 80'))
  /* eslint-enable no-console */
}

if (module.hot) {
  app.hot = module.hot
  module.hot.accept('./components/App')
}

export default app
