import Koa from 'koa'
import response from './response'

const app = new Koa()

app.use(ctx => {
  ctx.body = response
})

if (module.hot) {
  app.hot = module.hot
  module.hot.accept('./response')
}

export default app
