const path = require('path')
const webpack = require('webpack')
const fs = require('fs-extra')
const jp = require('jsonpath')
const package = require('./package.json')
const boolean = require('boolean')
const clone = require('clone')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

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
        ...fs.readJsonSync('./.babelrc'),
        babelrc: false
      }
    }
  })
  // Remove transform-postcss Babel transform used for testing
  const transformPostCSSIndex = baseConfig.module.rules[0]
    .use.options.plugins.findIndex(p => p === 'transform-postcss')
  baseConfig.module.rules[0]
    .use.options.plugins.splice(transformPostCSSIndex, 1)
  // Add modules: false to env preset to enable Webpack HMR for ES modules
  baseConfig.module.rules[0]
    .use.options.presets.find(p => p[0] === 'env')
    .push({ modules: false })

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
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        localIdentName: '[name]-[local]',
        modules: true,
        sourceMap: true,
        camelCase: true
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

  const serverConfig = clone(baseConfig)

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
      __DEV__: JSON.stringify(DEV)
    })
  ]

  // Add target to Babel env preset
  const serverBabelEnvPreset = jp.value(
    serverConfig,
    '$..[?(@.loader===\'babel-loader\')].options.presets'
  ).find(preset => preset[0] === 'env')
  serverBabelEnvPreset[1].targets = { node: package.engines.node }

  // Add css-modules-locals-loader to css rules
  const serverCssRules = jp.parent(
    serverConfig,
    '$..[?(@.loader===\'css-loader\')]'
  ).unshift({ loader: 'css-modules-locals-loader' })

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
  const clientConfig = clone(baseConfig)

  clientConfig.name = 'client'
  clientConfig.entry = ['babel-polyfill', './src/client.js']

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


  // Add style-loader to css rules
  clientConfig.module.rules[2].rules.unshift({
    loader: 'style-loader',
    options: { sourceMap: true }
  })

  if (DEV) {
    clientConfig.entry.splice(1, 0, 'webpack-hot-middleware/client')

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
      'react-router-dom': 'ReactRouterDOM'
    }
    clientConfig.module.rules[2].use = ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: clientConfig.module.rules[2].rules
    })
    delete clientConfig.module.rules[2].rules
    clientConfig.plugins.push(new ExtractTextPlugin('styles.css'))
  }

  return [serverConfig, clientConfig]
}
