var hasOwnProperty = Object.prototype.hasOwnProperty
var hasOwn = function (val, key) {
  return hasOwnProperty.call(val, key)
}
var isUndef = function (v) {
  return v === undefined || v === null
}
var isArray = Array.isArray
var isPromise = function (obj) {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  )
}
var cacheStringFunction = function (fn) {
  var cache = Object.create(null)
  return function (str) {
    var hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}
var camelizeRE = /-(\w)/g
var camelize = cacheStringFunction(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : ''
  })
})
var capitalize = cacheStringFunction(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
})
var PATH_RE =
  /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g
function getPaths(path, data) {
  if (isArray(path)) {
    return path
  }
  if (data && hasOwn(data, path)) {
    return [path]
  }
  var res = []
  path.replace(PATH_RE, function (match, p1, offset, string) {
    res.push(offset ? string.replace(/\\(\\)?/g, '$1') : p1 || match)
    return string
  })
  return res
}
function getDataByPath(data, path) {
  var paths = getPaths(path, data)
  var dataPath
  for (dataPath = paths.shift(); !isUndef(dataPath); ) {
    if (null == (data = data[dataPath])) {
      return
    }
    dataPath = paths.shift()
  }
  return data
}

function getPageId(page) {
  if (page.__wxWebviewId__) {
    //mp-weixin
    return page.__wxWebviewId__
  }
  if (page.privateProperties) {
    //mp-baidu
    return page.privateProperties.slaveId
  }
  if (page.$page) {
    //h5 and app-plus
    return page.$page.id
  }
}
function getPagePath(page) {
  return page.route || page.uri
}
function getPageQuery(page) {
  return page.options || (page.$page && page.$page.options) || {}
}
function parsePage(page) {
  return {
    id: getPageId(page),
    path: getPagePath(page),
    query: getPageQuery(page),
  }
}
function getPageById(id) {
  return getCurrentPages().find(function (page) {
    return getPageId(page) === id
  })
}
function getPageVm(id) {
  var page = getPageById(id)
  return page && page.$vm
}
function getNodeId(scope) {
  return scope.__wxExparserNodeId__ || scope.nodeId || scope.id
}
function matchNodeId(vm, nodeId) {
  return vm.$scope && getNodeId(vm.$scope) === nodeId
}
function findComponentVm(vm, nodeId) {
  var res
  if (vm) {
    if (matchNodeId(vm, nodeId)) {
      res = vm
    } else {
      vm.$children.find(function (child) {
        res = findComponentVm(child, nodeId)
        return res
      })
    }
  }
  return res
}
function getComponentVm(pageId, nodeId) {
  var pageVm = getPageVm(pageId)
  return pageVm && findComponentVm(pageVm, nodeId)
}
function getData(vm, path) {
  var data
  if (vm) {
    data = path ? getDataByPath(vm.$data, path) : Object.assign({}, vm.$data)
  }
  return Promise.resolve({ data: data })
}
function setData(vm, data) {
  if (vm) {
    Object.keys(data).forEach(function (name) {
      vm[name] = data[name]
    })
  }
  return Promise.resolve()
}
var CALL_METHOD_ERROR
;(function (CALL_METHOD_ERROR) {
  CALL_METHOD_ERROR['VM_NOT_EXISTS'] = 'VM_NOT_EXISTS'
  CALL_METHOD_ERROR['METHOD_NOT_EXISTS'] = 'METHOD_NOT_EXISTS'
})(CALL_METHOD_ERROR || (CALL_METHOD_ERROR = {}))
function callMethod(vm, method, args) {
  return new Promise(function (resolve, reject) {
    if (!vm) {
      return reject(CALL_METHOD_ERROR.VM_NOT_EXISTS)
    }
    if (!vm[method]) {
      return reject(CALL_METHOD_ERROR.VM_NOT_EXISTS)
    }
    var ret = vm[method].apply(vm, args)
    isPromise(ret)
      ? ret.then(function (res) {
          resolve({ result: res })
        })
      : resolve({ result: ret })
  })
}

