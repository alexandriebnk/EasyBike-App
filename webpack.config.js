const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry:  './src/js/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/bundle.js'
	},
	devServer : {
		contentBase: './dist'
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
              { from: './src/img', to: 'img' }
            ],
          })
	],
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader', 
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.sc|ass$/,
				use: [
					{ loader: 'css-loader' },          
					{ loader: 'sass-loader' }
				]
	  		},
			{
				test: /\.(eot|ttf|woff|woff2)$/,
				loader: 'file-loader',
				options: {
		  			name: 'fonts/[name].[hash].[ext]'
				}
	  		},
			{
	   			test: /\.(gif|png|jpe?g|svg)$/i,
	   			use: [
					'file-loader',
					{ loader: 'image-webpack-loader' },
	   			]
	  		}
		]
	}
};
