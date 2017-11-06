const path = require('path')
const webpack = require('webpack')

module.exports = ({ DEV = false, PROD = false }) => {

  /*
   * Base Config
   * ===========
   * Applies to server and client, develop and build
   */

  const baseConfig = {
    module: {
      rules: []
    },
    devtool: 'cheap-module-eval-source-map'
  }

  // Loaders
  // -------

  // Babel
  baseConfig.module.rules.push({
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          ['react'],
          ['env', { modules: false }]
        ],
        plugins: [
          'transform-class-properties'
        ]
      }
    }
  })

  // Vendor CSS
  baseConfig.module.rules.push({
    test: /reset\.css$/,
    use: {
      loader: 'file-loader',
    }
  })

  // Application CSS
  baseConfig.module.rules.push({
    test: /\.css$/,
    include: path.resolve(__dirname, 'src'),
    rules: [{
      loader: 'isomorphic-style-loader',
      issuer: { not: [/\.css$/] }
    }, {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        localIdentName: DEV ? '[local]-[hash:base64:5]' : '[hash:base64:5]',
        modules: true,
        sourceMap: DEV
      }
    }, {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: (loader) => [
          require('postcss-import')({ root: loader.resourcePath }),
          require('postcss-custom-properties')
        ]
      }
    }]
  })

  /*
   * Server Config
   * =============
   */

  const serverConfig = { ...baseConfig }

  serverConfig.name = 'server'
  serverConfig.entry = './src/server.js'
  serverConfig.target = 'node'

  serverConfig.output = {
    path: path.resolve('.tmp'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    publicPath: '/assets/'
  }

  if (DEV) {
    serverConfig.plugins = [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
        __BROWSER__: false,
        __DEV__: true
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ]
  }


  /*
   * Client Config
   * =============
   */
  const clientConfig = { ...baseConfig }

  clientConfig.name = 'client'
  clientConfig.entry = './src/client.js'

  clientConfig.output = {
    filename: 'client.js',
    publicPath: '/assets/'
  }

  if (DEV) {
    clientConfig.entry = ['webpack-hot-middleware/client', clientConfig.entry]

    clientConfig.plugins = [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
        __BROWSER__: true,
        __DEV__: true
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ]
  }

  return [serverConfig, clientConfig]
}
