"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _loaderUtils = _interopRequireDefault(require("loader-utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Examples:
// - ~package
// - ~package/
// - ~@org
// - ~@org/
// - ~@org/package
// - ~@org/package/
const matchModuleImport = /^~([^/]+|[^/]+\/|@[^/]+[/][^/]+|@[^/]+\/?|@[^/]+[/][^/]+\/)$/;
/**
 * When libsass tries to resolve an import, it uses a special algorithm.
 * Since the sass-loader uses webpack to resolve the modules, we need to simulate that algorithm. This function
 * returns an array of import paths to try. The last entry in the array is always the original url
 * to enable straight-forward webpack.config aliases.
 *
 * @param {string} url
 * @returns {Array<string>}
 */

function importsToResolve(url) {
  const request = _loaderUtils.default.urlToRequest(url); // Keep in mind: ext can also be something like '.datepicker' when the true extension is omitted and the filename contains a dot.
  // @see https://github.com/webpack-contrib/sass-loader/issues/167


  const ext = _path.default.extname(request).toLowerCase(); // In case there is module request, send this to webpack resolver


  if (matchModuleImport.test(url)) {
    return [request, url];
  } // Because @import is also defined in CSS, Sass needs a way of compiling plain CSS @imports without trying to import the files at compile time.
  // To accomplish this, and to ensure SCSS is as much of a superset of CSS as possible, Sass will compile any @imports with the following characteristics to plain CSS imports:
  //  - imports where the URL ends with .css.
  //  - imports where the URL begins http:// or https://.
  //  - imports where the URL is written as a url().
  //  - imports that have media queries.
  //
  // The `node-sass` package sends `@import` ending on `.css` to importer, it is bug, so we skip resolve


  if (ext === '.css') {
    return [];
  }

  const dirname = _path.default.dirname(request);

  const basename = _path.default.basename(request); // In case there is file extension:
  //
  // 1. Try to resolve `_` file.
  // 2. Try to resolve file without `_`.
  // 3. Send a original url to webpack resolver, maybe it is alias.


  if (['.scss', '.sass'].includes(ext)) {
    return [`${dirname}/_${basename}`, `${dirname}/${basename}`, url];
  } // In case there is no file extension and filename starts with `_`:
  //
  // 1. Try to resolve files with `scss`, `sass` and `css` extensions.
  // 2. Try to resolve directory with `_index` or `index` filename.
  // 3. Send the original url to webpack resolver, maybe it's alias.


  if (basename.startsWith('_')) {
    return [`${request}.scss`, `${request}.sass`, `${request}.css`, request, url];
  } // In case there is no file extension and filename doesn't start with `_`:
  //
  // 1. Try to resolve file starts with `_` and with extensions
  // 2. Try to resolve file with extensions
  // 3. Try to resolve directory with `_index` or `index` filename.
  // 4. Send a original url to webpack resolver, maybe it is alias.


  return [`${dirname}/_${basename}.scss`, `${dirname}/_${basename}.sass`, `${dirname}/_${basename}.css`, `${request}.scss`, `${request}.sass`, `${request}.css`, request, url];
}

var _default = importsToResolve;
exports.default = _default;