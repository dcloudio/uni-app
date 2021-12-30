"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _neoAsync = _interopRequireDefault(require("neo-async"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let nodeSassJobQueue = null;
/**
 * Verifies that the implementation and version of Sass is supported by this loader.
 *
 * @param {Object} implementation
 * @returns {Function}
 */

function getRenderFunctionFromSassImplementation(implementation) {
  const isDartSass = implementation.info.includes('dart-sass');

  if (isDartSass) {
    return implementation.render.bind(implementation);
  } // There is an issue with node-sass when async custom importers are used
  // See https://github.com/sass/node-sass/issues/857#issuecomment-93594360
  // We need to use a job queue to make sure that one thread is always available to the UV lib


  if (nodeSassJobQueue === null) {
    const threadPoolSize = Number(process.env.UV_THREADPOOL_SIZE || 4);
    nodeSassJobQueue = _neoAsync.default.queue(implementation.render.bind(implementation), threadPoolSize - 1);
  }

  return nodeSassJobQueue.push.bind(nodeSassJobQueue);
}

var _default = getRenderFunctionFromSassImplementation;
exports.default = _default;