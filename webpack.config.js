const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry:  "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js"
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new CopyPlugin({
            patterns: [
              { from: './src/static', to: './files' }
            ],
          }),
    ],
	module: {
		rules: [
            {
                test: /\.scss$/,
                use: [
                    "style-loader", 
                    "css-loader", 
                    "sass-loader" 
                ]
            },
			{
				test: /\.png|jpg|gif$/,
				use: {
					loader : "file-loader",
					options : {
						outputPath: "files/img"
					}
				}
			},
			{
				test: /\.svg$/,
				use: {
					loader : "file-loader",
					options : {
						outputPath: "files/svg"
					}
				}
			},
			{
				test: /\.mp4|webm$/,
				use: {
					loader : "file-loader",
					options : {
						outputPath: "files/video"
					}
				}
			},
			{
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                            presets: ['@babel/preset-env'],
                            plugins: ["transform-class-properties"]
                    }
                }
            }
		]
	}
};
