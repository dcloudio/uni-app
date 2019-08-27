# optimize-cssnano-plugin [![Build Status](https://travis-ci.org/intervolga/optimize-cssnano-plugin.svg?branch=master)](https://travis-ci.org/intervolga/optimize-cssnano-plugin)

It will search for CSS assets during the Webpack build and minimize it with [cssnano](http://github.com/ben-eb/cssnano).
Solves [extract-text-webpack-plugin](http://github.com/webpack/extract-text-webpack-plugin) CSS duplication problem.

Just like [optimize-css-assets-webpack-plugin](http://github.com/NMFR/optimize-css-assets-webpack-plugin) but more accurate with source maps.

## Installation:

Using npm:
```shell
$ npm install --save-dev @intervolga/optimize-cssnano-plugin
```

## Configuration:

``` javascript
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');
module.exports = {
	module: {
		loaders: [
			{ test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") }
		]
	},
	plugins: [
    new ExtractTextPlugin("styles.css"),

    new OptimizeCssnanoPlugin({
      sourceMap: nextSourceMap,
      cssnanoOptions: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
        }],
      },
    }),
	]
}
```