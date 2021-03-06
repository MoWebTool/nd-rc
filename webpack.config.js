var path = require('path')
var fs = require('fs')
var webpack = require('webpack')

module.exports = {
  entry: './src/index.js',

  output: {
    library: 'nd-rc',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        plugins: [
          'transform-runtime',
          'add-module-exports',
          'transform-decorators-legacy',
          'transform-react-remove-prop-types',
          'transform-react-constant-elements'
        ],
        presets: ['es2015', 'react', 'stage-0']
      }
    }],
    resolve: {
      extensions: ['', '.js', '.jsx', '.json']
    }
  },

  externals: [{
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  }, {
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'ReactDOM',
      commonjs: 'ReactDOM',
      amd: 'ReactDOM'
    }
  }, {
    'react-dom/server': {
      root: 'ReactDOMServer',
      commonjs2: 'ReactDOMServer',
      commonjs: 'ReactDOMServer',
      amd: 'ReactDOMServer'
    }
  }],

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}
