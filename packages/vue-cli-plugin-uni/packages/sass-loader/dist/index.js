"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _schemaUtils = _interopRequireDefault(require("schema-utils"));

var _loaderUtils = require("loader-utils");

var _options = _interopRequireDefault(require("./options.json"));

var _getSassImplementation = _interopRequireDefault(require("./getSassImplementation"));

var _getSassOptions = _interopRequireDefault(require("./getSassOptions"));

var _webpackImporter = _interopRequireDefault(require("./webpackImporter"));

var _getRenderFunctionFromSassImplementation = _interopRequireDefault(require("./getRenderFunctionFromSassImplementation"));

var _SassError = _interopRequireDefault(require("./SassError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The sass-loader makes node-sass and dart-sass available to webpack modules.
 *
 * @this {object}
 * @param {string} content
 */
function loader(content) {
  const options = (0, _loaderUtils.getOptions)(this) || {};
  // fixed by xxxxxx
  const isNVue = !!options.nvue;
  (0, _schemaUtils.default)(_options.default, options, {
    name: 'Sass Loader',
    baseDataPath: 'options'
  });
  const implementation = (0, _getSassImplementation.default)(options.implementation);
  const callback = this.async();

  const addNormalizedDependency = file => {
    // node-sass returns POSIX paths
    this.addDependency(_path.default.normalize(file));
  };

  const sassOptions = (0, _getSassOptions.default)(this, options, content, implementation);
  const shouldUseWebpackImporter = typeof options.webpackImporter === 'boolean' ? options.webpackImporter : true;

  if (shouldUseWebpackImporter) {
    const resolve = this.getResolve({
      mainFields: ['sass', 'style', 'main', '...'],
      mainFiles: ['_index', 'index', '...'],
      extensions: ['.scss', '.sass', '.css', '...']
    });
    sassOptions.importer.push((0, _webpackImporter.default)(this.resourcePath, resolve, addNormalizedDependency, isNVue));
  } // Skip empty files, otherwise it will stop webpack, see issue #21


  if (sassOptions.data.trim() === '') {
    callback(null, '');
    return;
  }

  const render = (0, _getRenderFunctionFromSassImplementation.default)(implementation);
  render(sassOptions, (error, result) => {
    if (error) {
      if (error.file) {
        addNormalizedDependency(error.file);
      }

      callback(new _SassError.default(error, this.resourcePath));
      return;
    }

    if (result.map && result.map !== '{}') {
      // eslint-disable-next-line no-param-reassign
      result.map = JSON.parse(result.map); // result.map.file is an optional property that provides the output filename.
      // Since we don't know the final filename in the webpack build chain yet, it makes no sense to have it.
      // eslint-disable-next-line no-param-reassign

      delete result.map.file; // One of the sources is 'stdin' according to dart-sass/node-sass because we've used the data input.
      // Now let's override that value with the correct relative path.
      // Since we specified options.sourceMap = path.join(process.cwd(), "/sass.map"); in getSassOptions,
      // we know that this path is relative to process.cwd(). This is how node-sass works.
      // eslint-disable-next-line no-param-reassign

      const stdinIndex = result.map.sources.findIndex(source => source.includes('stdin'));

      if (stdinIndex !== -1) {
        // eslint-disable-next-line no-param-reassign
        result.map.sources[stdinIndex] = _path.default.relative(process.cwd(), this.resourcePath);
      } // node-sass returns POSIX paths, that's why we need to transform them back to native paths.
      // This fixes an error on windows where the source-map module cannot resolve the source maps.
      // @see https://github.com/webpack-contrib/sass-loader/issues/366#issuecomment-279460722
      // eslint-disable-next-line no-param-reassign


      result.map.sourceRoot = _path.default.normalize(result.map.sourceRoot); // eslint-disable-next-line no-param-reassign

      result.map.sources = result.map.sources.map(_path.default.normalize);
    } else {
      // eslint-disable-next-line no-param-reassign
      result.map = null;
    }

    result.stats.includedFiles.forEach(addNormalizedDependency);
    callback(null, result.css.toString(), result.map);
  });
}

var _default = loader;
exports.default = _default;
