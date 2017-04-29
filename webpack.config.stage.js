// note we are using ES5 CommonJS to import modules in node environment
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map', // regenerates source maps
  entry: ['babel-polyfill', path.join(__dirname,'src2','index.js')], // emulates a full ES2015 environment for browsers on runtime
  output: {
    path: path.join(__dirname,'public','assets'), // full path to output folder
    filename: 'bundle.js',
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
          limit: 1000000, // 1 mb
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname,'src2'),
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
      { test: /\.css$/,  loader: ExtractTextPlugin.extract('style-loader', ['css-loader?importLoaders=1','postcss-loader']) },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader', ['css-loader?importLoaders=1','postcss-loader','less-loader']) },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', ['css-loader?importLoaders=1','postcss-loader','sass-loader']) },
      { test: /\.styl$/, loader: ExtractTextPlugin.extract('style-loader', ['css-loader?importLoaders=1','postcss-loader','stylus-loader']) },
      {
        test: /\.svg$/,
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  postcss: function() {
    return [
      // adds vendor prefixes to css properties
      autoprefixer({
        flexbox: 'no-2009', // will add prefixes only for final and ie versions of specification
        browsers: ['not ie < 9'] , // React doesn't support IE8 anyway
      })
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    // make environment variables available to js code: if (process.env.NODE_ENV === 'development') {...}
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('staging')
      }
    })
  ]
};
