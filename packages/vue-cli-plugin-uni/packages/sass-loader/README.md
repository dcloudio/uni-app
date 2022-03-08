<div align="center">
  <img height="100"
    src="https://worldvectorlogo.com/logos/sass-1.svg">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]

# sass-loader

Loads a Sass/SCSS file and compiles it to CSS.

## Getting Started

To begin, you'll need to install `sass-loader`:

```console
npm install sass-loader node-sass webpack --save-dev
```

`sass-loader` requires you to install either [Node Sass](https://github.com/sass/node-sass) or [Dart Sass](https://github.com/sass/dart-sass) on your own (more documentation can be found below).
This allows you to control the versions of all your dependencies, and to choose which Sass implementation to use.

Chain the `sass-loader` with the [css-loader](https://github.com/webpack-contrib/css-loader) and the [style-loader](https://github.com/webpack-contrib/style-loader) to immediately apply all styles to the DOM or the [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) to extract it into a separate file.

Then add the loader to your Webpack configuration. For example:

**app.js**

```js
import './style.scss';
```

**style.scss**

```scss
$body-color: red;

body {
  color: $body-color;
}
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
};
```

Finally run `webpack` via your preferred method.

### Resolving `import` at-rules

Webpack provides an [advanced mechanism to resolve files](https://webpack.js.org/concepts/module-resolution/).

The `sass-loader` uses Sass's custom importer feature to pass all queries to the Webpack resolving engine. Thus you can import your Sass modules from `node_modules`. Just prepend them with a `~` to tell Webpack that this is not a relative import:

```scss
@import '~bootstrap';
```

It's important to only prepend it with `~`, because `~/` resolves to the home directory.
Webpack needs to distinguish between `bootstrap` and `~bootstrap` because CSS and Sass files have no special syntax for importing relative files.
Writing `@import "style.scss"` is the same as `@import "./style.scss";`

### Problems with `url(...)`

Since Sass implementations don't provide [url rewriting](https://github.com/sass/libsass/issues/532), all linked assets must be relative to the output.

- If you pass the generated CSS on to the `css-loader`, all urls must be relative to the entry-file (e.g. `main.scss`).
- If you're just generating CSS without passing it to the `css-loader`, it must be relative to your web root.

You will be disrupted by this first issue. It is natural to expect relative references to be resolved against the `.sass`/`.scss` file in which they are specified (like in regular `.css` files).

Thankfully there are a two solutions to this problem:

- Add the missing url rewriting using the [resolve-url-loader](https://github.com/bholloway/resolve-url-loader). Place it before `sass-loader` in the loader chain.
- Library authors usually provide a variable to modify the asset path. [bootstrap-sass](https://github.com/twbs/bootstrap-sass) for example has an `$icon-font-path`.

## Options

### `implementation`

The special `implementation` option determines which implementation of Sass to use.

By default the loader resolve the implementation based on your dependencies.
Just add required implementation to `package.json` (`node-sass` or `sass` package) and install dependencies.

Example where the `sass-loader` loader uses the `sass` (`dart-sass`) implementation:

**package.json**

```json
{
  "devDependencies": {
    "sass-loader": "^7.2.0",
    "sass": "^1.22.10"
  }
}
```

Example where the `sass-loader` loader uses the `node-sass` implementation:

**package.json**

```json
{
  "devDependencies": {
    "sass-loader": "^7.2.0",
    "node-sass": "^4.0.0"
  }
}
```

Beware the situation when `node-sass` and `sass` were installed! By default the `sass-loader` prefers `node-sass`. In order to avoid this situation you can use the `implementation` option.

The `implementation` options either accepts `node-sass` or `sass` (`Dart Sass`) as a module.

For example, to use Dart Sass, you'd pass:

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              // Prefer `dart-sass`
              implementation: require('sass'),
            },
          },
        ],
      },
    ],
  },
};
```

Note that when using `sass` (`Dart Sass`), **synchronous compilation is twice as fast as asynchronous compilation** by default, due to the overhead of asynchronous callbacks.
To avoid this overhead, you can use the [fibers](https://www.npmjs.com/package/fibers) package to call asynchronous importers from the synchronous code path.

We automatically inject the [`fibers`](https://github.com/laverdet/node-fibers) package (setup `sassOptions.fiber`) if is possible (i.e. you need install the [`fibers`](https://github.com/laverdet/node-fibers) package).

**package.json**

```json
{
  "devDependencies": {
    "sass-loader": "^7.2.0",
    "sass": "^1.22.10",
    "fibers": "^4.0.1"
  }
}
```

You can disable automatically injecting the [`fibers`](https://github.com/laverdet/node-fibers) package by passing a `false` value for the `sassOptions.fiber` option.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: false,
              },
            },
          },
        ],
      },
    ],
  },
};
```

