const path = require('path')
const webpack = require('webpack')
const jp = require('jsonpath')
const package = require('./package.json')
const boolean = require('boolean')

module.exports = ({ DEV = false }) => {

  DEV = boolean(DEV)

  /*
   * Base Config
   * ===========
   * Applies to server and client, develop and build
   */

  const baseConfig = {
    module: { rules: [] },
    devtool: DEV ? 'cheap-module-inline-source-map' : 'source-map'
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
      }
    }, {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: (loader) => [
          require('postcss-import')({ root: loader.resourcePath }),
          require('postcss-custom-properties'),
          require('autoprefixer')({ browsers: package.browserslist })
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

  serverConfig.externals = require('webpack-node-externals')({
    whitelist: ['reset-css']
  })

  serverConfig.output = {
    path: path.resolve(__dirname, DEV ? '.tmp' : 'build'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    publicPath: '/assets/'
  }

  serverConfig.plugins = [
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(DEV ? 'development' : 'production'),
      __BROWSER__: false,
      __DEV__: DEV
    })
  ]

  // Add target to Babel env preset
  const serverBabelEnvPreset = jp.value(
    serverConfig,
    '$..[?(@.loader===\'babel-loader\')].options.presets'
  ).find(preset => preset[0] === 'env')
  serverBabelEnvPreset[1].targets = { node: package.engines.node }

  if (DEV) {
    serverConfig.plugins.push( 
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    )
  }


  /*
   * Client Config
   * =============
   */
  const clientConfig = { ...baseConfig }

  clientConfig.name = 'client'
  clientConfig.entry = './src/client.js'

  clientConfig.output = {
    path: path.resolve(__dirname, 'build'),
    filename: 'client.js',
    publicPath: '/assets/',
    sourceMapFilename: '[file].map'
  }

  // Add target to Babel env preset
  const clientBabelEnvPreset = jp.value(
    clientConfig,
    '$..[?(@.loader===\'babel-loader\')].options.presets'
  ).find(preset => preset[0] === 'env')
  clientBabelEnvPreset[1].targets = { browsers: package.browserslist }

  clientConfig.plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(DEV ? 'development' : 'production'),
      __BROWSER__: true,
      __DEV__: DEV
    })
  ]

  if (DEV) {
    clientConfig.entry = ['webpack-hot-middleware/client', clientConfig.entry]

    clientConfig.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    )
  } else {
    clientConfig.externals = {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'react-router': 'ReactRouter',
      'react-router-dom': 'ReactRouterDOM',
    }
  }

  return [serverConfig, clientConfig]
}
