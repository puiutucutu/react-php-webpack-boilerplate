// note we are using ES5 CommonJS to import modules in node environment
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map', // cache source maps for faster rebuilds
  entry: ['babel-polyfill', path.join(__dirname,'src','index.js')], // emulates a full ES2015 environment for browsers on runtime
  output: {
    path: path.join(__dirname, 'dev'),
    filename: 'bundle.js',
    publicPath: '/assets/',
  },
  resolve: {
    extensions: ['','.js','.jsx'] // allows js and jsx file to be imported without specifying full extension
  },
  module: {
    loaders: [
      /**
       * Adding / Updating Loaders
       * -------------------------
       * The `url-loader` handles all assets unless explicitly excluded. The
       * exclude list must be updated when loaders are changed. When adding
       * a new loader, its `test` must be appended to the exclude list.
       */
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)(\?.*)?$/, // captures query string
          /\.css$/,
          /\.json$/,
          /\.svg$/
        ],
        // url loader embeds assets smaller than specified size as base64 data
        // urls to avoid extra requests, otherwise it reverts to `file-loader`
        loader: 'url-loader',
        query: {
          limit: 1000000, // 1 MB
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname,'src'),
        loader: 'babel-loader',
        query: {
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          presets: ['es2015','latest','react'],
          plugins: ['syntax-object-rest-spread','transform-class-properties']
        },
      },
      { test: /\.css$/,  loader: ExtractTextPlugin.extract('style-loader', ['css-loader?sourceMap']) },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader', ['css-loader?sourceMap&importLoaders=1','less-loader']) },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', ['css-loader?sourceMap&importLoaders=1','sass-loader']) },
      { test: /\.styl$/, loader: ExtractTextPlugin.extract('style-loader', ['css-loader?sourceMap&importLoaders=1','stylus-loader']) },
      {
        test: /\.svg$/,
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.HotModuleReplacementPlugin(),
    // make environment variables available to js code - if (process.env.NODE_ENV === 'development') {...}
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ],
  devServer: {
    publicPath: '/assets/',
    contentBase: path.join(__dirname, 'dev'), // entry base of webpack-dev-server
    historyApiFallback: true, // allows access to dev server from arbitrary url (needed to load a route like `/users/5` for react router)
    hot: true,
    noInfo: true,
    colors: true,
    inline: true,
  }
};
