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
var hyphenateRE = /\B([A-Z])/g
var hyphenate = cacheStringFunction(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})
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
function findParent(vm) {
  var parent = vm.$parent
  while (parent) {
    if (parent._$id) {
      return parent
    }
    parent = parent.$parent
  }
}
function getVmNodeId(vm) {
  //@ts-ignore
  {
    if (vm._$weex) {
      return vm._uid
    }
    if (vm._$id) {
      return vm._$id
    }
    var parent_1 = findParent(vm)
    if (!vm.$parent) {
      return '-1'
    }
    var vnode = vm.$vnode
    var context = vnode.context
    // slot 内的组件，需要补充 context 的 id，否则可能与内部组件索引值一致，导致 id 冲突
    if (context && context !== parent_1 && context._$id) {
      return context._$id + ';' + parent_1._$id + ',' + vnode.data.attrs._i
    }
    return parent_1._$id + ',' + vnode.data.attrs._i
  }
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
function matchNodeId(vm, nodeId) {
  //@ts-ignore
  {
    return getVmNodeId(vm) === nodeId
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

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = []

for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1)
}

function getDocument(pageId) {
  var page = getCurrentPages().find(function (page) {
    return page.$page.id === pageId
  })
  if (!page) {
    throw Error('page[' + pageId + '] not found')
  }
  var weex = page.$vm._$weex
  if (!weex.document.__$weex__) {
    weex.document.__$weex__ = weex
  }
  return weex.document
}
var TAGS = {}
var U_TAGS = {}
;['text', 'image', 'input', 'textarea', 'video', 'web-view', 'slider'].forEach(
  function (tag) {
    TAGS[tag] = true
    U_TAGS['u-' + tag] = true
  }
)
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
function transTagName(el) {
  var tagName = el.type
  if (U_TAGS[tagName]) {
    return tagName.replace('u-', '')
  }
  var componentName = el.__vue__ && el.__vue__.$options.name
  if (componentName === 'USlider') {
    return 'slider'
  }
  if (componentName && BUILITIN_ALIAS.indexOf(componentName) !== -1) {
    return hyphenate(componentName)
  }
  return tagName
}
function transEl(el) {
  var elem = {
    elementId: el.nodeId,
    tagName: transTagName(el),
    nvue: true,
  }
  var vm = el.__vue__
  if (vm && !vm.$options.isReserved) {
    elem.nodeId = vm._uid
  }
  if (elem.tagName === 'video') {
    elem.videoId = elem.nodeId
  }
  return elem
}
function querySelectorByFn(node, match, result) {
  var children = node.children
  for (var i = 0; i < children.length; i++) {
    var childNode = children[i]
    if (match(childNode)) {
      if (result) {
        result.push(childNode)
      } else {
        return childNode
      }
    }
    if (result) {
      querySelectorByFn(childNode, match, result)
    } else {
      var res = querySelectorByFn(childNode, match, result)
      if (res) {
        return res
      }
    }
  }
  return result
}
function querySelector(context, selector, result) {
  var matchSelector
  var match
  if (selector.indexOf('#') === 0) {
    matchSelector = selector.substr(1)
    match = function (node) {
      return node.attr && node.attr.id === matchSelector
    }
  } else if (selector.indexOf('.') === 0) {
    matchSelector = selector.substr(1)
    match = function (node) {
      return node.classList && node.classList.indexOf(matchSelector) !== -1
    }
  }
  if (match) {
    var ret_1 = querySelectorByFn(context, match, result)
    if (!ret_1) {
      throw Error('Node(' + selector + ') not exists')
    }
    return ret_1
  }
  if (selector === 'body') {
    return Object.assign({}, context, { type: 'page' })
  }
  if (selector.indexOf('uni-') === 0) {
    selector = selector.replace('uni-', '')
  }
  var tagName = TAGS[selector] ? 'u-' + selector : selector
  var aliasTagName =
    BUILITIN.indexOf(tagName) !== -1 ? capitalize(camelize(tagName)) : ''
  var ret = querySelectorByFn(
    context,
    function (node) {
      return (
        node.type === tagName ||
        (aliasTagName &&
          node.__vue__ &&
          node.__vue__.$options.name === aliasTagName)
      )
    },
    result
  )
  if (!ret) {
    throw Error('Node(' + selector + ') not exists')
  }
  return ret
}
var DOM_PROPERTIES = [
  {
    test: function (names) {
      return (
        names.length === 2 &&
        names.indexOf('document.documentElement.scrollWidth') !== -1 &&
        names.indexOf('document.documentElement.scrollHeight') !== -1
      )
    },
    call: function (node) {
      var weex = node.__$weex__ || node.ownerDocument.__$weex__
      return new Promise(function (resolve) {
        if (node.type === 'scroll-view' && node.children.length === 1) {
          node = node.children[0]
        }
        weex.requireModule('dom').getComponentRect(node.ref, function (res) {
          if (res.result) {
            resolve([res.size.width, res.size.height])
          } else {
            resolve([0, 0])
          }
        })
      })
    },
  },
  {
    test: function (names) {
      return (
        names.length === 1 && names[0] === 'document.documentElement.scrollTop'
      )
    },
    call: function (node) {
      var weex = node.__$weex__ || node.ownerDocument.__$weex__
      return new Promise(function (resolve) {
        if (node.type === 'scroll-view' && node.children.length === 1) {
          node = node.children[0]
        }
        weex.requireModule('dom').getComponentRect(node.ref, function (res) {
          resolve([(res.size && Math.abs(res.size.top)) || 0])
        })
      })
    },
  },
  {
    test: function (names) {
      return (
        names.length === 2 &&
        names.indexOf('offsetWidth') !== -1 &&
        names.indexOf('offsetHeight') !== -1
      )
    },
    call: function (node) {
      var weex = node.__$weex__ || node.ownerDocument.__$weex__
      return new Promise(function (resolve) {
        weex.requireModule('dom').getComponentRect(node.ref, function (res) {
          if (res.result) {
            resolve([res.size.width, res.size.height])
          } else {
            resolve([0, 0])
          }
        })
      })
    },
  },
  {
    test: function (names, node) {
      return names.length === 1 && names[0] === 'innerText'
    },
    call: function (node) {
      return Promise.resolve([toText(node, []).join('')])
    },
  },
]
function toText(node, res) {
  if (node.type === 'u-text') {
    res.push(node.attr.value)
  } else {
    node.pureChildren.map(function (child) {
      return toText(child, res)
    })
  }
  return res
}
function formatHTML(html) {
  return html.replace(/\n/g, '').replace(/<u-/g, '<').replace(/<\/u-/g, '</')
}
function toHTML(node, type) {
  if (type === 'outer') {
    if (node.role === 'body' && node.type === 'scroll-view') {
      return '<page>' + formatHTML(toHTML(node, 'inner')) + '</page>'
    }
    return formatHTML(node.toString())
  }
  return formatHTML(
    node.pureChildren
      .map(function (child) {
        return child.toString()
      })
      .join('')
  )
}
var FUNCTIONS = {
  input: {
    input: function (el, value) {
      el.setValue(value)
    },
  },
  textarea: {
    input: function (el, value) {
      el.setValue(value)
    },
  },
  'scroll-view': {
    scrollTo: function (el, x, y) {
      // TODO
      el.scrollTo(y)
    },
    scrollTop: function (el) {
      // TODO
      return 0
    },
    scrollLeft: function (el) {
      // TODO
      return 0
    },
    scrollWidth: function (el) {
      // TODO
      return 0
    },
    scrollHeight: function (el) {
      // TODO
      return 0
    },
  },
  swiper: {
    swipeTo: function (el, index) {
      el.__vue__.current = index
    },
  },
  'movable-view': {
    moveTo: function (el, x, y) {
      var vm = el.__vue__
      vm.x = x
      vm.y = y
    },
  },
  switch: {
    tap: function (el) {
      var vm = el.__vue__
      vm.checked = !vm.checked
    },
  },
  slider: {
    slideTo: function (el, value) {
      el.__vue__.value = value
    },
  },
}
function getRoot(pageId) {
  var doc = getDocument(pageId)
  return doc.body
}
var adapter = {
  getWindow: function (pageId) {
    return getRoot(pageId)
  },
  getDocument: function (pageId) {
    return getRoot(pageId)
  },
  getEl: function (elementId, pageId) {
    var doc = getDocument(pageId)
    var element = doc.getRef(elementId)
    if (!element) {
      throw Error('element destroyed')
    }
    return element
  },
  getOffset: function (node) {
    var weex = node.__$weex__ || node.ownerDocument.__$weex__
    return new Promise(function (resolve) {
      weex.requireModule('dom').getComponentRect(node.ref, function (res) {
        if (res.result) {
          resolve({
            left: res.size.left,
            top: res.size.top,
          })
        } else {
          resolve({
            left: 0,
            top: 0,
          })
        }
      })
    })
  },
  querySelector: function (context, selector) {
    return Promise.resolve(transEl(querySelector(context, selector)))
  },
  querySelectorAll: function (context, selector) {
    return Promise.resolve({
      elements: querySelector(context, selector, []).map(function (el) {
        return transEl(el)
      }),
    })
  },
  queryProperties: function (context, names) {
    var options = DOM_PROPERTIES.find(function (options) {
      return options.test(names, context)
    })
    if (options) {
      return options.call(context).then(function (properties) {
        return {
          properties: properties,
        }
      })
    }
    return Promise.resolve({
      properties: names.map(function (name) {
        return getDataByPath(context, name)
      }),
    })
  },
  queryAttributes: function (context, names) {
    var attr = context.attr
    return Promise.resolve({
      attributes: names.map(function (name) {
        if (name === 'class') {
          return (context.classList || []).join(' ')
        }
        return String(attr[name] || attr[camelize(name)] || '')
      }),
    })
  },
  queryStyles: function (context, names) {
    var style = context.style
    return Promise.resolve({
      styles: names.map(function (name) {
        return style[name]
      }),
    })
  },
  queryHTML: function (context, type) {
    return Promise.resolve({
      html: toHTML(context, type),
    })
  },
  dispatchTapEvent: function (el) {
    el.fireEvent(
      'click',
      {
        timeStamp: Date.now(),
        target: el,
        currentTarget: el,
      },
      true
    )
    return Promise.resolve()
  },
  dispatchLongpressEvent: function (el) {
    el.fireEvent(
      'longpress',
      {
        timeStamp: Date.now(),
        target: el,
        currentTarget: el,
      },
      true
    )
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
    el.fireEvent(
      type,
      Object.assign(
        {
          timeStamp: Date.now(),
          target: el,
          currentTarget: el,
        },
        eventInitDict
      ),
      true
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
    if (vm) {
      vm.$trigger && vm.$trigger(type, {}, detail)
    } else {
      el.fireEvent(
        type,
        {
          timeStamp: Date.now(),
          target: el,
          currentTarget: el,
        },
        false,
        { params: [{ detail: detail }] }
      )
    }
    return Promise.resolve()
  },
}

function initNativeApi() {
  return Object.assign({}, initPage(adapter), initElement(adapter))
}

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
var NVueApi
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
      send(data)
      return true
    }
    var isNVue = !!page.$page.meta.isNVue
    //@ts-ignore
    if (!isNVue) {
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
    if (!NVueApi) {
      NVueApi = initNativeApi()
    }
    return NVueApi[method]
  }
  UniServiceJSBridge.subscribe('onAutoMessageReceive', function (res) {
    send(res)
  })
}
function send(data) {
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
  var fn = Api[method]
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
  setTimeout(function () {
    // (global as any).testMessage = onMessage;
    initRuntimeAutomator()
  }, 500)
}
