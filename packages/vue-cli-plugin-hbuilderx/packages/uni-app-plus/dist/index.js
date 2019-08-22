var isFn = function isFn(v) {
  return typeof v === 'function';
};

var handlePromise = function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err];
  });
};

var REGEX = /^on|^create|Sync$|Manager$|^pause/;
var API_NORMAL_LIST = ['os', 'stopRecord', 'stopVoice', 'stopBackgroundAudio', 'stopPullDownRefresh', 'hideKeyboard', 'hideToast', 'hideLoading', 'showNavigationBarLoading', 'hideNavigationBarLoading', 'canIUse', 'navigateBack', 'closeSocket', 'pageScrollTo', 'drawCanvas'];

var shouldPromise = function shouldPromise(name) {
  if (REGEX.test(name) && name !== 'createBLEConnection') {
    return false;
  }
  if (~API_NORMAL_LIST.indexOf(name)) {
    return false;
  }
  return true;
};

var promisify = function promisify(api) {
  return function () {
    for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return api.apply(undefined, [options].concat(params));
    }
    return handlePromise(new Promise(function (resolve, reject) {
      api.apply(undefined, [Object.assign({}, options, {
        success: resolve,
        fail: reject
      })].concat(params));
      /* eslint-disable no-extend-native */
      Promise.prototype.finally = function (callback) {
        var promise = this.constructor;
        return this.then(function (value) {
          return promise.resolve(callback()).then(function () {
            return value;
          });
        }, function (reason) {
          return promise.resolve(callback()).then(function () {
            throw reason;
          });
        });
      };
    }));
  };
};

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {
  var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
      platform = _wx$getSystemInfoSync.platform,
      pixelRatio = _wx$getSystemInfoSync.pixelRatio,
      windowWidth = _wx$getSystemInfoSync.windowWidth;

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function transformUpx(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  if (number === 0) {
    return 0;
  }

  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

function requireNativePlugin(pluginName) {
  /* eslint-disable no-undef */
  return __requireNativePlugin__(pluginName);
}

var uni = {};

var baseUni = {
  os: {
    plus: true
  }
};

if (typeof Proxy !== 'undefined') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (baseUni.hasOwnProperty(name)) {
        return baseUni[name];
      }

      if (name === 'upx2px') {
        return transformUpx;
      }
      if (name === 'requireNativePlugin') {
        return requireNativePlugin;
      }
      if (!wx.hasOwnProperty(name)) {
        return;
      }
      if (shouldPromise(name)) {
        return promisify(wx[name]);
      }
      return wx[name];
    }
  });
} else {
  uni.upx2px = transformUpx;

  uni.requireNativePlugin = requireNativePlugin;

  Object.keys(baseUni).forEach(function (key) {
    uni[key] = baseUni[key];
  });

  Object.keys(wx).forEach(function (key) {
    if (wx.hasOwnProperty(key)) {
      if (shouldPromise(key)) {
        uni[key] = promisify(wx[key]);
      } else {
        uni[key] = wx[key];
      }
    }
  });
}

var uni$1 = uni;

export default uni$1;
