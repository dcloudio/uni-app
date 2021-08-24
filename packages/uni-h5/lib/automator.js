function initPage(adapter) {
  return {
    'Page.getElement': function (params) {
      return adapter.querySelector(
        adapter.getDocument(params.pageId),
        params.selector
      )
    },
    'Page.getElements': function (params) {
      return adapter.querySelectorAll(
        adapter.getDocument(params.pageId),
        params.selector
      )
    },
    'Page.getWindowProperties': function (params) {
      return adapter.queryProperties(
        adapter.getWindow(params.pageId),
        params.names
      )
    },
  }
}

function initElement(adapter) {
  var getEl = function (params) {
    return adapter.getEl(params.elementId, params.pageId)
  }
  return {
    'Element.getElement': function (params) {
      return adapter.querySelector(getEl(params), params.selector)
    },
    'Element.getElements': function (params) {
      return adapter.querySelectorAll(getEl(params), params.selector)
    },
    'Element.getDOMProperties': function (params) {
      return adapter.queryProperties(getEl(params), params.names)
    },
    'Element.getProperties': function (params) {
      var el = getEl(params)
      var ctx = el.__vue__ || el.attr || {}
      return adapter.queryProperties(ctx, params.names)
    },
    'Element.getOffset': function (params) {
      return adapter.getOffset(getEl(params))
    },
    'Element.getAttributes': function (params) {
      return adapter.queryAttributes(getEl(params), params.names)
    },
    'Element.getStyles': function (params) {
      return adapter.queryStyles(getEl(params), params.names)
    },
    'Element.getHTML': function (params) {
      return adapter.queryHTML(getEl(params), params.type)
    },
    'Element.tap': function (params) {
      return adapter.dispatchTapEvent(getEl(params))
    },
    'Element.longpress': function (params) {
      return adapter.dispatchLongpressEvent(getEl(params))
    },
    'Element.touchstart': function (params) {
      return adapter.dispatchTouchEvent(getEl(params), 'touchstart', params)
    },
    'Element.touchmove': function (params) {
      return adapter.dispatchTouchEvent(getEl(params), 'touchmove', params)
    },
    'Element.touchend': function (params) {
      return adapter.dispatchTouchEvent(getEl(params), 'touchend', params)
    },
    'Element.callFunction': function (params) {
      return adapter.callFunction(
        getEl(params),
        params.functionName,
        params.args
      )
    },
    'Element.triggerEvent': function (params) {
      return adapter.triggerEvent(getEl(params), params.type, params.detail)
    },
  }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++)
    s += arguments[i].length
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j]
  return r
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
var rnds8 = new Uint8Array(16) // eslint-disable-line no-undef

function rng() {
  if (!getRandomValues) {
    throw new Error(
      'crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported'
    )
  }

  return getRandomValues(rnds8)
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = []

for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1)
}

function bytesToUuid(buf, offset) {
  var i = offset || 0
  var bth = byteToHex // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4

  return [
    bth[buf[i++]],
    bth[buf[i++]],
    bth[buf[i++]],
    bth[buf[i++]],
    '-',
    bth[buf[i++]],
    bth[buf[i++]],
    '-',
    bth[buf[i++]],
    bth[buf[i++]],
    '-',
    bth[buf[i++]],
    bth[buf[i++]],
    '-',
    bth[buf[i++]],
    bth[buf[i++]],
    bth[buf[i++]],
    bth[buf[i++]],
    bth[buf[i++]],
    bth[buf[i++]],
  ].join('')
}

function v4(options, buf, offset) {
  var i = (buf && offset) || 0

  if (typeof options == 'string') {
    buf = options === 'binary' ? new Array(16) : null
    options = null
  }

  options = options || {}
  var rnds = options.random || (options.rng || rng)() // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = (rnds[6] & 0x0f) | 0x40
  rnds[8] = (rnds[8] & 0x3f) | 0x80 // Copy bytes to buffer, if provided

  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii]
    }
  }

  return buf || bytesToUuid(rnds)
}

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
function getVmNodeId(vm) {
  //@ts-ignore
  {
    return vm._uid
  }
}

