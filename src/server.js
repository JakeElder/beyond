import React from 'react'
import ReactDOM from 'react-dom/server'
import Koa from 'koa'
import App from './components/App'
import { StaticRouter } from 'react-router'
import resetCSS from 'reset-css'

const app = new Koa()

app.use(ctx => {
  const context = {}

  const html = ReactDOM.renderToString(
    <StaticRouter
      location={ctx.url}
      context={context}
    >
      <App />
    </StaticRouter>
  )

  ctx.body = `
    <!doctype html>
    <head>
      <link rel="stylesheet" href=${resetCSS} />
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
