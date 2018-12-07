function isFn (fn) {
  return typeof fn === 'function'
}

const SYNC_API_RE = /hideKeyboard|upx2px|canIUse|^create|Sync$|Manager$/;

const CALLBACK_API_RE = /^on/;

function isSyncApi (name) {
  return SYNC_API_RE.test(name)
}

function isCallbackApi (name) {
  return CALLBACK_API_RE.test(name)
}

function handlePromise (promise) {
  return promise.then(data => {
    return [null, data]
  })
    .catch(err => [err])
}

function shouldPromise (name) {
  if (isSyncApi(name)) {
    return false
  }
  if (isCallbackApi(name)) {
    return false
  }
  return true
}

function promisify (name, api) {
  if (!shouldPromise(name)) {
    return api
  }
  return function promiseApi (options = {}, ...params) {
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return api(options, ...params)
    }
    return handlePromise(new Promise((resolve, reject) => {
      api(Object.assign({}, options, {
        success: resolve,
        fail: reject
      }), ...params);
      /* eslint-disable no-extend-native */
      Promise.prototype.finally = function (callback) {
        const promise = this.constructor;
        return this.then(
          value => promise.resolve(callback()).then(() => value),
          reason => promise.resolve(callback()).then(() => {
            throw reason
          })
        )
      };
    }))
  }
}

const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;

function checkDeviceWidth () {
  const {
    platform,
    pixelRatio,
    windowWidth
  } = uni.getSystemInfoSync();

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px (number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0
  }
  number = (number / BASE_DEVICE_WIDTH) * (newDeviceWidth || deviceWidth);
  number = Math.floor(number + EPS);
  if (number === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1
    } else {
      return 0.5
    }
  }
  return number
}



var api = /*#__PURE__*/Object.freeze({

});

let uni$1 = {};

if (typeof Proxy !== 'undefined') {
  uni$1 = new Proxy({}, {
    get (target, name) {
      if (name === 'upx2px') {
        return upx2px
      }
      if (api[name]) {
        return promisify(name, api[name])
      }
      if (!wx.hasOwnProperty(name)) {
        return
      }
      return promisify(name, wx[name])
    }
  });
} else {
  uni$1.upx2px = upx2px;

  Object.keys(api).forEach(name => {
    uni$1[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(name => {
    if (wx.hasOwnProperty(name)) {
      uni$1[name] = promisify(name, wx[name]);
    }
  });
}

var uni$2 = uni$1;

export default uni$2;
