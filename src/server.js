import React from 'react'
import ReactDOM from 'react-dom/server'
import Koa from 'koa'
import App from './components/App'
import InsertCSSProvider from './components/InsertCSSProvider'
import { StaticRouter } from 'react-router'
import resetCSS from 'reset-css'
import serve from 'koa-static'
import mount from 'koa-mount'

const app = new Koa()

if (__DEV__) {
  app.use(mount('/assets', serve('.tmp')))
}

app.use(ctx => {
  const context = {}
  const css = new Set()

  const html = ReactDOM.renderToString(
    <StaticRouter
      location={ctx.url}
      context={context}
    >
      <InsertCSSProvider css={css}>
        <App />
      </InsertCSSProvider>
    </StaticRouter>
  )

  ctx.body = `
    <!doctype html>
    <head>
      <link rel="stylesheet" href=${resetCSS} />
      <style id="css">${[...css].join('')}</style>
    </head>
    <body>
      <div id="app">${html}</div>
      <script src="/assets/client.js"></script>
    </body>
  `
})

if (module.hot) {
  app.hot = module.hot
  module.hot.accept('./components/App')
}

export default app
