"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _os = _interopRequireDefault(require("os"));

var _path = _interopRequireDefault(require("path"));

var _cloneDeep = _interopRequireDefault(require("clone-deep"));

var _proxyCustomImporters = _interopRequireDefault(require("./proxyCustomImporters"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isProductionLikeMode(loaderContext) {
  return loaderContext.mode === 'production' || !loaderContext.mode || loaderContext.minimize;
}
/**
 * Derives the sass options from the loader context and normalizes its values with sane defaults.
 *
 * @param {object} loaderContext
 * @param {object} loaderOptions
 * @param {string} content
 * @param {object} implementation
 * @returns {Object}
 */


function getSassOptions(loaderContext, loaderOptions, content, implementation) {
  const options = (0, _cloneDeep.default)(loaderOptions.sassOptions ? typeof loaderOptions.sassOptions === 'function' ? loaderOptions.sassOptions(loaderContext) || {} : loaderOptions.sassOptions : {});
  const isDartSass = implementation.info.includes('dart-sass');

  if (isDartSass) {
    const shouldTryToResolveFibers = !options.fiber && options.fiber !== false;

    if (shouldTryToResolveFibers) {
      let fibers;

      try {
        fibers = require.resolve('fibers');
      } catch (_error) {// Nothing
      }

      if (fibers) {
        // eslint-disable-next-line global-require, import/no-dynamic-require
        options.fiber = require(fibers);
      }
    } else if (options.fiber === false) {
      // Don't pass the `fiber` option for `sass` (`Dart Sass`)
      delete options.fiber;
    }
  } else {
    // Don't pass the `fiber` option for `node-sass`
    delete options.fiber;
  }

  options.data = loaderOptions.prependData ? typeof loaderOptions.prependData === 'function' ? loaderOptions.prependData(loaderContext) + _os.default.EOL + content : loaderOptions.prependData + _os.default.EOL + content : content; // opt.outputStyle

  if (!options.outputStyle && isProductionLikeMode(loaderContext)) {
    options.outputStyle = 'compressed';
  }

  const useSourceMap = typeof loaderOptions.sourceMap === 'boolean' ? loaderOptions.sourceMap : loaderContext.sourceMap; // opt.sourceMap
  // Not using the `this.sourceMap` flag because css source maps are different
  // @see https://github.com/webpack/css-loader/pull/40

  if (useSourceMap) {
    // Deliberately overriding the sourceMap option here.
    // node-sass won't produce source maps if the data option is used and options.sourceMap is not a string.
    // In case it is a string, options.sourceMap should be a path where the source map is written.
    // But since we're using the data option, the source map will not actually be written, but
    // all paths in sourceMap.sources will be relative to that path.
    // Pretty complicated... :(
    options.sourceMap = _path.default.join(process.cwd(), '/sass.map');

    if ('sourceMapRoot' in options === false) {
      options.sourceMapRoot = process.cwd();
    }

    if ('omitSourceMapUrl' in options === false) {
      // The source map url doesn't make sense because we don't know the output path
      // The css-loader will handle that for us
      options.omitSourceMapUrl = true;
    }

    if ('sourceMapContents' in options === false) {
      // If sourceMapContents option is not set, set it to true otherwise maps will be empty/null
      // when exported by webpack-extract-text-plugin.
      options.sourceMapContents = true;
    }
  }

  const {
    resourcePath
  } = loaderContext;

  const ext = _path.default.extname(resourcePath); // If we are compiling sass and indentedSyntax isn't set, automatically set it.


  if (ext && ext.toLowerCase() === '.sass' && 'indentedSyntax' in options === false) {
    options.indentedSyntax = true;
  } else {
    options.indentedSyntax = Boolean(options.indentedSyntax);
  } // Allow passing custom importers to `node-sass`. Accepts `Function` or an array of `Function`s.


  options.importer = options.importer ? (0, _proxyCustomImporters.default)(options.importer, resourcePath) : [];
  options.includePaths = (options.includePaths || []).concat(_path.default.dirname(resourcePath));
  return options;
}

var _default = getSassOptions;
exports.default = _default;