const path = require('path')

const baseConfig = {
  module: {
    rules: [
      {
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
      }
    ]
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

const serverConfig = {
  name: 'server',
  entry: './src/server.js',
  target: 'node',
  ...baseConfig
}

module.exports = [serverConfig, clientConfig]
