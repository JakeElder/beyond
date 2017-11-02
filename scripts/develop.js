const path = require('path')
const webpack = require('webpack')
const config = require('../webpack.config')
const fs = require('fs-extra')
const Koa = require('koa')
const mount = require('koa-mount')
 
const TMP_DIR = path.resolve(__dirname, '..', '.tmp')
const SERVER_FILENAME = 'server.js'
const COMPILED_SERVER_FILE = path.resolve(TMP_DIR, SERVER_FILENAME)

const app = new Koa()


async function exit() {
  await fs.emptyDir(TMP_DIR)
  process.exit()
}

config.output = {
  path: TMP_DIR,
  filename: SERVER_FILENAME,
  libraryTarget: 'commonjs2'
}

config.plugins = config.plugins || []
config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
)

const compiler = webpack(config)
let initialCompile = true
let server

app.listen(3000, () => {
  console.log('listening')
})

compiler.watch({}, async (err, stats) => {

  // Check for errors
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
      app.middleware.splice(0, 1, mount(server))
      console.info(`Could not Hot Reload, app updated`)
    }
  }
})

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

process.on('SIGINT', exit)
