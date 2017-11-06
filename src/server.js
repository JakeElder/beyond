import React from 'react'
import ReactDOM from 'react-dom/server'
import Koa from 'koa'
import App from './components/App'
import InsertCSSProvider from './components/InsertCSSProvider'
import { StaticRouter } from 'react-router'
import resetCSS from 'reset-css'
import serve from 'koa-static'
import mount from 'koa-mount'
import reducer from './redux/reducers'
import { createStore } from 'redux'
import { Provider as StoreProvider } from 'react-redux'

const app = new Koa()

app.use(mount('/assets', serve(__DEV__ ? '.tmp' : 'build')))

app.use(ctx => {
  const context = {}
  const css = new Set()

  const store = createStore(reducer)

  const html = ReactDOM.renderToString(
    <StaticRouter
      location={ctx.url}
      context={context}
    >
      <StoreProvider store={store}>
        <InsertCSSProvider css={css}>
          <App />
        </InsertCSSProvider>
      </StoreProvider>
    </StaticRouter>
  )

  if (context.statusCode) { ctx.status = context.statusCode }

  const scripts = []

  if (!__DEV__) {
    const { dependencies } = require('../package.json')
    scripts.push(
      `https://unpkg.com/react@${dependencies['react']}/umd/react.production.min.js`,
      `https://unpkg.com/react-dom@${dependencies['react-dom']}/umd/react-dom.production.min.js`,
      `https://unpkg.com/react-router@${dependencies['react-router']}/umd/react-router.min.js`,
      `https://unpkg.com/react-router-dom@${dependencies['react-router']}/umd/react-router-dom.min.js`
    )
  }

  ctx.body = `
    <!doctype html>
    <head>
      <link rel="stylesheet" href=${resetCSS} />
      ${scripts.map(src => `<script src="${src}"></script>`).join('\n')}
      <style id="css">${[...css].join('')}</style>
    </head>
    <body>
      <div id="app">${html}</div>
      <script>window.__APP_STATE__ = ${JSON.stringify(store.getState())}</script>
      <script src="/assets/client.js"></script>
    </body>
  `
})

if (!__DEV__) {
  app.listen(80, () => console.log('App listening on port 80'))
}

if (module.hot) {
  app.hot = module.hot
  module.hot.accept('./components/App')
}

export default app
