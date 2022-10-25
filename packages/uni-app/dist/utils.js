"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalize = exports.isPlainObject = exports.hasOwn = exports.extend = void 0;
exports.extend = Object.assign;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function (val, key) { return hasOwnProperty.call(val, key); };
exports.hasOwn = hasOwn;
var objectToString = Object.prototype.toString;
var toTypeString = function (value) {
    return objectToString.call(value);
};
var isPlainObject = function (val) {
    return toTypeString(val) === '[object Object]';
};
exports.isPlainObject = isPlainObject;
var cacheStringFunction = function (fn) {
    var cache = Object.create(null);
    return (function (str) {
        var hit = cache[str];
        return hit || (cache[str] = fn(str));
    });
};
exports.capitalize = cacheStringFunction(function (str) { return str.charAt(0).toUpperCase() + str.slice(1); });
