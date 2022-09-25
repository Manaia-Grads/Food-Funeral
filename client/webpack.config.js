const path = require('path')

module.exports = {
  entry: ['./client/index.js'],
  output: {
    path: path.join(__dirname, '..', 'server', 'public'),
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      stream: false,
      util: false,
      fs: false,
      os: false,
      path: false,
      crypto: false,
      buffer: false,
    },
  },
  devtool: 'source-map',
}
