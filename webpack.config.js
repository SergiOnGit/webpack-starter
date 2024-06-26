const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
        app: './src/index.js'
    },
    devtool: 'inline-source-map',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    output: {
                        comments: false
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.ProvidePlugin({
			'$': 'jquery',
			Popper: ['popper.js', 'default'],
			'Util': 'exports-loader?Util!bootstrap/js/dist/util'
        }),
        new CopyWebpackPlugin([
            {
                from: './src/images', to: './images'
            }
        ])
    ],
	output: {
		filename: './js/app.bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
   	module: {
     	rules: [
       		{
         		test: /\.(scss)$/,
         		use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'app.bundle.css',
                            outputPath: './css/'
                        }
                    }, {
                        loader: 'extract-loader',
                        options: {
                            publicPath: '../'
                        }
                    }, {
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
                    },
			        {
			            loader: 'postcss-loader',
			            options: {
			              	plugins: function () {
				                return [
				                  	require('autoprefixer')
				                ];
			              	}
			            }
			        }
                ]
       		}, {
	         	test: /\.(png|svg|jpg|gif)$/,
	         	use: [{
	           		loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './images/'
                    }
	         	}]
	       	},
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './fonts/'
                    }
                }]
            }
     	]
   	}
};