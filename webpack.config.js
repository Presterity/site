const path = require('path');

module.exports = {

  devtool: 'source-map',

  entry: {
    // client: './client/Client.jsx',
    server: './components/Components.jsx'
  },

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
    ]
  },

  output: {
    filename: '[name].js',
    libraryTarget: 'umd', /* So output can work in Node and in browser */
    path: path.resolve(__dirname, 'dist')
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  }

};
