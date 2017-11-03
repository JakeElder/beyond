const path = require('path')

const baseConfig = {
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['react'],
            ['env', { modules: false }]
          ]
        }
      }
    }, {
      test: /reset\.css$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 1,
          mimetype: 'text/css'
        }
      }
    }]
  }
}

const clientConfig = {
  name: 'client',
  entry: './src/client.js',
  output: {
    filename: 'client.js',
    publicPath: '/assets/'
  },
  ...baseConfig
}

const serverConfig = { ...baseConfig }

serverConfig.name = 'server'
serverConfig.entry = './src/server.js'
serverConfig.target = 'node'

module.exports = [serverConfig, clientConfig]