var SYNC_APIS = [
  'stopRecord',
  'getRecorderManager',
  'pauseVoice',
  'stopVoice',
  'pauseBackgroundAudio',
  'stopBackgroundAudio',
  'getBackgroundAudioManager',
  'createAudioContext',
  'createInnerAudioContext',
  'createVideoContext',
  'createCameraContext',
  'createMapContext',
  'canIUse',
  'startAccelerometer',
  'stopAccelerometer',
  'startCompass',
  'stopCompass',
  'hideToast',
  'hideLoading',
  'showNavigationBarLoading',
  'hideNavigationBarLoading',
  'navigateBack',
  'createAnimation',
  'pageScrollTo',
  'createSelectorQuery',
  'createCanvasContext',
  'createContext',
  'drawCanvas',
  'hideKeyboard',
  'stopPullDownRefresh',
  'arrayBufferToBase64',
  'base64ToArrayBuffer',
]
var originUni = {}
var SYNC_API_RE = /Sync$/
var MOCK_API_BLACKLIST_RE = /^on|^off/
function isSyncApi(method) {
  return SYNC_API_RE.test(method) || SYNC_APIS.indexOf(method) !== -1
}
function canIMock(method) {
  return !MOCK_API_BLACKLIST_RE.test(method)
}
var App = {
  getPageStack: function () {
    return Promise.resolve({
      pageStack: getCurrentPages().map(function (page) {
        return parsePage(page)
      }),
    })
  },
  getCurrentPage: function () {
    var pages = getCurrentPages()
    var len = pages.length
    return new Promise(function (resolve, reject) {
      if (!len) {
        reject(Error('getCurrentPages().length=0'))
      } else {
        resolve(parsePage(pages[len - 1]))
      }
    })
  },
  callUniMethod: function (params) {
    var method = params.method
    var args = params.args
    return new Promise(function (resolve, reject) {
      if (!uni[method]) {
        return reject(Error('uni.' + method + ' not exists'))
      }
      if (isSyncApi(method)) {
        return resolve({
          result: uni[method].apply(uni, args),
        })
      }
      var params = [
        Object.assign({}, args[0] || {}, {
          success: function (result) {
            var timeout = method === 'pageScrollTo' ? 350 : 0
            setTimeout(function () {
              resolve({ result: result })
            }, timeout)
          },
          fail: function (res) {
            reject(Error(res.errMsg.replace(method + ':fail ', '')))
          },
        }),
      ]
      uni[method].apply(uni, params)
    })
  },
  mockUniMethod: function (params) {
    var method = params.method
    if (!uni[method]) {
      throw Error('uni.' + method + ' not exists')
    }
    if (!canIMock(method)) {
      throw Error("You can't mock uni." + method)
    }
    // TODO getOwnPropertyDescriptor?
    var result = params.result
    if (isUndef(result)) {
      // restoreUniMethod
      if (originUni[method]) {
        uni[method] = originUni[method]
        delete originUni[method]
      }
      return Promise.resolve()
    }
    var mockFn = isSyncApi(method)
      ? function () {
          return result
        }
      : function (params) {
          setTimeout(function () {
            var isFail = result.errMsg && result.errMsg.indexOf(':fail') !== -1
            if (isFail) {
              params.fail && params.fail(result)
            } else {
              params.success && params.success(result)
            }
            params.complete && params.complete(result)
          }, 4)
        }
    // mockFn.origin = originUni[method] || uni[method];
    if (!originUni[method]) {
      originUni[method] = uni[method]
    }
    uni[method] = mockFn
    return Promise.resolve()
  },
}

var Page = {
  getData: function (params) {
    return getData(getPageVm(params.pageId), params.path)
  },
  setData: function (params) {
    return setData(getPageVm(params.pageId), params.data)
  },
  callMethod: function (params) {
    var _a
    var err =
      ((_a = {}),
      (_a[CALL_METHOD_ERROR.VM_NOT_EXISTS] =
        'Page[' + params.pageId + '] not exists'),
      (_a[CALL_METHOD_ERROR.METHOD_NOT_EXISTS] =
        'page.' + params.method + ' not exists'),
      _a)
    return new Promise(function (resolve, reject) {
      callMethod(getPageVm(params.pageId), params.method, params.args)
        .then(function (res) {
          return resolve(res)
        })
        .catch(function (type) {
          reject(Error(err[type]))
        })
    })
  },
}