var elementMap = new Map()
function getElId(element) {
  var elementId = element._id
  if (!elementId) {
    elementId = v4()
    element._id = elementId
    elementMap.set(elementId, { id: elementId, element: element })
  }
  return elementId
}
function isValidEl(el) {
  if (el) {
    var tagName = el.tagName
    return tagName.indexOf('UNI-') === 0 || tagName === 'BODY'
  }
  return false
}
function transEl(el) {
  if (!isValidEl(el)) {
    throw Error('no such element')
  }
  var elem = {
    elementId: getElId(el),
    tagName: el.tagName.toLocaleLowerCase().replace('uni-', ''),
  }
  var vm = el.__vue__
  if (vm) {
    if (vm.$parent && vm.$parent.$el === el) {
      vm = vm.$parent
    }
    if (vm && !vm.$options.isReserved) {
      elem.nodeId = getVmNodeId(vm)
    }
  }
  if (elem.tagName === 'video') {
    elem.videoId = elem.nodeId
  }
  return elem
}
function formatHTML(html) {
  return html
    .replace(/\n/g, '')
    .replace(
      /(<uni-text[^>]*>)(<span[^>]*>[^<]*<\/span>)(.*?<\/uni-text>)/g,
      '$1$3'
    )
    .replace(/<\/?[^>]*>/g, function (replacement) {
      if (-1 < replacement.indexOf('<body')) {
        return '<page>'
      } else if ('</body>' === replacement) {
        return '</page>'
      } else if (
        0 !== replacement.indexOf('<uni-') &&
        0 !== replacement.indexOf('</uni-')
      ) {
        return ''
      }
      return replacement
        .replace(/uni-/g, '')
        .replace(/ role=""/g, '')
        .replace(/ aria-label=""/g, '')
    })
}
var FUNCTIONS = {
  input: {
    input: function (el, value) {
      var vm = el.__vue__
      vm.valueSync = value
      vm.$triggerInput({}, { value: value })
    },
  },
  textarea: {
    input: function (el, value) {
      var vm = el.__vue__
      vm.valueSync = value
      vm.$triggerInput({}, { value: value })
    },
  },
  'scroll-view': {
    scrollTo: function (el, x, y) {
      var main = el.__vue__.$refs.main
      main.scrollLeft = x
      main.scrollTop = y
    },
    scrollTop: function (el) {
      return el.__vue__.$refs.main.scrollTop
    },
    scrollLeft: function (el) {
      return el.__vue__.$refs.main.scrollLeft
    },
    scrollWidth: function (el) {
      return el.__vue__.$refs.main.scrollWidth
    },
    scrollHeight: function (el) {
      return el.__vue__.$refs.main.scrollHeight
    },
  },
  swiper: {
    swipeTo: function (el, index) {
      el.__vue__.current = index
    },
  },
  'movable-view': {
    moveTo: function (el, x, y) {
      el.__vue__._animationTo(x, y)
    },
  },
  switch: {
    tap: function (el) {
      el.click()
    },
  },
  slider: {
    slideTo: function (el, value) {
      var vm = el.__vue__
      var slider = vm.$refs['uni-slider']
      var offsetWidth = slider.offsetWidth
      var boxLeft = slider.getBoundingClientRect().left
      vm.value = value
      vm._onClick({
        x: ((value - vm.min) * offsetWidth) / (vm.max - vm.min) + boxLeft,
      })
    },
  },
}
var adapter = {
  getWindow: function (pageId) {
    return window
  },
  getDocument: function (pageId) {
    return document
  },
  getEl: function (elementId) {
    var element = elementMap.get(elementId)
    if (!element) {
      throw Error('element destroyed')
    }
    return element.element
  },
  getOffset: function (node) {
    var rect = node.getBoundingClientRect()
    return Promise.resolve({
      left: rect.left + window.pageXOffset,
      top: rect.top + window.pageYOffset,
    })
  },
  querySelector: function (context, selector) {
    if (selector === 'page') {
      //TODO h5平台？
      selector = 'body'
    }
    return Promise.resolve(transEl(context.querySelector(selector)))
  },
  querySelectorAll: function (context, selector) {
    var elements = []
    var nodeList = document.querySelectorAll(selector)
    ;[].forEach.call(nodeList, function (node) {
      try {
        elements.push(transEl(node))
      } catch (e) {}
    })
    return Promise.resolve({ elements: elements })
  },
  queryProperties: function (context, names) {
    return Promise.resolve({
      properties: names.map(function (name) {
        var value = getDataByPath(context, name)
        if (name === 'document.documentElement.scrollTop' && value === 0) {
          value = getDataByPath(context, 'document.body.scrollTop')
        }
        return value
      }),
    })
  },
  queryAttributes: function (context, names) {
    return Promise.resolve({
      attributes: names.map(function (name) {
        return String(context.getAttribute(name))
      }),
    })
  },
  queryStyles: function (context, names) {
    var style = getComputedStyle(context)
    return Promise.resolve({
      styles: names.map(function (name) {
        return style[name]
      }),
    })
  },
  queryHTML: function (context, type) {
    return Promise.resolve({
      html: formatHTML(
        type === 'outer' ? context.outerHTML : context.innerHTML
      ),
    })
  },
  dispatchTapEvent: function (el) {
    el.click()
    return Promise.resolve()
  },
  dispatchLongpressEvent: function (el) {
    return Promise.resolve()
  },
  dispatchTouchEvent: function (el, type, eventInitDict) {
    if (!eventInitDict) {
      eventInitDict = {}
    }
    if (!eventInitDict.touches) {
      eventInitDict.touches = []
    }
    if (!eventInitDict.changedTouches) {
      eventInitDict.changedTouches = []
    }
    if (!eventInitDict.touches.length) {
      eventInitDict.touches.push({
        identifier: Date.now(),
        target: el,
      })
    }
    var touches = eventInitDict.touches.map(function (touch) {
      return new Touch(touch)
    })
    var changedTouches = eventInitDict.changedTouches.map(function (touch) {
      return new Touch(touch)
    })
    el.dispatchEvent(
      new TouchEvent(type, {
        cancelable: true,
        bubbles: true,
        touches: touches,
        targetTouches: [],
        changedTouches: changedTouches,
      })
    )
    return Promise.resolve()
  },
  callFunction: function (el, functionName, args) {
    var fn = getDataByPath(FUNCTIONS, functionName)
    if (!fn) {
      return Promise.reject(Error(functionName + ' not exists'))
    }
    return Promise.resolve({
      result: fn.apply(null, __spreadArrays([el], args)),
    })
  },
  triggerEvent: function (el, type, detail) {
    var vm = el.__vue__
    vm.$trigger && vm.$trigger(type, {}, detail)
    return Promise.resolve()
  },
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

function initWebApi() {
  return Object.assign({}, initPage(adapter), initElement(adapter))
}

var Api = initWebApi()
function send(data) {
  return UniViewJSBridge.publishHandler('onAutoMessageReceive', data)
}
UniViewJSBridge.subscribe('sendAutoMessage', function (_a) {
  var id = _a.id,
    method = _a.method,
    params = _a.params
  var data = { id: id }
  var fn = Api[method]
  if (!fn) {
    data.error = {
      message: method + ' unimplemented',
    }
    return send(data)
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
})

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
function matchNodeId(vm, nodeId) {
  //@ts-ignore
  {
    return vm._uid === nodeId
  }
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

function getNodeId(params) {
  return params.nodeId || params.elementId
}
var Element = {
  getData: function (params) {
    return getData(
      getComponentVm(params.pageId, getNodeId(params)),
      params.path
    )
  },
  setData: function (params) {
    return setData(
      getComponentVm(params.pageId, getNodeId(params)),
      params.data
    )
  },
  callMethod: function (params) {
    var _a
    var nodeId = getNodeId(params)
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

var Api$1 = {}
Object.keys(App).forEach(function (method) {
  Api$1['App.' + method] = App[method]
})
Object.keys(Page).forEach(function (method) {
  Api$1['Page.' + method] = Page[method]
})
Object.keys(Element).forEach(function (method) {
  Api$1['Element.' + method] = Element[method]
})
var wsEndpoint = process.env.UNI_AUTOMATOR_WS_ENDPOINT
var fallback
var socketTask
//@ts-ignore
{
  fallback = function (id, method, params, data) {
    var pageId = params.pageId
    var page = findPageByPageId(pageId)
    if (!page) {
      data.error = {
        message: 'page[' + pageId + '] not exists',
      }
      send$1(data)
      return true
    }
    var isNVue = !!page.$page.meta.isNVue
    //@ts-ignore
    {
      UniServiceJSBridge.publishHandler(
        'sendAutoMessage',
        {
          id: id,
          method: method,
          params: params,
        },
        pageId
      )
      return true
    }
  }
  UniServiceJSBridge.subscribe('onAutoMessageReceive', function (res) {
    send$1(res)
  })
}
function send$1(data) {
  socketTask.send({ data: JSON.stringify(data) })
}
function findPageByPageId(pageId) {
  var pages = getCurrentPages()
  if (!pageId) {
    return pages[pages.length - 1]
  }
  return pages.find(function (page) {
    return page.$page.id === pageId
  })
}
function onMessage(res) {
  var _a = JSON.parse(res.data),
    id = _a.id,
    method = _a.method,
    params = _a.params
  var data = { id: id }
  var fn = Api$1[method]
  if (!fn) {
    if (fallback) {
      var result = fallback(id, method, params, data)
      if (result === true) {
        return
      }
      fn = result
    }
    if (!fn) {
      data.error = {
        message: method + ' unimplemented',
      }
      return send$1(data)
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
        send$1(data)
      })
  } catch (err) {
    data.error = {
      message: err.message,
    }
    send$1(data)
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
  setTimeout(function () {
    // (global as any).testMessage = onMessage;
    initRuntimeAutomator()
  }, 500)
}