You can also pass the `fiber` value using this code:

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
              },
            },
          },
        ],
      },
    ],
  },
};
```

### `sassOptions`

Type: `Object|Function`

Options for [Node Sass](https://github.com/sass/node-sass) or [Dart Sass](http://sass-lang.com/dart-sass) implementation.

> ℹ️ The `indentedSyntax` option has `true` value for the `sass` extension.

> ℹ️ Options such as `file` and `outFile` are unavailable.

> ℹ We recommend not to use the `sourceMapContents`, `sourceMapEmbed`, `sourceMapRoot` options because `sass-loader` automatically sets these options.

There is a slight difference between the `node-sass` and `sass` (`Dart Sass`) options.
Please consult documentation before using them:

- [Node Sass documentation](https://github.com/sass/node-sass/#options) for all available `node-sass` options.
- [Dart Sass documentation](https://github.com/sass/dart-sass#javascript-api) for all available `sass` options.

#### `Object`

Use and object for the Sass implementation setup.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                indentWidth: 4,
                includePaths: ['absolute/path/a', 'absolute/path/b'],
              },
            },
          },
        ],
      },
    ],
  },
};
```

#### `Function`

Allows to setup the Sass implementation by setting different options based on the loader context.

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: (loaderContext) => {
                // More information about available properties https://webpack.js.org/api/loaders/
                const { resourcePath, rootContext } = loaderContext;
                const relativePath = path.relative(rootContext, resourcePath);

                if (relativePath === 'styles/foo.scss') {
                  return {
                    includePaths: ['absolute/path/c', 'absolute/path/d'],
                  };
                }

                return {
                  includePaths: ['absolute/path/a', 'absolute/path/b'],
                };
              },
            },
          },
        ],
      },
    ],
  },
};
```

### `prependData`

Type: `String|Function`
Default: `undefined`

Prepends `Sass`/`SCSS` code before the actual entry file.
In this case, the `sass-loader` will not override the `data` option but just append the entry's content.

This is especially useful when some of your Sass variables depend on the environment:

> ℹ Since you're injecting code, this will break the source mappings in your entry file. Often there's a simpler solution than this, like multiple Sass entry files.

#### `String`

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              prependData: '$env: ' + process.env.NODE_ENV + ';',
            },
          },
        ],
      },
    ],
  },
};
```

#### `Function`

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              prependData: (loaderContext) => {
                // More information about available properties https://webpack.js.org/api/loaders/
                const { resourcePath, rootContext } = loaderContext;
                const relativePath = path.relative(rootContext, resourcePath);

                if (relativePath === 'styles/foo.scss') {
                  return '$value: 100px;';
                }

                return '$value: 200px;';
              },
            },
          },
        ],
      },
    ],
  },
};
```

### `sourceMap`

Type: `Boolean`
Default: depends on the `compiler.devtool` value

Enables/Disables generation of source maps.

By default generation of source maps depends on the [`devtool`](https://webpack.js.org/configuration/devtool/) option. All values enable source map generation except `eval` and `false` value.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};
```

> ℹ In some rare cases `node-sass` can output invalid source maps (it is a `node-sass` bug).
> In order to avoid this, you can try to update `node-sass` to latest version or you can try to set within `sassOptions` the `outputStyle` option to `compressed`.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            sourceMap: true,
            sassOptions: {
              outputStyle: 'compressed',
            },
          },
        ],
      },
    ],
  },
};
```

### `webpackImporter`

Type: `Boolean`
Default: `true`

Enables/Disables the default Webpack importer.

This can improve performance in some cases. Use it with caution because aliases and `@import` at-rules starting with `~` will not work. You can pass own `importer` to solve this (see [`importer docs`](https://github.com/sass/node-sass#importer--v200---experimental)).

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              webpackImporter: false,
            },
          },
        ],
      },
    ],
  },
};
```

## Examples

### Extracts CSS into separate files

For production builds it's recommended to extract the CSS from your bundle being able to use parallel loading of CSS/JS resources later on.

There are two possibilities to extract a style sheet from the bundle:

- [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) (use this, when using webpack 4 configuration. Works in all use-cases)
- [extract-loader](https://github.com/peerigon/extract-loader) (simpler, but specialized on the css-loader's output)

**webpack.config.js**

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // fallback to style-loader in development
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
```

### Source maps

Enables/Disables generation of source maps.

To enable CSS source maps, you'll need to pass the `sourceMap` option to the `sass-loader` _and_ the css-loader.

**webpack.config.js**

```javascript
module.exports = {
  devtool: 'source-map', // any "source-map"-like devtool is possible
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};
```

If you want to edit the original Sass files inside Chrome, [there's a good blog post](https://medium.com/@toolmantim/getting-started-with-css-sourcemaps-and-in-browser-sass-editing-b4daab987fb0). Checkout [test/sourceMap](https://github.com/webpack-contrib/sass-loader/tree/master/test) for a running example.

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](./.github/CONTRIBUTING.md)

## License

[MIT](./LICENSE)

[npm]: https://img.shields.io/npm/v/sass-loader.svg
[npm-url]: https://npmjs.com/package/sass-loader
[node]: https://img.shields.io/node/v/sass-loader.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/webpack-contrib/sass-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/sass-loader
[tests]: https://dev.azure.com/webpack-contrib/sass-loader/_apis/build/status/webpack-contrib.sass-loader?branchName=master
[tests-url]: https://dev.azure.com/webpack-contrib/sass-loader/_build/latest?definitionId=21&branchName=master
[cover]: https://codecov.io/gh/webpack-contrib/sass-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/sass-loader
[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=css-loader
[size-url]: https://packagephobia.now.sh/result?p=css-loader
