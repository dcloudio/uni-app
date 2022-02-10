"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _importsToResolve = _interopRequireDefault(require("./importsToResolve"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name PromisedResolve
 * @type {Function}
 * @param {string} dir
 * @param {string} request
 * @returns Promise
 */

/**
 * @name Importer
 * @type {Function}
 * @param {string} url
 * @param {string} prev
 * @param {Function<Error, string>} done
 */
const matchCss = /\.css$/i;
/**
 * Returns an importer that uses webpack's resolving algorithm.
 *
 * It's important that the returned function has the correct number of arguments
 * (based on whether the call is sync or async) because otherwise node-sass doesn't exit.
 *
 * @param {string} resourcePath
 * @param {PromisedResolve} resolve
 * @param {Function<string>} addNormalizedDependency
 * @returns {Importer}
 */
const fs = require('fs')
const preprocessor = require('../../webpack-preprocess-loader/preprocess/lib/preprocess')
const {
  cssPreprocessOptions,
  nvueCssPreprocessOptions
} = require('@dcloudio/uni-cli-shared')
// fixed by xxxxxx
function webpackImporter(resourcePath, resolve, addNormalizedDependency, isNVue) {
  function dirContextFrom(fileContext) {
    return _path.default.dirname( // The first file is 'stdin' when we're using the data option
    fileContext === 'stdin' ? resourcePath : fileContext);
  } // eslint-disable-next-line no-shadow


  function startResolving(dir, importsToResolve) {
    return importsToResolve.length === 0 ? Promise.reject() : resolve(dir, importsToResolve[0]).then(resolvedFile => {
      // Add the resolvedFilename as dependency. Although we're also using stats.includedFiles, this might come
      // in handy when an error occurs. In this case, we don't get stats.includedFiles from node-sass.
      addNormalizedDependency(resolvedFile);
      // fixed by xxxxxx
      const file = resolvedFile.replace(matchCss, '')
      if (fs.existsSync(file)) {
        const contents = fs.readFileSync(file, 'utf8')
        if (contents.includes('#endif')) {
          return {
            file,
            contents: preprocessor.preprocess(contents, isNVue ? nvueCssPreprocessOptions.context : cssPreprocessOptions.context, {
              type: cssPreprocessOptions.type
            })
          }
        }
      }
      return {
        // By removing the CSS file extension, we trigger node-sass to include the CSS file instead of just linking it.
        file: resolvedFile.replace(matchCss, '')
      };
    }, () => {
      const [, ...tailResult] = importsToResolve;
      return startResolving(dir, tailResult);
    });
  }

  return (url, prev, done) => {
    startResolving(dirContextFrom(prev), (0, _importsToResolve.default)(url)) // Catch all resolving errors, return the original file and pass responsibility back to other custom importers
    .catch(() => {
      return {
        file: url
      };
    }).then(done);
  };
}

var _default = webpackImporter;
exports.default = _default;
