import React from 'react'
import ReactDOM from 'react-dom/server'
import Koa from 'koa'
import App from './components/App'
import { StaticRouter } from 'react-router'

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
    <body>
      <div id="app">${html}</div>
    </body>
  `
})

if (module.hot) {
  app.hot = module.hot
  module.hot.accept('./components/App')
}

export default app
