# Wrap loader for webpack [![Version](https://img.shields.io/npm/v/wrap-loader.svg)](https://www.npmjs.com/package/wrap-loader) [![Build Status](https://img.shields.io/travis/unindented/wrap-loader.svg)](http://travis-ci.org/unindented/wrap-loader)

Adds custom content before and after the loaded source.


## Installation

```sh
$ npm install --save wrap-loader
```


## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

In your `webpack.config.js` file:

```js
module.exports = {
  module: {
    loaders: [{
      test:   /\.less$/,
      loader: 'style!css!less!wrap?less'
    }]
  },

  wrap: {
    less: {
      before: [
        '@import "~bootstrap/less/variables.less";',
        '@import "~bootstrap/less/mixins.less";'
      ],
      after: '@import "~utils/debug.less";'
    }
  }
};
```


## Meta

* Code: `git clone git://github.com/unindented/wrap-loader.git`
* Home: <https://github.com/unindented/wrap-loader/>


## Contributors

* Daniel Perez Alvarez ([unindented@gmail.com](mailto:unindented@gmail.com))


## License

Copyright (c) 2014 Daniel Perez Alvarez ([unindented.org](http://unindented.org/)). This is free software, and may be redistributed under the terms specified in the LICENSE file.
