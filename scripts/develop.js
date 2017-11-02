const path = require('path')
const webpack = require('webpack')
const [serverConfig, clientConfig] = require('../webpack.config')
const fs = require('fs-extra')
const Koa = require('koa')
const mount = require('koa-mount')
const devMiddleware = require('koa-webpack-dev-middleware')
const hotMiddleware = require('koa-webpack-hot-middleware')

const TMP_DIR = path.resolve(__dirname, '..', '.tmp')
const SERVER_FILENAME = 'server.js'
const COMPILED_SERVER_FILE = path.resolve(TMP_DIR, SERVER_FILENAME)

const app = new Koa()

app.listen(3000, () => {
  console.log('listening')
})

async function exit() {
  await fs.emptyDir(TMP_DIR)
  process.exit()
}

async function processUpdates(hot) {
  const result = await hot.check()

  if (hot.status() === 'ready') {
    try {
      await hot.apply()
      return [true, result]
    } catch(e) {
      if (hot.status() === 'abort' || hot.status() === 'fail') {
        return [false, []]
      }
    }
  }

  return [false, []]
}

serverConfig.output = {
  path: TMP_DIR,
  filename: SERVER_FILENAME,
  libraryTarget: 'commonjs2'
}

serverConfig.plugins = serverConfig.plugins || []
serverConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
)

clientConfig.plugins = clientConfig.plugins || []
clientConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
)
clientConfig.entry = ['webpack-hot-middleware/client', clientConfig.entry]

const { compilers } = webpack([serverConfig, clientConfig])
const serverCompiler = compilers.find(c => c.name === 'server')
const clientCompiler = compilers.find(c => c.name === 'client')

app.use(devMiddleware(clientCompiler, { publicPath: '/assets/' }))
app.use(hotMiddleware(clientCompiler))

let initialCompile = true
let server

serverCompiler.watch({}, async (err, stats) => {
  if (stats.hasErrors()) {
    console.error(stats.toString({
      hash: false,
      version: false,
      timings: false,
      colors: true 
    }))
    return exit()
  }

  if (initialCompile) {
    server = require(COMPILED_SERVER_FILE).default
    app.use(mount(server))
    initialCompile = false
  } else {
    const [updated, disposedModules] = await processUpdates(server.hot)
    if (updated) {
      console.info(`Updated: ${disposedModules.join(',')}`)
    } else {
      delete require.cache[require.resolve(COMPILED_SERVER_FILE)]
      server = require(COMPILED_SERVER_FILE).default
      app.middleware.splice(2, 1, mount(server))
      console.info(`Could not Hot Reload, app updated`)
    }
  }
})

process.on('SIGINT', exit)
process.on('unhandledRejection', r => console.log(r));