function getNodeId$1(params) {
  return params.nodeId || params.elementId
}
var Element = {
  getData: function (params) {
    return getData(
      getComponentVm(params.pageId, getNodeId$1(params)),
      params.path
    )
  },
  setData: function (params) {
    return setData(
      getComponentVm(params.pageId, getNodeId$1(params)),
      params.data
    )
  },
  callMethod: function (params) {
    var _a
    var nodeId = getNodeId$1(params)
    var err =
      ((_a = {}),
      (_a[CALL_METHOD_ERROR.VM_NOT_EXISTS] =
        'Component[' + params.pageId + ':' + nodeId + '] not exists'),
      (_a[CALL_METHOD_ERROR.METHOD_NOT_EXISTS] =
        'component.' + params.method + ' not exists'),
      _a)
    return new Promise(function (resolve, reject) {
      callMethod(
        getComponentVm(params.pageId, nodeId),
        params.method,
        params.args
      )
        .then(function (res) {
          return resolve(res)
        })
        .catch(function (type) {
          reject(Error(err[type]))
        })
    })
  },
}

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
// find the complete implementation of crypto (msCrypto) on IE11.
var getRandomValues =
  (typeof crypto != 'undefined' &&
    crypto.getRandomValues &&
    crypto.getRandomValues.bind(crypto)) ||
  (typeof msCrypto != 'undefined' &&
    typeof msCrypto.getRandomValues == 'function' &&
    msCrypto.getRandomValues.bind(msCrypto))

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = []

for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1)
}

var BUILITIN = [
  'movable-view',
  'picker',
  'ad',
  'button',
  'checkbox-group',
  'checkbox',
  'form',
  'icon',
  'label',
  'movable-area',
  'navigator',
  'picker-view-column',
  'picker-view',
  'progress',
  'radio-group',
  'radio',
  'rich-text',
  'u-slider',
  'swiper-item',
  'swiper',
  'switch',
]
var BUILITIN_ALIAS = BUILITIN.map(function (tag) {
  return capitalize(camelize(tag))
})

var Api = {}
Object.keys(App).forEach(function (method) {
  Api['App.' + method] = App[method]
})
Object.keys(Page).forEach(function (method) {
  Api['Page.' + method] = Page[method]
})
Object.keys(Element).forEach(function (method) {
  Api['Element.' + method] = Element[method]
})
var wsEndpoint = process.env.UNI_AUTOMATOR_WS_ENDPOINT
var socketTask
function send(data) {
  socketTask.send({ data: JSON.stringify(data) })
}
function onMessage(res) {
  var _a = JSON.parse(res.data),
    id = _a.id,
    method = _a.method,
    params = _a.params
  var data = { id: id }
  var fn = Api[method]
  if (!fn) {
    if (!fn) {
      data.error = {
        message: method + ' unimplemented',
      }
      return send(data)
    }
  }
  try {
    fn(params)
      .then(function (res) {
        res && (data.result = res)
      })
      .catch(function (err) {
        data.error = {
          message: err.message,
        }
      })
      .finally(function () {
        send(data)
      })
  } catch (err) {
    data.error = {
      message: err.message,
    }
    send(data)
  }
}
function initRuntimeAutomator(options) {
  if (options === void 0) {
    options = {}
  }
  socketTask = uni.connectSocket({
    url: wsEndpoint,
    complete: function () {},
  })
  socketTask.onMessage(onMessage)
  socketTask.onOpen(function (res) {
    options.success && options.success()
    console.log('已开启自动化测试...')
  })
  socketTask.onError(function (res) {
    console.log('automator.onError', res)
  })
  socketTask.onClose(function () {
    options.fail && options.fail({ errMsg: '$$initRuntimeAutomator:fail' })
    console.log('automator.onClose')
  })
}
//@ts-ignore
{
  //@ts-ignore
  wx.$$initRuntimeAutomator = initRuntimeAutomator
  setTimeout(function () {
    //@ts-ignore
    wx.$$initRuntimeAutomator()
  }, 500)
  //@ts-ignore
}
