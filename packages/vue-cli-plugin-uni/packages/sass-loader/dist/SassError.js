"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class SassError extends Error {
  constructor(sassError, resourcePath) {
    super();
    this.name = 'SassError';
    this.originalSassError = sassError;
    this.loc = {
      line: sassError.line,
      column: sassError.column
    }; // Keep original error if `sassError.formatted` is unavailable

    this.message = `${this.name}: ${this.originalSassError.message}`;

    if (this.originalSassError.formatted) {
      this.message = `${this.name}: ${this.originalSassError.formatted.replace(/^Error: /, '').replace(/(\s*)stdin(\s*)/, `$1${resourcePath}$2`)}`; // Instruct webpack to hide the JS stack from the console.
      // Usually you're only interested in the SASS stack in this case.
      // eslint-disable-next-line no-param-reassign

      this.hideStack = true;
      Error.captureStackTrace(this, this.constructor);
    }
  }

}

var _default = SassError;
exports.default = _default;