"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _semver = _interopRequireDefault(require("semver"));

var _getDefaultSassImplementation = _interopRequireDefault(require("./getDefaultSassImplementation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSassImplementation(implementation) {
  let resolvedImplementation = implementation;

  if (!resolvedImplementation) {
    // eslint-disable-next-line no-param-reassign
    resolvedImplementation = (0, _getDefaultSassImplementation.default)();
  }

  const {
    info
  } = resolvedImplementation;

  if (!info) {
    throw new Error('Unknown Sass implementation.');
  }

  const infoParts = info.split('\t');

  if (infoParts.length < 2) {
    throw new Error(`Unknown Sass implementation "${info}".`);
  }

  const [implementationName, version] = infoParts;

  if (implementationName === 'dart-sass') {
    if (!_semver.default.satisfies(version, '^1.3.0')) {
      throw new Error(`Dart Sass version ${version} is incompatible with ^1.3.0.`);
    }

    return resolvedImplementation;
  } else if (implementationName === 'node-sass') {
    if (!_semver.default.satisfies(version, '^4.0.0')) {
      throw new Error(`Node Sass version ${version} is incompatible with ^4.0.0.`);
    }

    return resolvedImplementation;
  }

  throw new Error(`Unknown Sass implementation "${implementationName}".`);
}

var _default = getSassImplementation;
exports.default = _default;