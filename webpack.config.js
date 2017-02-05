const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/client/src/app'),
  output: {
    path: path.join(__dirname, '/client/dist/js'),
    filename: 'app.js',
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, '/client/src'),
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.styl$/,
        loaders: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /(\.css)$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'url-loader'
      }
    ]
  },
  watch: true
};
