const path = require("path");

module.exports = {
	entry:  "./src/js/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "js/bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				use: ["html-loader"]
			},
			{
				test: /\.png|jpg|gif$/,
				use: {
					loader : "file-loader",
					options : {
						name: "[name].[ext]",
						outputPath: "img"
					}
				}
			},
			{
				test: /\.svg$/,
				use: {
					loader : "file-loader",
					options : {
						name: "[name].[ext]",
						outputPath: "img/svg"
					}
				}
			},
			{
				test: /\.mp4|webm$/,
				use: {
					loader : "file-loader",
					options : {
						name: "[name].[ext]",
						outputPath: "video"
					}
				}
			},
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/,
				query: {
				  plugins: ["transform-class-properties"]
				}
			}
		]
	}
};
