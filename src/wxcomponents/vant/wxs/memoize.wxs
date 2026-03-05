/**
 * Simple memoize
 * wxs doesn't support fn.apply, so this memoize only support up to 2 args
 */

function isPrimitive(value) {
  var type = typeof value;
  return (
    type === 'boolean' ||
    type === 'number' ||
    type === 'string' ||
    type === 'undefined' ||
    value === null
  );
}

// mock simple fn.call in wxs
function call(fn, args) {
  if (args.length === 2) {
    return fn(args[0], args[1]);
  }

  if (args.length === 1) {
    return fn(args[0]);
  }

  return fn();
}

function serializer(args) {
  if (args.length === 1 && isPrimitive(args[0])) {
    return args[0];
  }
  var obj = {};
  for (var i = 0; i < args.length; i++) {
    obj['key' + i] = args[i];
  }
  return JSON.stringify(obj);
}

function memoize(fn) {
  var cache = {};

  return function() {
    var key = serializer(arguments);
    if (cache[key] === undefined) {
      cache[key] = call(fn, arguments);
    }

    return cache[key];
  };
}

module.exports.memoize = memoize;
