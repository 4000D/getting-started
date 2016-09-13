module.exports = {
	entry: [
		'./src/App.js',
	],

	output: {
		path: __dirname,
		filename: 'bundle.js'
	},

	module: {
		loader: [{
			test: /\.js?$/,
			loader: 'babel'
		}]
	}
};
