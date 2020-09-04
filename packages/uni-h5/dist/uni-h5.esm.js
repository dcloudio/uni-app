import {
  isFunction,
  extend,
  isPlainObject,
  isPromise,
  isArray,
  hasOwn
} from '@vue/shared'
import {
  injectHook,
  openBlock,
  createBlock,
  createVNode,
  Fragment,
  renderList,
  toDisplayString,
  createCommentVNode,
  createTextVNode,
  Transition,
  withCtx,
  withModifiers,
  withDirectives,
  vShow,
  resolveComponent,
  KeepAlive,
  resolveDynamicComponent,
  mergeProps,
  renderSlot
} from 'vue'
import {
  isCustomElement,
  TABBAR_HEIGHT,
  COMPONENT_NAME_PREFIX,
  NAVBAR_HEIGHT
} from '@dcloudio/uni-shared'
import { passiveOptions, Input } from '@dcloudio/uni-components'
export * from '@dcloudio/uni-components'
import {
  createWebHistory,
  createWebHashHistory,
  createRouter
} from 'vue-router'
function applyOptions(options, instance2, publicThis) {
  Object.keys(options).forEach(name => {
    if (name.indexOf('on') === 0) {
      const hook = options[name]
      if (isFunction(hook)) {
        injectHook(name, hook.bind(publicThis), instance2)
      }
    }
  })
}
function set(target, key, val) {
  return (target[key] = val)
}
function hasHook(name) {
  const hooks = this.$[name]
  if (hooks && hooks.length) {
    return true
  }
  return false
}
function callHook(name, args) {
  const hooks = this.$[name]
  let ret
  if (hooks) {
    for (let i = 0; i < hooks.length; i++) {
      ret = hooks[i](args)
    }
  }
  return ret
}
function errorHandler(err, instance2, info) {
  if (!instance2) {
    throw err
  }
  const appInstance = instance2.$.appContext.$appInstance
  if (!appInstance) {
    throw err
  }
  appInstance.$callHook('onError', err, info)
}
function initApp(app) {
  const appConfig2 = app._context.config
  if (isFunction(app._component.onError)) {
    appConfig2.errorHandler = errorHandler
  }
  appConfig2.isCustomElement = isCustomElement
  const globalProperties = appConfig2.globalProperties
  globalProperties.$hasHook = hasHook
  globalProperties.$callHook = callHook
  {
    globalProperties.$set = set
    globalProperties.$applyOptions = applyOptions
  }
}
function initBridge(namespace) {
  const { on, off, emit } = {
    on(event, callback) {
      console.log(event, callback)
    },
    off(event, callback) {
      console.log(event, callback)
    },
    emit(event, ...args) {
      console.log(event, args)
    }
  }
  return {
    on,
    off,
    emit,
    subscribe(event, callback) {
      return on(`${namespace}.${event}`, callback)
    },
    unsubscribe(event, callback) {
      return off(`${namespace}.${event}`, callback)
    },
    subscribeHandler(event, args, pageId) {
      if (process.env.NODE_ENV !== 'production') {
        console.log(
          `[${namespace}][subscribeHandler][${Date.now()}]:${event}, ${JSON.stringify(
            args
          )}, ${pageId}`
        )
      }
      return emit(`${namespace}.${event}`, args, pageId)
    }
  }
}
const ViewJSBridge = initBridge('view')
const LONGPRESS_TIMEOUT = 350
const LONGPRESS_THRESHOLD = 10
let longPressTimer = 0
function clearLongPressTimer() {
  if (longPressTimer) {
    clearTimeout(longPressTimer)
    longPressTimer = 0
  }
}
let startPageX = 0
let startPageY = 0
function touchstart(evt) {
  clearLongPressTimer()
  if (evt.touches.length !== 1) {
    return
  }
  const { pageX, pageY } = evt.touches[0]
  startPageX = pageX
  startPageY = pageY
  longPressTimer = setTimeout(function() {
    const customEvent = new CustomEvent('longpress', {
      bubbles: true,
      cancelable: true,
      target: evt.target,
      currentTarget: evt.currentTarget
    })
    customEvent.touches = evt.touches
    customEvent.changedTouches = evt.changedTouches
    evt.target.dispatchEvent(customEvent)
  }, LONGPRESS_TIMEOUT)
}
function touchmove(evt) {
  if (!longPressTimer) {
    return
  }
  if (evt.touches.length !== 1) {
    return clearLongPressTimer()
  }
  const { pageX, pageY } = evt.touches[0]
  if (
    Math.abs(pageX - startPageX) > LONGPRESS_THRESHOLD ||
    Math.abs(pageY - startPageY) > LONGPRESS_THRESHOLD
  ) {
    return clearLongPressTimer()
  }
}
function initLongPress() {
  window.addEventListener('touchstart', touchstart, passiveOptions)
  window.addEventListener('touchmove', touchmove, passiveOptions)
  window.addEventListener('touchend', clearLongPressTimer, passiveOptions)
  window.addEventListener('touchcancel', clearLongPressTimer, passiveOptions)
}
var attrs = ['top', 'left', 'right', 'bottom']
var inited
var elementComputedStyle = {}
var support
function getSupport() {
  if (!('CSS' in window) || typeof CSS.supports != 'function') {
    support = ''
  } else if (CSS.supports('top: env(safe-area-inset-top)')) {
    support = 'env'
  } else if (CSS.supports('top: constant(safe-area-inset-top)')) {
    support = 'constant'
  } else {
    support = ''
  }
  return support
}
function init() {
  support = typeof support === 'string' ? support : getSupport()
  if (!support) {
    attrs.forEach(function(attr) {
      elementComputedStyle[attr] = 0
    })
    return
  }
  function setStyle(el, style) {
    var elStyle = el.style
    Object.keys(style).forEach(function(key) {
      var val = style[key]
      elStyle[key] = val
    })
  }
  var cbs = []
  function parentReady(callback) {
    if (callback) {
      cbs.push(callback)
    } else {
      cbs.forEach(function(cb) {
        cb()
      })
    }
  }
  var passiveEvents = false
  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function() {
        passiveEvents = { passive: true }
      }
    })
    window.addEventListener('test', null, opts)
  } catch (e) {}
  function addChild(parent, attr) {
    var a1 = document.createElement('div')
    var a2 = document.createElement('div')
    var a1Children = document.createElement('div')
    var a2Children = document.createElement('div')
    var W = 100
    var MAX = 1e4
    var aStyle = {
      position: 'absolute',
      width: W + 'px',
      height: '200px',
      boxSizing: 'border-box',
      overflow: 'hidden',
      paddingBottom: support + '(safe-area-inset-' + attr + ')'
    }
    setStyle(a1, aStyle)
    setStyle(a2, aStyle)
    setStyle(a1Children, {
      transition: '0s',
      animation: 'none',
      width: '400px',
      height: '400px'
    })
    setStyle(a2Children, {
      transition: '0s',
      animation: 'none',
      width: '250%',
      height: '250%'
    })
    a1.appendChild(a1Children)
    a2.appendChild(a2Children)
    parent.appendChild(a1)
    parent.appendChild(a2)
    parentReady(function() {
      a1.scrollTop = a2.scrollTop = MAX
      var a1LastScrollTop = a1.scrollTop
      var a2LastScrollTop = a2.scrollTop
      function onScroll() {
        if (
          this.scrollTop === (this === a1 ? a1LastScrollTop : a2LastScrollTop)
        ) {
          return
        }
        a1.scrollTop = a2.scrollTop = MAX
        a1LastScrollTop = a1.scrollTop
        a2LastScrollTop = a2.scrollTop
        attrChange(attr)
      }
      a1.addEventListener('scroll', onScroll, passiveEvents)
      a2.addEventListener('scroll', onScroll, passiveEvents)
    })
    var computedStyle = getComputedStyle(a1)
    Object.defineProperty(elementComputedStyle, attr, {
      configurable: true,
      get: function() {
        return parseFloat(computedStyle.paddingBottom)
      }
    })
  }
  var parentDiv = document.createElement('div')
  setStyle(parentDiv, {
    position: 'absolute',
    left: '0',
    top: '0',
    width: '0',
    height: '0',
    zIndex: '-1',
    overflow: 'hidden',
    visibility: 'hidden'
  })
  attrs.forEach(function(key) {
    addChild(parentDiv, key)
  })
  document.body.appendChild(parentDiv)
  parentReady()
  inited = true
}
function getAttr(attr) {
  if (!inited) {
    init()
  }
  return elementComputedStyle[attr]
}
var changeAttrs = []
function attrChange(attr) {
  if (!changeAttrs.length) {
    setTimeout(function() {
      var style = {}
      changeAttrs.forEach(function(attr2) {
        style[attr2] = elementComputedStyle[attr2]
      })
      changeAttrs.length = 0
      callbacks.forEach(function(callback) {
        callback(style)
      })
    }, 0)
  }
  changeAttrs.push(attr)
}
var callbacks = []
function onChange(callback) {
  if (!getSupport()) {
    return
  }
  if (!inited) {
    init()
  }
  if (typeof callback === 'function') {
    callbacks.push(callback)
  }
}
function offChange(callback) {
  var index2 = callbacks.indexOf(callback)
  if (index2 >= 0) {
    callbacks.splice(index2, 1)
  }
}
var safeAreaInsets = {
  get support() {
    return (typeof support === 'string' ? support : getSupport()).length != 0
  },
  get top() {
    return getAttr('top')
  },
  get left() {
    return getAttr('left')
  },
  get right() {
    return getAttr('right')
  },
  get bottom() {
    return getAttr('bottom')
  },
  onChange,
  offChange
}
var out = safeAreaInsets
function getWindowOffset() {
  if (uni.canIUse('css.var')) {
    const style = document.documentElement.style
    const top = parseInt(style.getPropertyValue('--window-top'))
    const bottom = parseInt(style.getPropertyValue('--window-bottom'))
    const left = parseInt(style.getPropertyValue('--window-left'))
    const right = parseInt(style.getPropertyValue('--window-right'))
    return {
      top: top ? top + out.top : 0,
      bottom: bottom ? bottom + out.bottom : 0,
      left: left ? left + out.left : 0,
      right: right ? right + out.right : 0
    }
  }
  return {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
}
function findUniTarget($event, $el) {
  let target = $event.target
  for (; target && target !== $el; target = target.parentNode) {
    if (target.tagName && target.tagName.indexOf('UNI-') === 0) {
      break
    }
  }
  return target
}
function normalizeDataset(dataset = {}) {
  const result = JSON.parse(JSON.stringify(dataset))
  return result
}
function normalizeEvent(name, $event, detail = {}, target, currentTarget) {
  if ($event._processed) {
    $event.type = detail.type || name
    return $event
  }
  if (isClickEvent($event, name)) {
    const { top } = getWindowOffset()
    detail = {
      x: $event.x,
      y: $event.y - top
    }
    normalizeClickEvent($event)
  }
  const ret = {
    _processed: true,
    type: detail.type || name,
    timeStamp: $event.timeStamp || 0,
    detail,
    target: normalizeTarget(target, detail),
    currentTarget: normalizeTarget(currentTarget),
    touches: normalizeTouchList($event.touches),
    changedTouches: normalizeTouchList($event.changedTouches),
    preventDefault() {},
    stopPropagation() {}
  }
  return ret
}
function normalizeClickEvent($event) {
  $event.touches = $event.changedTouches = [
    {
      force: 1,
      identifier: 0,
      clientX: $event.clientX,
      clientY: $event.clientY,
      pageX: $event.pageX,
      pageY: $event.pageY
    }
  ]
}
function isClickEvent(val, name) {
  return name === 'click'
}
function normalizeTarget(target, detail) {
  if (!target) {
    target = {}
  }
  const res = {
    id: target.id,
    offsetLeft: target.offsetLeft,
    offsetTop: target.offsetTop,
    dataset: normalizeDataset(target.dataset)
  }
  if (detail) {
    extend(res, detail)
  }
  return res
}
function normalizeTouchList(touches) {
  if (touches && touches instanceof TouchList) {
    const res = []
    const { top } = getWindowOffset()
    for (let i = 0; i < touches.length; i++) {
      const touch = touches[i]
      res.push({
        identifier: touch.identifier,
        pageX: touch.pageX,
        pageY: touch.pageY - top,
        clientX: touch.clientX,
        clientY: touch.clientY - top,
        force: touch.force || 0
      })
    }
    return res
  }
  return []
}
function $trigger(name, $event, detail) {
  const target = this.$el
  this.$emit(name, normalizeEvent(name, $event, detail, target, target))
}
function $handleEvent($event) {
  if ($event instanceof Event) {
    const target = findUniTarget($event, this.$el)
    return normalizeEvent(
      $event.type,
      $event,
      {},
      target || $event.target,
      $event.currentTarget
    )
  }
  return $event
}
function $getRealPath(v) {
  return v
}
var instance = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  $trigger,
  $handleEvent,
  $getRealPath
})
const CLASS_RE = /^\s+|\s+$/g
const WXS_CLASS_RE = /\s+/
function getWxsClsArr(clsArr, classList, isAdd) {
  const wxsClsArr = []
  let checkClassList = function(cls) {
    if (isAdd) {
      checkClassList = function(cls2) {
        return !classList.contains(cls2)
      }
    } else {
      checkClassList = function(cls2) {
        return classList.contains(cls2)
      }
    }
    return checkClassList(cls)
  }
  clsArr.forEach(cls => {
    cls = cls.replace(CLASS_RE, '')
    checkClassList(cls) && wxsClsArr.push(cls)
  })
  return wxsClsArr
}
function parseStyleText(cssText) {
  const res = {}
  const listDelimiter = /;(?![^(]*\))/g
  const propertyDelimiter = /:(.+)/
  cssText.split(listDelimiter).forEach(function(item) {
    if (item) {
      const tmp = item.split(propertyDelimiter)
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim())
    }
  })
  return res
}
class ComponentDescriptor {
  constructor(vm) {
    this.$vm = vm
    this.$el = vm.$el
  }
  selectComponent(selector) {
    if (!this.$el || !selector) {
      return
    }
    const el = this.$el.querySelector(selector)
    return el && el.__vue__ && createComponentDescriptor(el.__vue__, false)
  }
  selectAllComponents(selector) {
    if (!this.$el || !selector) {
      return []
    }
    const descriptors = []
    const els = this.$el.querySelectorAll(selector)
    for (let i = 0; i < els.length; i++) {
      const el = els[i]
      el.__vue__ &&
        descriptors.push(createComponentDescriptor(el.__vue__, false))
    }
    return descriptors
  }
  setStyle(style) {
    if (!this.$el || !style) {
      return this
    }
    if (typeof style === 'string') {
      style = parseStyleText(style)
    }
    if (isPlainObject(style)) {
      this.$el.__wxsStyle = style
      this.$vm.$forceUpdate()
    }
    return this
  }
  addClass(...clsArr) {
    if (!this.$el || !clsArr.length) {
      return this
    }
    const wxsClsArr = getWxsClsArr(clsArr, this.$el.classList, true)
    if (wxsClsArr.length) {
      const wxsClass = this.$el.__wxsAddClass || ''
      this.$el.__wxsAddClass =
        wxsClass + (wxsClass ? ' ' : '') + wxsClsArr.join(' ')
      this.$vm.$forceUpdate()
    }
    return this
  }
  removeClass(...clsArr) {
    if (!this.$el || !clsArr.length) {
      return this
    }
    const classList = this.$el.classList
    const addWxsClsArr = this.$el.__wxsAddClass
      ? this.$el.__wxsAddClass.split(WXS_CLASS_RE)
      : []
    const wxsClsArr = getWxsClsArr(clsArr, classList, false)
    if (wxsClsArr.length) {
      const removeWxsClsArr = []
      wxsClsArr.forEach(cls => {
        const clsIndex = addWxsClsArr.findIndex(oldCls => oldCls === cls)
        if (clsIndex !== -1) {
          addWxsClsArr.splice(clsIndex, 1)
        }
        removeWxsClsArr.push(cls)
      })
      this.$el.__wxsRemoveClass = removeWxsClsArr
      this.$el.__wxsAddClass = addWxsClsArr.join(' ')
      this.$vm.$forceUpdate()
    }
    return this
  }
  hasClass(cls) {
    return this.$el && this.$el.classList.contains(cls)
  }
  getComputedStyle() {
    if (this.$el) {
      return window.getComputedStyle(this.$el)
    }
    return {}
  }
  getDataset() {
    return this.$el && this.$el.dataset
  }
  callMethod(funcName, args = {}) {
    const func = this.$vm[funcName]
    if (isFunction(func)) {
      func(JSON.parse(JSON.stringify(args)))
    } else if (this.$vm._$id) {
      UniViewJSBridge.publishHandler('onWxsInvokeCallMethod', {
        cid: this.$vm._$id,
        method: funcName,
        args
      })
    }
  }
  requestAnimationFrame(callback) {
    return window.requestAnimationFrame(callback), this
  }
  getState() {
    return this.$el && (this.$el.__wxsState || (this.$el.__wxsState = {}))
  }
  triggerEvent(eventName, detail = {}) {
    return this.$vm.$emit(eventName, detail), this
  }
}
function createComponentDescriptor(vm, isOwnerInstance = true) {
  if (
    isOwnerInstance &&
    vm &&
    vm.$options.name &&
    vm.$options.name.indexOf('VUni') === 0
  ) {
    vm = vm.$parent
  }
  if (vm && vm.$el) {
    if (!vm.$el.__wxsComponentDescriptor) {
      vm.$el.__wxsComponentDescriptor = new ComponentDescriptor(vm)
    }
    return vm.$el.__wxsComponentDescriptor
  }
}
function getComponentDescriptor(instance2, isOwnerInstance) {
  return createComponentDescriptor(instance2 || this, isOwnerInstance)
}
function handleWxsEvent($event) {
  if (!($event instanceof Event)) {
    return $event
  }
  const currentTarget = $event.currentTarget
  const instance2 =
    currentTarget &&
    currentTarget.__vue__ &&
    getComponentDescriptor.call(this, currentTarget.__vue__, false)
  const $origEvent = $event
  $event = normalizeEvent(
    $origEvent.type,
    $origEvent,
    {},
    findUniTarget($origEvent, this.$el) || $origEvent.target,
    $origEvent.currentTarget
  )
  $event.instance = instance2
  $event.preventDefault = function() {
    return $origEvent.preventDefault()
  }
  $event.stopPropagation = function() {
    return $origEvent.stopPropagation()
  }
}
function initAppConfig(appConfig) {
  const globalProperties = appConfig.globalProperties
  extend(globalProperties, instance)
  if (__UNI_WXS_API__) {
    globalProperties.getComponentDescriptor = getComponentDescriptor
    Object.defineProperty(globalProperties, '$ownerInstance', {
      get() {
        return this.$getComponentDescriptor(this)
      }
    })
    globalProperties.$handleWxsEvent = handleWxsEvent
  }
}
function initView(app) {
  initLongPress()
  initAppConfig(app._context.config)
}
const ServiceJSBridge = initBridge('service')
function querySelector(vm, selector) {
  const el = vm.$el.querySelector(selector)
  return el && el.__vue__
}
function querySelectorAll(vm, selector) {
  const nodeList = vm.$el.querySelectorAll(selector)
  if (nodeList) {
    return [...nodeList].map(node => node.__vue__).filter(Boolean)
  }
  return []
}
function createSelectorQuery() {
  return uni.createSelectorQuery().in(this)
}
function createIntersectionObserver(options) {
  return uni.createIntersectionObserver(this, options)
}
function selectComponent(selector) {
  return querySelector(this, selector)
}
function selectAllComponents(selector) {
  return querySelectorAll(this, selector)
}
var wxInstance = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createSelectorQuery,
  createIntersectionObserver,
  selectComponent,
  selectAllComponents
})
function initAppConfig$1(appConfig) {
  const globalProperties = appConfig.globalProperties
  if (__UNI_WX_API__) {
    extend(globalProperties, wxInstance)
  }
}
function initService(app) {
  initAppConfig$1(app._context.config)
}
var UniServiceJSBridge$1 = extend(ServiceJSBridge, {
  publishHandler(event, args, pageId) {
    window.UniViewJSBridge.subscribeHandler(event, args, pageId)
  }
})
var UniViewJSBridge$1 = extend(ViewJSBridge, {
  publishHandler(event, args, pageId) {
    window.UniServiceJSBridge.subscribeHandler(event, args, pageId)
  }
})
function initBridge$1() {
  window.UniServiceJSBridge = UniServiceJSBridge$1
  window.UniViewJSBridge = UniViewJSBridge$1
}
function initRouter(app) {
  const history =
    __UNI_ROUTER_MODE__ === 'history'
      ? createWebHistory()
      : createWebHashHistory()
  app.use(
    createRouter({
      history,
      strict: !!__uniConfig.router.strict,
      routes: __uniRoutes,
      scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
          return savedPosition
        }
      }
    })
  )
}
var script = {
  name: 'TabBar',
  props: {
    position: {
      default: 'bottom',
      validator(value) {
        return ['bottom', 'top'].indexOf(value) !== -1
      }
    },
    color: {
      type: String,
      default: '#999'
    },
    selectedColor: {
      type: String,
      default: '#007aff'
    },
    backgroundColor: {
      type: String,
      default: '#f7f7fa'
    },
    borderStyle: {
      default: 'black',
      validator(value) {
        return ['black', 'white'].indexOf(value) !== -1
      }
    },
    list: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed: {
    borderColor() {
      return this.borderStyle === 'white'
        ? 'rgba(255, 255, 255, 0.33)'
        : 'rgba(0, 0, 0, 0.33)'
    }
  },
  watch: {
    $route(to, from) {
      if (to.meta.isTabBar) {
        this.__path__ = to.path
      }
    }
  },
  beforeCreate() {
    this.__path__ = this.$route.path
  },
  methods: {
    _getRealPath(filePath) {
      if (filePath.indexOf('/') !== 0) {
        filePath = '/' + filePath
      }
      return this.$getRealPath(filePath)
    },
    _switchTab({ text, pagePath }, index2) {
      let url = '/' + pagePath
      if (url === __uniRoutes[0].alias) {
        url = '/'
      }
      const detail = {
        index: index2,
        text,
        pagePath
      }
      if (this.$route.path !== url) {
        this.__path__ = this.$route.path
        uni.switchTab({
          from: 'tabBar',
          url,
          detail
        })
      } else {
        UniServiceJSBridge.emit('onTabItemTap', detail)
      }
    }
  }
}
const _hoisted_1 = { class: 'uni-tabbar__bd' }
const _hoisted_2 = /* @__PURE__ */ createVNode(
  'div',
  { class: 'uni-placeholder' },
  null,
  -1
)
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    openBlock(),
    createBlock('uni-tabbar', null, [
      createVNode(
        'div',
        {
          style: { backgroundColor: _ctx.backgroundColor },
          class: 'uni-tabbar'
        },
        [
          createVNode(
            'div',
            {
              style: { backgroundColor: _ctx.borderColor },
              class: 'uni-tabbar-border'
            },
            null,
            4
          ),
          (openBlock(true),
          createBlock(
            Fragment,
            null,
            renderList(_ctx.list, (item, index2) => {
              return (
                openBlock(),
                createBlock(
                  'div',
                  {
                    key: item.pagePath,
                    class: 'uni-tabbar__item',
                    onClick: $event => _ctx._switchTab(item, index2)
                  },
                  [
                    createVNode('div', _hoisted_1, [
                      item.iconPath
                        ? (openBlock(),
                          createBlock(
                            'div',
                            {
                              key: 0,
                              class: [
                                { 'uni-tabbar__icon__diff': !item.text },
                                'uni-tabbar__icon'
                              ]
                            },
                            [
                              createVNode(
                                'img',
                                {
                                  src: _ctx._getRealPath(
                                    _ctx.$route.meta.pagePath === item.pagePath
                                      ? item.selectedIconPath
                                      : item.iconPath
                                  )
                                },
                                null,
                                8,
                                ['src']
                              ),
                              item.redDot
                                ? (openBlock(),
                                  createBlock(
                                    'div',
                                    {
                                      key: 0,
                                      class: [
                                        { 'uni-tabbar__badge': !!item.badge },
                                        'uni-tabbar__reddot'
                                      ]
                                    },
                                    toDisplayString(item.badge),
                                    3
                                  ))
                                : createCommentVNode('v-if', true)
                            ],
                            2
                          ))
                        : createCommentVNode('v-if', true),
                      item.text
                        ? (openBlock(),
                          createBlock(
                            'div',
                            {
                              key: 1,
                              style: {
                                color:
                                  _ctx.$route.meta.pagePath === item.pagePath
                                    ? _ctx.selectedColor
                                    : _ctx.color,
                                fontSize: item.iconPath ? '10px' : '14px'
                              },
                              class: 'uni-tabbar__label'
                            },
                            [
                              createTextVNode(
                                toDisplayString(item.text) + ' ',
                                1
                              ),
                              item.redDot && !item.iconPath
                                ? (openBlock(),
                                  createBlock(
                                    'div',
                                    {
                                      key: 0,
                                      class: [
                                        { 'uni-tabbar__badge': !!item.badge },
                                        'uni-tabbar__reddot'
                                      ]
                                    },
                                    toDisplayString(item.badge),
                                    3
                                  ))
                                : createCommentVNode('v-if', true)
                            ],
                            4
                          ))
                        : createCommentVNode('v-if', true)
                    ])
                  ],
                  8,
                  ['onClick']
                )
              )
            }),
            128
          ))
        ],
        4
      ),
      _hoisted_2
    ])
  )
}
script.render = render
script.__file = 'packages/uni-h5/src/framework/components/app/tabBar.vue'
var Transtion = {
  methods: {
    beforeTransition() {},
    afterTransition() {}
  }
}
var script$1 = {
  name: 'Toast',
  mixins: [Transtion],
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      default: 'success',
      validator(value) {
        return ['success', 'loading', 'none'].indexOf(value) !== -1
      }
    },
    image: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 1500
    },
    mask: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconClass() {
      if (this.icon === 'success') {
        return 'uni-icon-success-no-circle'
      }
      if (this.icon === 'loading') {
        return 'uni-loading'
      }
      return ''
    }
  },
  beforeUpdate() {
    if (this.visible) {
      this.timeoutId && clearTimeout(this.timeoutId)
      this.timeoutId = setTimeout(() => {
        UniServiceJSBridge.emit('onHideToast')
      }, this.duration)
    }
  }
}
const _hoisted_1$1 = {
  key: 1,
  class: 'uni-sample-toast'
}
const _hoisted_2$1 = { class: 'uni-simple-toast__text' }
const _hoisted_3 = {
  key: 2,
  class: 'uni-toast'
}
const _hoisted_4 = { class: 'uni-toast__content' }
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    openBlock(),
    createBlock(
      Transition,
      { name: 'uni-fade' },
      {
        default: withCtx(() => [
          _ctx.visible
            ? (openBlock(),
              createBlock(
                'uni-toast',
                {
                  key: 0,
                  'data-duration': _ctx.duration
                },
                [
                  _ctx.mask
                    ? (openBlock(),
                      createBlock(
                        'div',
                        {
                          key: 0,
                          class: 'uni-mask',
                          style: { background: 'transparent' },
                          onTouchmovePassive:
                            _cache[1] ||
                            (_cache[1] = withModifiers(() => {}, ['prevent']))
                        },
                        null,
                        32
                      ))
                    : createCommentVNode('v-if', true),
                  !_ctx.image && !_ctx.iconClass
                    ? (openBlock(),
                      createBlock('div', _hoisted_1$1, [
                        createVNode(
                          'p',
                          _hoisted_2$1,
                          toDisplayString(_ctx.title),
                          1
                        )
                      ]))
                    : (openBlock(),
                      createBlock('div', _hoisted_3, [
                        _ctx.image
                          ? (openBlock(),
                            createBlock(
                              'img',
                              {
                                key: 0,
                                src: _ctx.image,
                                class: 'uni-toast__icon'
                              },
                              null,
                              8,
                              ['src']
                            ))
                          : (openBlock(),
                            createBlock(
                              'i',
                              {
                                key: 1,
                                class: [_ctx.iconClass, 'uni-icon_toast']
                              },
                              null,
                              2
                            )),
                        createVNode(
                          'p',
                          _hoisted_4,
                          toDisplayString(_ctx.title),
                          1
                        )
                      ]))
                ],
                8,
                ['data-duration']
              ))
            : createCommentVNode('v-if', true)
        ]),
        _: 1
      }
    )
  )
}
script$1.render = render$1
script$1.__file = 'packages/uni-h5/src/framework/components/app/popup/toast.vue'
var script$2 = {
  name: 'Modal',
  mixins: [Transtion],
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    cancelColor: {
      type: String,
      default: '#000000'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    confirmColor: {
      type: String,
      default: '#007aff'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    _close(type) {
      this.$emit('close', type)
    }
  }
}
const _hoisted_1$2 = /* @__PURE__ */ createVNode(
  'div',
  { class: 'uni-mask' },
  null,
  -1
)
const _hoisted_2$2 = { class: 'uni-modal' }
const _hoisted_3$1 = {
  key: 0,
  class: 'uni-modal__hd'
}
const _hoisted_4$1 = { class: 'uni-modal__ft' }
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    openBlock(),
    createBlock(
      Transition,
      { name: 'uni-fade' },
      {
        default: withCtx(() => [
          withDirectives(
            createVNode(
              'uni-modal',
              {
                onTouchmovePassive:
                  _cache[4] ||
                  (_cache[4] = withModifiers(() => {}, ['prevent']))
              },
              [
                _hoisted_1$2,
                createVNode('div', _hoisted_2$2, [
                  _ctx.title
                    ? (openBlock(),
                      createBlock('div', _hoisted_3$1, [
                        createVNode(
                          'strong',
                          {
                            class: 'uni-modal__title',
                            textContent: _ctx.title
                          },
                          null,
                          8,
                          ['textContent']
                        )
                      ]))
                    : createCommentVNode('v-if', true),
                  createVNode(
                    'div',
                    {
                      class: 'uni-modal__bd',
                      onTouchmovePassive:
                        _cache[1] ||
                        (_cache[1] = withModifiers(() => {}, ['stop'])),
                      textContent: _ctx.content
                    },
                    null,
                    40,
                    ['textContent']
                  ),
                  createVNode('div', _hoisted_4$1, [
                    _ctx.showCancel
                      ? (openBlock(),
                        createBlock(
                          'div',
                          {
                            key: 0,
                            style: { color: _ctx.cancelColor },
                            class: 'uni-modal__btn uni-modal__btn_default',
                            onClick:
                              _cache[2] ||
                              (_cache[2] = $event => _ctx._close('cancel'))
                          },
                          toDisplayString(_ctx.cancelText),
                          5
                        ))
                      : createCommentVNode('v-if', true),
                    createVNode(
                      'div',
                      {
                        style: { color: _ctx.confirmColor },
                        class: 'uni-modal__btn uni-modal__btn_primary',
                        onClick:
                          _cache[3] ||
                          (_cache[3] = $event => _ctx._close('confirm'))
                      },
                      toDisplayString(_ctx.confirmText),
                      5
                    )
                  ])
                ])
              ],
              544
            ),
            [[vShow, _ctx.visible]]
          )
        ]),
        _: 1
      }
    )
  )
}
script$2.render = render$2
script$2.__file = 'packages/uni-h5/src/framework/components/app/popup/modal.vue'
var script$3 = {
  name: 'ActionSheet',
  props: {
    title: {
      type: String,
      default: ''
    },
    itemList: {
      type: Array,
      default() {
        return []
      }
    },
    itemColor: {
      type: String,
      default: '#000000'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    _close(tapIndex) {
      this.$emit('close', tapIndex)
    }
  }
}
const _hoisted_1$3 = { class: 'uni-actionsheet__menu' }
const _hoisted_2$3 = {
  key: 0,
  class: 'uni-actionsheet__title'
}
const _hoisted_3$2 = { class: 'uni-actionsheet__action' }
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    openBlock(),
    createBlock(
      'uni-actionsheet',
      {
        onTouchmovePassive:
          _cache[3] || (_cache[3] = withModifiers(() => {}, ['prevent']))
      },
      [
        createVNode(
          Transition,
          { name: 'uni-fade' },
          {
            default: withCtx(() => [
              withDirectives(
                createVNode(
                  'div',
                  {
                    class: 'uni-mask',
                    onClick:
                      _cache[1] || (_cache[1] = $event => _ctx._close(-1))
                  },
                  null,
                  512
                ),
                [[vShow, _ctx.visible]]
              )
            ]),
            _: 1
          }
        ),
        createVNode(
          'div',
          {
            class: [
              { 'uni-actionsheet_toggle': _ctx.visible },
              'uni-actionsheet'
            ]
          },
          [
            createVNode('div', _hoisted_1$3, [
              _ctx.title
                ? (openBlock(),
                  createBlock(
                    'div',
                    _hoisted_2$3,
                    toDisplayString(_ctx.title),
                    1
                  ))
                : createCommentVNode('v-if', true),
              (openBlock(true),
              createBlock(
                Fragment,
                null,
                renderList(_ctx.itemList, (itemTitle, index2) => {
                  return (
                    openBlock(),
                    createBlock(
                      'div',
                      {
                        key: index2,
                        style: { color: _ctx.itemColor },
                        class: 'uni-actionsheet__cell',
                        onClick: $event => _ctx._close(index2)
                      },
                      toDisplayString(itemTitle),
                      13,
                      ['onClick']
                    )
                  )
                }),
                128
              ))
            ]),
            createVNode('div', _hoisted_3$2, [
              createVNode(
                'div',
                {
                  style: { color: _ctx.itemColor },
                  class: 'uni-actionsheet__cell',
                  onClick: _cache[2] || (_cache[2] = $event => _ctx._close(-1))
                },
                ' 取消 ',
                4
              )
            ])
          ],
          2
        )
      ],
      32
    )
  )
}
script$3.render = render$3
script$3.__file =
  'packages/uni-h5/src/framework/components/app/popup/actionSheet.vue'
var Components = {
  Toast: script$1,
  Modal: script$2,
  ActionSheet: script$3
}
var components = {
  TabBar: script,
  ...Components
}
var ActionSheet = {
  data() {
    return {
      showActionSheet: {
        visible: false
      }
    }
  },
  created() {
    UniServiceJSBridge.on('onShowActionSheet', (args, callback) => {
      this.showActionSheet = args
      this.onActionSheetCloseCallback = callback
    })
    UniServiceJSBridge.on('onHidePopup', args => {
      this.showActionSheet.visible = false
    })
  },
  methods: {
    _onActionSheetClose(type) {
      this.showActionSheet.visible = false
      isFunction(this.onActionSheetCloseCallback) &&
        this.onActionSheetCloseCallback(type)
    }
  }
}
var Modal = {
  data() {
    return {
      showModal: {
        visible: false
      }
    }
  },
  created() {
    UniServiceJSBridge.on('onShowModal', (args, callback) => {
      this.showModal = args
      this.onModalCloseCallback = callback
    })
    UniServiceJSBridge.on('onHidePopup', args => {
      this.showModal.visible = false
    })
  },
  methods: {
    _onModalClose(type) {
      this.showModal.visible = false
      isFunction(this.onModalCloseCallback) && this.onModalCloseCallback(type)
    }
  }
}
var Toast = {
  data() {
    return {
      showToast: {
        visible: false
      }
    }
  },
  created() {
    let showType = ''
    const createOnShow = type => {
      return args => {
        showType = type
        setTimeout(() => {
          this.showToast = args
        }, 10)
      }
    }
    UniServiceJSBridge.on('onShowToast', createOnShow('onShowToast'))
    UniServiceJSBridge.on('onShowLoading', createOnShow('onShowLoading'))
    const createOnHide = type => {
      return () => {
        if (!showType) {
          return
        }
        let warnMsg = ''
        if (type === 'onHideToast' && showType !== 'onShowToast') {
          warnMsg = '请注意 showToast 与 hideToast 必须配对使用'
        } else if (type === 'onHideLoading' && showType !== 'onShowLoading') {
          warnMsg = '请注意 showLoading 与 hideLoading 必须配对使用'
        }
        if (warnMsg) {
          return console.warn(warnMsg)
        }
        showType = ''
        setTimeout(() => {
          this.showToast.visible = false
        }, 10)
      }
    }
    UniServiceJSBridge.on('onHidePopup', createOnHide('onHidePopup'))
    UniServiceJSBridge.on('onHideToast', createOnHide('onHideToast'))
    UniServiceJSBridge.on('onHideLoading', createOnHide('onHideLoading'))
  }
}
var mixins = [ActionSheet, Modal, Toast, Transtion]
var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
var lookup = new Uint8Array(256)
for (var i = 0; i < chars.length; i++) {
  lookup[chars.charCodeAt(i)] = i
}
var encode = function(arraybuffer) {
  var bytes = new Uint8Array(arraybuffer),
    i,
    len = bytes.length,
    base64 = ''
  for (i = 0; i < len; i += 3) {
    base64 += chars[bytes[i] >> 2]
    base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)]
    base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)]
    base64 += chars[bytes[i + 2] & 63]
  }
  if (len % 3 === 2) {
    base64 = base64.substring(0, base64.length - 1) + '='
  } else if (len % 3 === 1) {
    base64 = base64.substring(0, base64.length - 2) + '=='
  }
  return base64
}
var decode = function(base64) {
  var bufferLength = base64.length * 0.75,
    len = base64.length,
    i,
    p = 0,
    encoded1,
    encoded2,
    encoded3,
    encoded4
  if (base64[base64.length - 1] === '=') {
    bufferLength--
    if (base64[base64.length - 2] === '=') {
      bufferLength--
    }
  }
  var arraybuffer = new ArrayBuffer(bufferLength),
    bytes = new Uint8Array(arraybuffer)
  for (i = 0; i < len; i += 4) {
    encoded1 = lookup[base64.charCodeAt(i)]
    encoded2 = lookup[base64.charCodeAt(i + 1)]
    encoded3 = lookup[base64.charCodeAt(i + 2)]
    encoded4 = lookup[base64.charCodeAt(i + 3)]
    bytes[p++] = (encoded1 << 2) | (encoded2 >> 4)
    bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2)
    bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63)
  }
  return arraybuffer
}
function createApi(fn, validate) {
  if (process.env.NODE_ENV !== 'production' && validate);
  return fn
}
const Base64ToArrayBufferProtocol = [
  {
    name: 'base64',
    type: String,
    required: true
  }
]
const ArrayBufferToBase64Protocol = [
  {
    name: 'arrayBuffer',
    type: [ArrayBuffer, Uint8Array],
    required: true
  }
]
const base64ToArrayBuffer = /* @__PURE__ */ createApi(base642 => {
  return decode(base642)
}, Base64ToArrayBufferProtocol)
const arrayBufferToBase64 = /* @__PURE__ */ createApi(arrayBuffer => {
  return encode(arrayBuffer)
}, ArrayBufferToBase64Protocol)
const Upx2pxProtocol = [
  {
    name: 'upx',
    type: [Number, String],
    required: true
  }
]
const EPS = 1e-4
const BASE_DEVICE_WIDTH = 750
let isIOS = false
let deviceWidth = 0
let deviceDPR = 0
function checkDeviceWidth() {
  const { platform, pixelRatio, windowWidth } = __GLOBAL__.getSystemInfoSync()
  deviceWidth = windowWidth
  deviceDPR = pixelRatio
  isIOS = platform === 'ios'
}
const upx2px = /* @__PURE__ */ createApi((number, newDeviceWidth) => {
  if (deviceWidth === 0) {
    checkDeviceWidth()
  }
  number = Number(number)
  if (number === 0) {
    return 0
  }
  let result = (number / BASE_DEVICE_WIDTH) * (newDeviceWidth || deviceWidth)
  if (result < 0) {
    result = -result
  }
  result = Math.floor(result + EPS)
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1
    } else {
      result = 0.5
    }
  }
  return number < 0 ? -result : result
}, Upx2pxProtocol)
var HOOKS
;(function(HOOKS2) {
  HOOKS2['INVOKE'] = 'invoke'
  HOOKS2['SUCCESS'] = 'success'
  HOOKS2['FAIL'] = 'fail'
  HOOKS2['COMPLETE'] = 'complete'
  HOOKS2['RETURN_VALUE'] = 'returnValue'
})(HOOKS || (HOOKS = {}))
const globalInterceptors = {}
const scopedInterceptors = {}
const AddInterceptorProtocol = [
  {
    name: 'method',
    type: [String, Object],
    required: true
  }
]
const RemoveInterceptorProtocol = AddInterceptorProtocol
function mergeInterceptorHook(interceptors, interceptor3) {
  Object.keys(interceptor3).forEach(hook => {
    if (isFunction(interceptor3[hook])) {
      interceptors[hook] = mergeHook(interceptors[hook], interceptor3[hook])
    }
  })
}
function removeInterceptorHook(interceptors, interceptor3) {
  if (!interceptors || !interceptor3) {
    return
  }
  Object.keys(interceptor3).forEach(hook => {
    if (isFunction(interceptor3[hook])) {
      removeHook(interceptors[hook], interceptor3[hook])
    }
  })
}
function mergeHook(parentVal, childVal) {
  const res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
  return res ? dedupeHooks(res) : res
}
function dedupeHooks(hooks) {
  const res = []
  for (let i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i])
    }
  }
  return res
}
function removeHook(hooks, hook) {
  if (!hooks) {
    return
  }
  const index2 = hooks.indexOf(hook)
  if (index2 !== -1) {
    hooks.splice(index2, 1)
  }
}
const addInterceptor = /* @__PURE__ */ createApi((method, interceptor3) => {
  if (typeof method === 'string' && isPlainObject(interceptor3)) {
    mergeInterceptorHook(
      scopedInterceptors[method] || (scopedInterceptors[method] = {}),
      interceptor3
    )
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method)
  }
}, AddInterceptorProtocol)
const removeInterceptor = /* @__PURE__ */ createApi((method, interceptor3) => {
  if (typeof method === 'string') {
    if (isPlainObject(interceptor3)) {
      removeInterceptorHook(scopedInterceptors[method], interceptor3)
    } else {
      delete scopedInterceptors[method]
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method)
  }
}, RemoveInterceptorProtocol)
const promiseInterceptor = {
  returnValue(res) {
    if (!isPromise(res)) {
      return res
    }
    return res
      .then(res2 => {
        return res2[1]
      })
      .catch(res2 => {
        return res2[0]
      })
  }
}
const createIntersectionObserver$1 = /* @__PURE__ */ createApi(() => {})
const createSelectorQuery$1 = /* @__PURE__ */ createApi(() => {})
const CanIUseProtocol = [
  {
    name: 'schema',
    type: String,
    required: true
  }
]
const MakePhoneCallProtocol = {
  phoneNumber: {
    type: String,
    required: true,
    validator(phoneNumber) {
      if (!phoneNumber) {
        return 'makePhoneCall:fail parameter error: parameter.phoneNumber should not be empty String;'
      }
    }
  }
}
const OpenDocumentProtocol = {
  filePath: {
    type: String,
    required: true
  },
  fileType: {
    type: String
  }
}
function cssSupports(css) {
  return window.CSS && window.CSS.supports && window.CSS.supports(css)
}
const SCHEMA_CSS = {
  'css.var': cssSupports('--a:0'),
  'css.env': cssSupports('top:env(a)'),
  'css.constant': cssSupports('top:constant(a)')
}
const canIUse = /* @__PURE__ */ createApi(schema => {
  if (hasOwn(SCHEMA_CSS, schema)) {
    return SCHEMA_CSS[schema]
  }
  return true
}, CanIUseProtocol)
const makePhoneCall = /* @__PURE__ */ createApi(({ phoneNumber }) => {
  window.location.href = `tel:${phoneNumber}`
  return {
    errMsg: 'makePhoneCall:ok'
  }
}, MakePhoneCallProtocol)
const ua = navigator.userAgent
const isAndroid = /android/i.test(ua)
const isIOS$1 = /iphone|ipad|ipod/i.test(ua)
const getSystemInfoSync = /* @__PURE__ */ createApi(() => {
  var screen = window.screen
  var pixelRatio = window.devicePixelRatio
  const screenFix =
    /^Apple/.test(navigator.vendor) && typeof window.orientation === 'number'
  const landscape = screenFix && Math.abs(window.orientation) === 90
  var screenWidth = screenFix
    ? Math[landscape ? 'max' : 'min'](screen.width, screen.height)
    : screen.width
  var screenHeight = screenFix
    ? Math[landscape ? 'min' : 'max'](screen.height, screen.width)
    : screen.height
  var windowWidth =
    Math.min(
      window.innerWidth,
      document.documentElement.clientWidth,
      screenWidth
    ) || screenWidth
  var windowHeight = window.innerHeight
  var language = navigator.language
  var statusBarHeight = out.top
  var osname
  var osversion
  var model
  if (isIOS$1) {
    osname = 'iOS'
    const osversionFind = ua.match(/OS\s([\w_]+)\slike/)
    if (osversionFind) {
      osversion = osversionFind[1].replace(/_/g, '.')
    }
    const modelFind = ua.match(/\(([a-zA-Z]+);/)
    if (modelFind) {
      model = modelFind[1]
    }
  } else if (isAndroid) {
    osname = 'Android'
    const osversionFind = ua.match(/Android[\s/]([\w\.]+)[;\s]/)
    if (osversionFind) {
      osversion = osversionFind[1]
    }
    const infoFind = ua.match(/\((.+?)\)/)
    const infos = infoFind ? infoFind[1].split(';') : ua.split(' ')
    const otherInfo = [
      /\bAndroid\b/i,
      /\bLinux\b/i,
      /\bU\b/i,
      /^\s?[a-z][a-z]$/i,
      /^\s?[a-z][a-z]-[a-z][a-z]$/i,
      /\bwv\b/i,
      /\/[\d\.,]+$/,
      /^\s?[\d\.,]+$/,
      /\bBrowser\b/i,
      /\bMobile\b/i
    ]
    for (let i = 0; i < infos.length; i++) {
      const info = infos[i]
      if (info.indexOf('Build') > 0) {
        model = info.split('Build')[0].trim()
        break
      }
      let other
      for (let o = 0; o < otherInfo.length; o++) {
        if (otherInfo[o].test(info)) {
          other = true
          break
        }
      }
      if (!other) {
        model = info.trim()
        break
      }
    }
  } else {
    osname = 'Other'
    osversion = '0'
  }
  var system = `${osname} ${osversion}`
  var platform = osname.toLocaleLowerCase()
  var safeArea = {
    left: out.left,
    right: windowWidth - out.right,
    top: out.top,
    bottom: windowHeight - out.bottom,
    width: windowWidth - out.left - out.right,
    height: windowHeight - out.top - out.bottom
  }
  const { top: windowTop, bottom: windowBottom } = getWindowOffset()
  windowHeight -= windowTop
  windowHeight -= windowBottom
  return {
    windowTop,
    windowBottom,
    windowWidth,
    windowHeight,
    pixelRatio,
    screenWidth,
    screenHeight,
    language,
    statusBarHeight,
    system,
    platform,
    model,
    safeArea,
    safeAreaInsets: {
      top: out.top,
      right: out.right,
      bottom: out.bottom,
      left: out.left
    }
  }
})
const getSystemInfo = /* @__PURE__ */ createApi(() => {
  return getSystemInfoSync()
})
const openDocument = /* @__PURE__ */ createApi(option => {
  window.open(option.filePath)
  return true
}, OpenDocumentProtocol)
const navigateBack = /* @__PURE__ */ createApi(() => {})
const navigateTo = /* @__PURE__ */ createApi(() => {})
const redirectTo = /* @__PURE__ */ createApi(() => {})
const reLaunch = /* @__PURE__ */ createApi(() => {})
const switchTab = /* @__PURE__ */ createApi(() => {})
var api = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  upx2px,
  addInterceptor,
  removeInterceptor,
  promiseInterceptor,
  arrayBufferToBase64,
  base64ToArrayBuffer,
  createSelectorQuery: createSelectorQuery$1,
  createIntersectionObserver: createIntersectionObserver$1,
  canIUse,
  makePhoneCall,
  getSystemInfo,
  getSystemInfoSync,
  openDocument,
  navigateBack,
  navigateTo,
  redirectTo,
  reLaunch,
  switchTab
})
var script$4 = {
  name: 'App',
  components,
  mixins,
  props: {
    keepAliveInclude: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      transitionName: 'fade',
      hideTabBar: false,
      tabBar: __uniConfig.tabBar || {},
      sysComponents: this.$sysComponents
    }
  },
  computed: {
    key() {
      return (
        this.$route.meta.name +
        '-' +
        this.$route.params.__id__ +
        '-' +
        (__uniConfig.reLaunch || 1)
      )
    },
    hasTabBar() {
      return (
        __uniConfig.tabBar &&
        __uniConfig.tabBar.list &&
        __uniConfig.tabBar.list.length
      )
    },
    showTabBar() {
      return this.$route.meta.isTabBar && !this.hideTabBar
    }
  },
  watch: {
    $route(newRoute, oldRoute) {
      UniServiceJSBridge.emit('onHidePopup')
    },
    hideTabBar(newVal, oldVal) {
      if (canIUse('css.var')) {
        const windowBottomValue = !newVal ? TABBAR_HEIGHT : 0
        const envMethod = canIUse('css.env')
          ? 'env'
          : canIUse('css.constant')
            ? 'constant'
            : ''
        const windowBottom =
          windowBottomValue && envMethod
            ? `calc(${windowBottomValue}px + ${envMethod}(safe-area-inset-bottom))`
            : `${windowBottomValue}px`
        document.documentElement.style.setProperty(
          '--window-bottom',
          windowBottom
        )
        console.debug(
          `uni.${
            windowBottom ? 'showTabBar' : 'hideTabBar'
          }：--window-bottom=${windowBottom}`
        )
      }
      window.dispatchEvent(new CustomEvent('resize'))
    }
  },
  created() {
    if (canIUse('css.var')) {
      document.documentElement.style.setProperty('--status-bar-height', '0px')
    }
  },
  mounted() {
    window.addEventListener('message', function(evt) {
      if (
        isPlainObject(evt.data) &&
        evt.data.type === 'WEB_INVOKE_APPSERVICE'
      ) {
        UniServiceJSBridge.emit(
          'onWebInvokeAppService',
          evt.data.data,
          evt.data.pageId
        )
      }
    })
    document.addEventListener('visibilitychange', function() {
      if (document.visibilityState === 'visible') {
        UniServiceJSBridge.emit('onAppEnterForeground')
      } else {
        UniServiceJSBridge.emit('onAppEnterBackground')
      }
    })
  }
}
function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_view = resolveComponent('router-view')
  const _component_tab_bar = resolveComponent('tab-bar')
  const _component_toast = resolveComponent('toast')
  const _component_action_sheet = resolveComponent('action-sheet')
  const _component_modal = resolveComponent('modal')
  return (
    openBlock(),
    createBlock(
      'uni-app',
      {
        class: { 'uni-app--showtabbar': _ctx.showTabBar }
      },
      [
        createCommentVNode(' <transition :name="transitionName"> '),
        createCommentVNode(' TODO '),
        createVNode(
          _component_router_view,
          { key: _ctx.key },
          {
            default: withCtx(({ Component }) => [
              (openBlock(),
              createBlock(
                KeepAlive,
                { include: _ctx.keepAliveInclude },
                [
                  (openBlock(), createBlock(resolveDynamicComponent(Component)))
                ],
                1032,
                ['include']
              ))
            ]),
            _: 1
          }
        ),
        createCommentVNode(' </transition> '),
        _ctx.hasTabBar
          ? withDirectives(
              createVNode(
                _component_tab_bar,
                mergeProps({ key: 0 }, _ctx.tabBar),
                null,
                16
              ),
              [[vShow, _ctx.showTabBar]]
            )
          : createCommentVNode('v-if', true),
        _ctx.$options.components.Toast
          ? createVNode(
              _component_toast,
              mergeProps({ key: 1 }, _ctx.showToast),
              null,
              16
            )
          : createCommentVNode('v-if', true),
        _ctx.$options.components.ActionSheet
          ? createVNode(
              _component_action_sheet,
              mergeProps({ key: 2 }, _ctx.showActionSheet, {
                onClose: _ctx._onActionSheetClose
              }),
              null,
              16,
              ['onClose']
            )
          : createCommentVNode('v-if', true),
        _ctx.$options.components.Modal
          ? createVNode(
              _component_modal,
              mergeProps({ key: 3 }, _ctx.showModal, {
                onClose: _ctx._onModalClose
              }),
              null,
              16,
              ['onClose']
            )
          : createCommentVNode('v-if', true),
        _ctx.sysComponents && _ctx.sysComponents.length
          ? (openBlock(true),
            createBlock(
              Fragment,
              { key: 4 },
              renderList(_ctx.sysComponents, (item, index2) => {
                return (
                  openBlock(),
                  createBlock(resolveDynamicComponent(item), { key: index2 })
                )
              }),
              128
            ))
          : createCommentVNode('v-if', true)
      ],
      2
    )
  )
}
script$4.render = render$4
script$4.__file = 'packages/uni-h5/src/framework/components/app/index.vue'
function initSystemComponents(app2) {
  script$4.name = COMPONENT_NAME_PREFIX + script$4.name
  app2.component(script$4.name, script$4)
}
var index = {
  install(app) {
    initBridge$1()
    initApp(app)
    initView(app)
    initService(app)
    initSystemComponents(app)
    initRouter(app)
  }
}
const uni$1 = api
let appVm
function getApp() {
  return appVm
}
function getCurrentPages$1() {
  return []
}
function mergeTitleNView(navigationBar, titleNView) {
  if (isPlainObject(titleNView)) {
    if (hasOwn(titleNView, 'backgroundColor')) {
      navigationBar.backgroundColor = titleNView.backgroundColor
    }
    if (hasOwn(titleNView, 'buttons')) {
      navigationBar.buttons = titleNView.buttons
    }
    if (hasOwn(titleNView, 'titleColor')) {
      navigationBar.textColor = titleNView.titleColor
    }
    if (hasOwn(titleNView, 'titleText')) {
      navigationBar.titleText = titleNView.titleText
    }
    if (hasOwn(titleNView, 'titleSize')) {
      navigationBar.titleSize = titleNView.titleSize
    }
    if (hasOwn(titleNView, 'type')) {
      navigationBar.type = titleNView.type
    }
    if (
      hasOwn(titleNView, 'searchInput') &&
      typeof titleNView.searchInput === 'object'
    ) {
      navigationBar.searchInput = Object.assign(
        {
          autoFocus: false,
          align: 'center',
          color: '#000000',
          backgroundColor: 'rgba(255,255,255,0.5)',
          borderRadius: '0px',
          placeholder: '',
          placeholderColor: '#CCCCCC',
          disabled: false
        },
        titleNView.searchInput
      )
    }
  }
  return navigationBar
}
function appendCss(css, cssId, replace = false) {
  let style = document.getElementById(cssId)
  if (style && replace) {
    style.parentNode.removeChild(style)
    style = null
  }
  if (!style) {
    style = document.createElement('style')
    style.type = 'text/css'
    cssId && (style.id = cssId)
    document.getElementsByTagName('head')[0].appendChild(style)
  }
  style.appendChild(document.createTextNode(css))
}
function hexToRgba(hex) {
  let r
  let g
  let b
  hex = hex.replace('#', '')
  if (hex.length === 6) {
    r = hex.substring(0, 2)
    g = hex.substring(2, 4)
    b = hex.substring(4, 6)
  } else if (hex.length === 3) {
    r = hex.substring(0, 1)
    g = hex.substring(1, 2)
    b = hex.substring(2, 3)
  } else {
    return false
  }
  if (r.length === 1) {
    r += r
  }
  if (g.length === 1) {
    g += g
  }
  if (b.length === 1) {
    b += b
  }
  r = parseInt(r, 16)
  g = parseInt(g, 16)
  b = parseInt(b, 16)
  return {
    r,
    g,
    b
  }
}
var transparent = {
  mounted() {
    if (this.type === 'transparent') {
      const transparentElemStyle = this.$el.querySelector(
        '.uni-page-head-transparent'
      ).style
      const titleElem = this.$el.querySelector('.uni-page-head__title')
      const iconElems = this.$el.querySelectorAll('.uni-btn-icon')
      const iconElemsStyles = []
      const textColor = this.textColor
      for (let i = 0; i < iconElems.length; i++) {
        iconElemsStyles.push(iconElems[i].style)
      }
      const borderRadiusElems = this.$el.querySelectorAll('.uni-page-head-btn')
      const oldColors = []
      const borderRadiusElemsStyles = []
      for (let i = 0; i < borderRadiusElems.length; i++) {
        const borderRadiusElem = borderRadiusElems[i]
        oldColors.push(getComputedStyle(borderRadiusElem).backgroundColor)
        borderRadiusElemsStyles.push(borderRadiusElem.style)
      }
      this._A = 0
      UniViewJSBridge.on('onPageScroll', ({ scrollTop }) => {
        const alpha = Math.min(scrollTop / this.offset, 1)
        if (alpha === 1 && this._A === 1) {
          return
        }
        if (alpha > 0.5 && this._A <= 0.5) {
          iconElemsStyles.forEach(function(iconElemStyle) {
            iconElemStyle.color = textColor
          })
        } else if (alpha <= 0.5 && this._A > 0.5) {
          iconElemsStyles.forEach(function(iconElemStyle) {
            iconElemStyle.color = '#fff'
          })
        }
        this._A = alpha
        if (titleElem) {
          titleElem.style.opacity = alpha
        }
        transparentElemStyle.backgroundColor = `rgba(${this._R},${this._G},${
          this._B
        },${alpha})`
        borderRadiusElemsStyles.forEach(function(
          borderRadiusElemStyle,
          index2
        ) {
          const oldColor = oldColors[index2]
          let rgba = oldColor.match(/[\d+\.]+/g)
          rgba[3] = (1 - alpha) * (rgba.length === 4 ? rgba[3] : 1)
          borderRadiusElemStyle.backgroundColor = `rgba(${rgba})`
        })
      })
    } else if (this.type === 'float') {
      const iconElems = this.$el.querySelectorAll('.uni-btn-icon')
      const iconElemsStyles = []
      for (let i = 0; i < iconElems.length; i++) {
        iconElemsStyles.push(iconElems[i].style)
      }
      const borderRadiusElems = this.$el.querySelectorAll('.uni-page-head-btn')
      const oldColors = []
      const borderRadiusElemsStyles = []
      for (let i = 0; i < borderRadiusElems.length; i++) {
        const borderRadiusElem = borderRadiusElems[i]
        oldColors.push(getComputedStyle(borderRadiusElem).backgroundColor)
        borderRadiusElemsStyles.push(borderRadiusElem.style)
      }
    }
  },
  computed: {
    color() {
      return this.type === 'transparent' ? '#fff' : this.textColor
    },
    offset() {
      return parseInt(this.coverage)
    },
    bgColor() {
      if (this.type === 'transparent') {
        const { r, g, b } = hexToRgba(this.backgroundColor)
        this._R = r
        this._G = g
        this._B = b
        return `rgba(${r},${g},${b},0)`
      }
      return this.backgroundColor
    }
  }
}
const FONTS = {
  forward: '&#xe600;',
  back: '&#xe601;',
  share: '&#xe602;',
  favorite: '&#xe604;',
  home: '&#xe605;',
  menu: '&#xe606;',
  close: '&#xe650;'
}
var script$5 = {
  name: 'PageHead',
  mixins: [transparent],
  components: {
    VUniInput: Input
  },
  props: {
    backButton: {
      type: Boolean,
      default: true
    },
    backgroundColor: {
      type: String,
      default() {
        return this.type === 'transparent' ? '#000' : '#F8F8F8'
      }
    },
    textColor: {
      type: String,
      default: '#fff'
    },
    titleText: {
      type: String,
      default: ''
    },
    duration: {
      type: String,
      default: '0'
    },
    timingFunc: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    titleSize: {
      type: String,
      default: '16px'
    },
    type: {
      default: 'default',
      validator(value) {
        return ['default', 'transparent', 'float'].indexOf(value) !== -1
      }
    },
    coverage: {
      type: String,
      default: '132px'
    },
    buttons: {
      type: Array,
      default() {
        return []
      }
    },
    searchInput: {
      type: [Object, Boolean],
      default() {
        return false
      }
    },
    titleImage: {
      type: String,
      default: ''
    },
    titlePenetrate: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      focus: false,
      text: '',
      composing: false
    }
  },
  computed: {
    btns() {
      const btns = []
      const fonts = {}
      if (this.buttons.length) {
        this.buttons.forEach(button => {
          const btn = Object.assign({}, button)
          if (btn.fontSrc && !btn.fontFamily) {
            const fontSrc = (btn.fontSrc = this.$getRealPath(btn.fontSrc))
            let fontFamily
            if (fontSrc in fonts) {
              fontFamily = fonts[fontSrc]
            } else {
              fontFamily = `font${Date.now()}`
              fonts[fontSrc] = fontFamily
              const cssText = `@font-face{font-family: "${fontFamily}";src: url("${fontSrc}") format("truetype")}`
              appendCss(cssText, 'uni-btn-font-' + fontFamily)
            }
            btn.fontFamily = fontFamily
          }
          btn.color =
            this.type === 'transparent' ? '#fff' : btn.color || this.textColor
          let fontSize =
            btn.fontSize ||
            (this.type === 'transparent' || /\\u/.test(btn.text)
              ? '22px'
              : '27px')
          if (/\d$/.test(fontSize)) {
            fontSize += 'px'
          }
          btn.fontSize = fontSize
          btn.fontWeight = btn.fontWeight || 'normal'
          btns.push(btn)
        })
      }
      return btns
    },
    leftBtns() {
      return this.btns.filter(btn => btn.float === 'left')
    },
    rightBtns() {
      return this.btns.filter(btn => btn.float !== 'left')
    },
    headClass() {
      const shadowColorType = this.shadow.colorType
      const data = {
        'uni-page-head-transparent': this.type === 'transparent',
        'uni-page-head-titlePenetrate': this.titlePenetrate,
        'uni-page-head-shadow': shadowColorType
      }
      if (shadowColorType) {
        data[`uni-page-head-shadow-${shadowColorType}`] = shadowColorType
      }
      return data
    }
  },
  mounted() {
    if (this.searchInput) {
      const input = this.$refs.input
      input.$watch('composing', val => {
        this.composing = val
      })
      if (this.searchInput.disabled) {
        input.$el.addEventListener('click', () => {
          UniServiceJSBridge.emit('onNavigationBarSearchInputClicked', '')
        })
      } else {
        input.$refs.input.addEventListener('keyup', event => {
          if (event.key.toUpperCase() === 'ENTER') {
            UniServiceJSBridge.emit('onNavigationBarSearchInputConfirmed', {
              text: this.text
            })
          }
        })
        input.$refs.input.addEventListener('focus', () => {
          UniServiceJSBridge.emit('onNavigationBarSearchInputFocusChanged', {
            focus: true
          })
        })
        input.$refs.input.addEventListener('blur', () => {
          UniServiceJSBridge.emit('onNavigationBarSearchInputFocusChanged', {
            focus: false
          })
        })
      }
    }
  },
  methods: {
    _back() {
      if (getCurrentPages().length === 1) {
        uni.reLaunch({
          url: '/'
        })
      } else {
        uni.navigateBack({
          from: 'backbutton'
        })
      }
    },
    _onBtnClick(index2) {
      UniServiceJSBridge.emit(
        'onNavigationBarButtonTap',
        Object.assign({}, this.btns[index2], {
          index: index2
        })
      )
    },
    _formatBtnFontText(btn) {
      if (btn.fontSrc && btn.fontFamily) {
        return btn.text.replace('\\u', '&#x')
      } else if (FONTS[btn.type]) {
        return FONTS[btn.type]
      }
      return btn.text || ''
    },
    _formatBtnStyle(btn) {
      const style = {
        color: btn.color,
        fontSize: btn.fontSize,
        fontWeight: btn.fontWeight
      }
      if (btn.fontFamily) {
        style.fontFamily = btn.fontFamily
      }
      return style
    },
    _focus() {
      this.focus = true
    },
    _blur() {
      this.focus = false
    },
    _input(text) {
      UniServiceJSBridge.emit('onNavigationBarSearchInputChanged', {
        text
      })
    }
  }
}
const _hoisted_1$4 = { class: 'uni-page-head-hd' }
const _hoisted_2$4 = {
  key: 0,
  class: 'uni-page-head-bd'
}
const _hoisted_3$3 = {
  key: 0,
  class: 'uni-loading'
}
const _hoisted_4$2 = { class: 'uni-page-head-ft' }
function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_VUniInput = resolveComponent('VUniInput')
  return (
    openBlock(),
    createBlock(
      'uni-page-head',
      { 'uni-page-head-type': _ctx.type },
      [
        createVNode(
          'div',
          {
            style: {
              transitionDuration: _ctx.duration,
              transitionTimingFunction: _ctx.timingFunc,
              backgroundColor: _ctx.bgColor,
              color: _ctx.textColor
            },
            class: [_ctx.headClass, 'uni-page-head']
          },
          [
            createVNode('div', _hoisted_1$4, [
              withDirectives(
                createVNode(
                  'div',
                  {
                    class: 'uni-page-head-btn',
                    onClick:
                      _cache[1] ||
                      (_cache[1] = (...args) => _ctx._back(...args))
                  },
                  [
                    createVNode(
                      'i',
                      {
                        style: { color: _ctx.color, fontSize: '27px' },
                        class: 'uni-btn-icon'
                      },
                      '',
                      4
                    )
                  ],
                  512
                ),
                [[vShow, _ctx.backButton]]
              ),
              (openBlock(true),
              createBlock(
                Fragment,
                null,
                renderList(_ctx.leftBtns, (btn, index2) => {
                  return (
                    openBlock(),
                    createBlock(
                      'div',
                      {
                        key: index2,
                        style: {
                          backgroundColor:
                            _ctx.type === 'transparent'
                              ? btn.background
                              : 'transparent',
                          width: btn.width
                        },
                        'badge-text': btn.badgeText,
                        class: [
                          {
                            'uni-page-head-btn-red-dot':
                              btn.redDot || btn.badgeText,
                            'uni-page-head-btn-select': btn.select
                          },
                          'uni-page-head-btn'
                        ]
                      },
                      [
                        createVNode(
                          'i',
                          {
                            style: _ctx._formatBtnStyle(btn),
                            class: 'uni-btn-icon',
                            onClick: $event => _ctx._onBtnClick(index2),
                            innerHTML: _ctx._formatBtnFontText(btn)
                          },
                          null,
                          12,
                          ['onClick', 'innerHTML']
                        )
                      ],
                      14,
                      ['badge-text']
                    )
                  )
                }),
                128
              ))
            ]),
            !_ctx.searchInput
              ? (openBlock(),
                createBlock('div', _hoisted_2$4, [
                  createVNode(
                    'div',
                    {
                      style: {
                        fontSize: _ctx.titleSize,
                        opacity: _ctx.type === 'transparent' ? 0 : 1
                      },
                      class: 'uni-page-head__title'
                    },
                    [
                      _ctx.loading
                        ? (openBlock(), createBlock('i', _hoisted_3$3))
                        : createCommentVNode('v-if', true),
                      _ctx.titleImage !== ''
                        ? (openBlock(),
                          createBlock(
                            'img',
                            {
                              key: 1,
                              src: _ctx.titleImage,
                              class: 'uni-page-head__title_image'
                            },
                            null,
                            8,
                            ['src']
                          ))
                        : (openBlock(),
                          createBlock(
                            Fragment,
                            { key: 2 },
                            [
                              createTextVNode(
                                toDisplayString(_ctx.titleText),
                                1
                              )
                            ],
                            64
                          ))
                    ],
                    4
                  )
                ]))
              : createCommentVNode('v-if', true),
            _ctx.searchInput
              ? (openBlock(),
                createBlock(
                  'div',
                  {
                    key: 1,
                    style: {
                      'border-radius': _ctx.searchInput.borderRadius,
                      'background-color': _ctx.searchInput.backgroundColor
                    },
                    class: 'uni-page-head-search'
                  },
                  [
                    createVNode(
                      'div',
                      {
                        style: { color: _ctx.searchInput.placeholderColor },
                        class: [
                          [
                            `uni-page-head-search-placeholder-${
                              _ctx.focus || _ctx.text
                                ? 'left'
                                : _ctx.searchInput.align
                            }`
                          ],
                          'uni-page-head-search-placeholder'
                        ],
                        textContent:
                          _ctx.text || _ctx.composing
                            ? ''
                            : _ctx.searchInput.placeholder
                      },
                      null,
                      14,
                      ['textContent']
                    ),
                    createVNode(
                      _component_VUniInput,
                      {
                        ref: 'input',
                        modelValue: _ctx.text,
                        'onUpdate:modelValue':
                          _cache[2] ||
                          (_cache[2] = $event => (_ctx.text = $event)),
                        focus: _ctx.searchInput.autoFocus,
                        disabled: _ctx.searchInput.disabled,
                        style: { color: _ctx.searchInput.color },
                        'placeholder-style': `color:${
                          _ctx.searchInput.placeholderColor
                        }`,
                        class: 'uni-page-head-search-input',
                        'confirm-type': 'search',
                        onFocus: _ctx._focus,
                        onBlur: _ctx._blur,
                        'onUpdate:value': _ctx._input
                      },
                      null,
                      8,
                      [
                        'modelValue',
                        'focus',
                        'disabled',
                        'style',
                        'placeholder-style',
                        'onFocus',
                        'onBlur',
                        'onUpdate:value'
                      ]
                    )
                  ],
                  4
                ))
              : createCommentVNode('v-if', true),
            createVNode('div', _hoisted_4$2, [
              (openBlock(true),
              createBlock(
                Fragment,
                null,
                renderList(_ctx.rightBtns, (btn, index2) => {
                  return (
                    openBlock(),
                    createBlock(
                      'div',
                      {
                        key: index2,
                        style: {
                          backgroundColor:
                            _ctx.type === 'transparent'
                              ? btn.background
                              : 'transparent',
                          width: btn.width
                        },
                        'badge-text': btn.badgeText,
                        class: [
                          {
                            'uni-page-head-btn-red-dot':
                              btn.redDot || btn.badgeText,
                            'uni-page-head-btn-select': btn.select
                          },
                          'uni-page-head-btn'
                        ]
                      },
                      [
                        createVNode(
                          'i',
                          {
                            style: _ctx._formatBtnStyle(btn),
                            class: 'uni-btn-icon',
                            onClick: $event => _ctx._onBtnClick(index2),
                            innerHTML: _ctx._formatBtnFontText(btn)
                          },
                          null,
                          12,
                          ['onClick', 'innerHTML']
                        )
                      ],
                      14,
                      ['badge-text']
                    )
                  )
                }),
                128
              ))
            ])
          ],
          6
        ),
        _ctx.type !== 'transparent' && _ctx.type !== 'float'
          ? (openBlock(),
            createBlock(
              'div',
              {
                key: 0,
                class: [
                  { 'uni-placeholder-titlePenetrate': _ctx.titlePenetrate },
                  'uni-placeholder'
                ]
              },
              null,
              2
            ))
          : createCommentVNode('v-if', true)
      ],
      8,
      ['uni-page-head-type']
    )
  )
}
script$5.render = render$5
script$5.__file = 'packages/uni-h5/src/framework/components/page/pageHead.vue'
var script$6 = {
  name: 'PageBody'
}
function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    openBlock(),
    createBlock('uni-page-wrapper', null, [
      createVNode('uni-page-body', null, [renderSlot(_ctx.$slots, 'default')])
    ])
  )
}
script$6.render = render$6
script$6.__file = 'packages/uni-h5/src/framework/components/page/pageBody.vue'
var script$7 = {
  name: 'PageRefresh',
  props: {
    color: {
      type: String,
      default: '#2BD009'
    },
    offset: {
      type: Number,
      default: 0
    }
  }
}
const _hoisted_1$5 = { class: 'uni-page-refresh-inner' }
const _hoisted_2$5 = /* @__PURE__ */ createVNode(
  'path',
  {
    d:
      'M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z'
  },
  null,
  -1
)
const _hoisted_3$4 = /* @__PURE__ */ createVNode(
  'path',
  {
    d: 'M0 0h24v24H0z',
    fill: 'none'
  },
  null,
  -1
)
const _hoisted_4$3 = {
  class: 'uni-page-refresh__spinner',
  width: '24',
  height: '24',
  viewBox: '25 25 50 50'
}
function render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    openBlock(),
    createBlock('uni-page-refresh', null, [
      createVNode(
        'div',
        {
          style: { 'margin-top': _ctx.offset + 'px' },
          class: 'uni-page-refresh'
        },
        [
          createVNode('div', _hoisted_1$5, [
            (openBlock(),
            createBlock(
              'svg',
              {
                fill: _ctx.color,
                class: 'uni-page-refresh__icon',
                width: '24',
                height: '24',
                viewBox: '0 0 24 24'
              },
              [_hoisted_2$5, _hoisted_3$4],
              8,
              ['fill']
            )),
            (openBlock(),
            createBlock('svg', _hoisted_4$3, [
              createVNode(
                'circle',
                {
                  stroke: _ctx.color,
                  class: 'uni-page-refresh__path',
                  cx: '50',
                  cy: '50',
                  r: '20',
                  fill: 'none',
                  'stroke-width': '4',
                  'stroke-miterlimit': '10'
                },
                null,
                8,
                ['stroke']
              )
            ]))
          ])
        ],
        4
      )
    ])
  )
}
script$7.render = render$7
script$7.__file =
  'packages/uni-h5/src/framework/components/page/pageRefresh.vue'
function processDeltaY(evt, identifier, startY) {
  const touch = Array.prototype.slice
    .call(evt.changedTouches)
    .filter(touch2 => touch2.identifier === identifier)[0]
  if (!touch) {
    return false
  }
  evt.deltaY = touch.pageY - startY
  return true
}
const PULLING = 'pulling'
const REACHED = 'reached'
const ABORTING = 'aborting'
const REFRESHING = 'refreshing'
const RESTORING = 'restoring'
var pullToRefresh = {
  mounted() {
    if (this.enablePullDownRefresh) {
      this.refreshContainerElem = this.$refs.refresh.$el
      this.refreshControllerElem = this.refreshContainerElem.querySelector(
        '.uni-page-refresh'
      )
      this.refreshInnerElemStyle = this.refreshControllerElem.querySelector(
        '.uni-page-refresh-inner'
      ).style
      UniServiceJSBridge.on(
        this.$route.params.__id__ + '.startPullDownRefresh',
        () => {
          if (!this.state) {
            this.state = REFRESHING
            this._addClass()
            setTimeout(() => {
              this._refreshing()
            }, 50)
          }
        }
      )
      UniServiceJSBridge.on(
        this.$route.params.__id__ + '.stopPullDownRefresh',
        () => {
          if (this.state === REFRESHING) {
            this._removeClass()
            this.state = RESTORING
            this._addClass()
            this._restoring(() => {
              this._removeClass()
              this.state = this.distance = this.offset = null
            })
          }
        }
      )
    }
  },
  methods: {
    _touchstart(evt) {
      const touch = evt.changedTouches[0]
      this.touchId = touch.identifier
      this.startY = touch.pageY
      if ([ABORTING, REFRESHING, RESTORING].indexOf(this.state) >= 0) {
        this.canRefresh = false
      } else {
        this.canRefresh = true
      }
    },
    _touchmove(evt) {
      if (!this.canRefresh) {
        return
      }
      if (!processDeltaY(evt, this.touchId, this.startY)) {
        return
      }
      let { deltaY } = evt
      if (
        (document.documentElement.scrollTop || document.body.scrollTop) !== 0
      ) {
        this.touchId = null
        return
      }
      if (deltaY < 0 && !this.state) {
        return
      }
      evt.preventDefault()
      if (this.distance == null) {
        this.offset = deltaY
        this.state = PULLING
        this._addClass()
      }
      deltaY = deltaY - this.offset
      if (deltaY < 0) {
        deltaY = 0
      }
      this.distance = deltaY
      const reached =
        deltaY >= this.refreshOptions.range && this.state !== REACHED
      const pulling =
        deltaY < this.refreshOptions.range && this.state !== PULLING
      if (reached || pulling) {
        this._removeClass()
        this.state = this.state === REACHED ? PULLING : REACHED
        this._addClass()
      }
      this._pulling(deltaY)
    },
    _touchend(evt) {
      if (!processDeltaY(evt, this.touchId, this.startY)) {
        return
      }
      if (this.state === null) {
        return
      }
      if (this.state === PULLING) {
        this._removeClass()
        this.state = ABORTING
        this._addClass()
        this._aborting(() => {
          this._removeClass()
          this.state = this.distance = this.offset = null
        })
      } else if (this.state === REACHED) {
        this._removeClass()
        this.state = REFRESHING
        this._addClass()
        this._refreshing()
      }
    },
    _toggleClass(type) {
      if (!this.state) {
        return
      }
      const elem = this.refreshContainerElem
      if (elem) {
        elem.classList[type]('uni-page-refresh--' + this.state)
      }
    },
    _addClass() {
      this._toggleClass('add')
    },
    _removeClass() {
      this._toggleClass('remove')
    },
    _pulling(deltaY) {
      const elem = this.refreshControllerElem
      if (!elem) {
        return
      }
      const style = elem.style
      let rotate = deltaY / this.refreshOptions.range
      if (rotate > 1) {
        rotate = 1
      } else {
        rotate = rotate * rotate * rotate
      }
      const y = Math.round(
        deltaY / (this.refreshOptions.range / this.refreshOptions.height)
      )
      const transform = y ? 'translate3d(-50%, ' + y + 'px, 0)' : 0
      style.webkitTransform = transform
      style.clip = 'rect(' + (45 - y) + 'px,45px,45px,-5px)'
      this.refreshInnerElemStyle.webkitTransform =
        'rotate(' + 360 * rotate + 'deg)'
    },
    _aborting(callback) {
      const elem = this.refreshControllerElem
      if (!elem) {
        return
      }
      const style = elem.style
      if (style.webkitTransform) {
        style.webkitTransition = '-webkit-transform 0.3s'
        style.webkitTransform = 'translate3d(-50%, 0, 0)'
        const abortTransitionEnd = function() {
          timeout && clearTimeout(timeout)
          elem.removeEventListener('webkitTransitionEnd', abortTransitionEnd)
          style.webkitTransition = ''
          callback()
        }
        elem.addEventListener('webkitTransitionEnd', abortTransitionEnd)
        const timeout = setTimeout(abortTransitionEnd, 350)
      } else {
        callback()
      }
    },
    _refreshing() {
      const elem = this.refreshControllerElem
      if (!elem) {
        return
      }
      const style = elem.style
      style.webkitTransition = '-webkit-transform 0.2s'
      style.webkitTransform =
        'translate3d(-50%, ' + this.refreshOptions.height + 'px, 0)'
      UniServiceJSBridge.emit(
        'onPullDownRefresh',
        {},
        this.$route.params.__id__
      )
    },
    _restoring(callback) {
      const elem = this.refreshControllerElem
      if (!elem) {
        return
      }
      const style = elem.style
      style.webkitTransition = '-webkit-transform 0.3s'
      style.webkitTransform += ' scale(0.01)'
      const restoreTransitionEnd = function() {
        timeout && clearTimeout(timeout)
        elem.removeEventListener('webkitTransitionEnd', restoreTransitionEnd)
        style.webkitTransition = ''
        style.webkitTransform = 'translate3d(-50%, 0, 0)'
        callback()
      }
      elem.addEventListener('webkitTransitionEnd', restoreTransitionEnd)
      const timeout = setTimeout(restoreTransitionEnd, 350)
    }
  }
}
var script$8 = {
  name: 'Page',
  mpType: 'page',
  components: {
    PageHead: script$5,
    PageBody: script$6,
    PageRefresh: script$7
  },
  mixins: [pullToRefresh],
  props: {
    isQuit: {
      type: Boolean,
      default: false
    },
    isEntry: {
      type: Boolean,
      default: false
    },
    isTabBar: {
      type: Boolean,
      default: false
    },
    tabBarIndex: {
      type: Number,
      default: -1
    },
    navigationBarBackgroundColor: {
      type: String,
      default: '#000'
    },
    navigationBarTextStyle: {
      default: 'white',
      validator(value) {
        return ['white', 'black'].indexOf(value) !== -1
      }
    },
    navigationBarTitleText: {
      type: String,
      default: ''
    },
    navigationStyle: {
      default: 'default',
      validator(value) {
        return ['default', 'custom'].indexOf(value) !== -1
      }
    },
    backgroundColor: {
      type: String,
      default: '#ffffff'
    },
    backgroundTextStyle: {
      default: 'dark',
      validator(value) {
        return ['dark', 'light'].indexOf(value) !== -1
      }
    },
    backgroundColorTop: {
      type: String,
      default: '#fff'
    },
    backgroundColorBottom: {
      type: String,
      default: '#fff'
    },
    enablePullDownRefresh: {
      type: Boolean,
      default: false
    },
    onReachBottomDistance: {
      type: Number,
      default: 50
    },
    disableScroll: {
      type: Boolean,
      default: false
    },
    titleNView: {
      type: [Boolean, Object, String],
      default: ''
    },
    pullToRefresh: {
      type: Object,
      default() {
        return {}
      }
    },
    titleImage: {
      type: String,
      default: ''
    },
    transparentTitle: {
      type: String,
      default: ''
    },
    titlePenetrate: {
      type: String,
      default: 'NO'
    },
    navigationBarShadow: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    const titleNViewTypeList = {
      none: 'default',
      auto: 'transparent',
      always: 'float'
    }
    let titleNView = this.titleNView
    if (
      titleNView === false ||
      titleNView === 'false' ||
      (this.navigationStyle === 'custom' && !isPlainObject(titleNView)) ||
      (this.transparentTitle === 'always' && !isPlainObject(titleNView))
    ) {
      titleNView = {
        type: 'none'
      }
    } else {
      titleNView = Object.assign(
        {},
        {
          type: this.navigationStyle === 'custom' ? 'none' : 'default'
        },
        this.transparentTitle in titleNViewTypeList
          ? {
              type: titleNViewTypeList[this.transparentTitle]
            }
          : null,
        typeof titleNView === 'object'
          ? titleNView
          : typeof titleNView === 'boolean'
            ? {
                type: titleNView ? 'default' : 'none'
              }
            : null
      )
    }
    const yesNoParseList = {
      YES: true,
      NO: false
    }
    const navigationBar = mergeTitleNView(
      {
        loading: false,
        backButton: !this.isQuit && !this.$route.meta.isQuit,
        backgroundColor: this.navigationBarBackgroundColor,
        textColor: this.navigationBarTextStyle === 'black' ? '#000' : '#fff',
        titleText: this.navigationBarTitleText,
        titleImage: this.titleImage,
        duration: '0',
        timingFunc: '',
        titlePenetrate: yesNoParseList[this.titlePenetrate]
      },
      titleNView
    )
    navigationBar.shadow = this.navigationBarShadow
    const refreshOptions = Object.assign(
      {
        support: true,
        color: '#2BD009',
        style: 'circle',
        height: 70,
        range: 150,
        offset: 0
      },
      this.pullToRefresh
    )
    let offset = uni.upx2px(refreshOptions.offset)
    if (titleNView.type !== 'none' && titleNView.type !== 'transparent') {
      offset += NAVBAR_HEIGHT + out.top
    }
    refreshOptions.offset = offset
    refreshOptions.height = uni.upx2px(refreshOptions.height)
    refreshOptions.range = uni.upx2px(refreshOptions.range)
    return {
      navigationBar,
      refreshOptions
    }
  },
  created() {
    const navigationBar = this.navigationBar
    document.title = navigationBar.titleText
    UniServiceJSBridge.emit('onNavigationBarChange', navigationBar)
  }
}
function render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_page_head = resolveComponent('page-head')
  const _component_page_refresh = resolveComponent('page-refresh')
  const _component_page_body = resolveComponent('page-body')
  return (
    openBlock(),
    createBlock(
      'uni-page',
      {
        'data-page': _ctx.$route.meta.pagePath
      },
      [
        _ctx.navigationBar.type !== 'none'
          ? createVNode(
              _component_page_head,
              mergeProps({ key: 0 }, _ctx.navigationBar),
              null,
              16
            )
          : createCommentVNode('v-if', true),
        _ctx.enablePullDownRefresh
          ? createVNode(
              _component_page_refresh,
              {
                key: 1,
                ref: 'refresh',
                color: _ctx.refreshOptions.color,
                offset: _ctx.refreshOptions.offset
              },
              null,
              8,
              ['color', 'offset']
            )
          : createCommentVNode('v-if', true),
        _ctx.enablePullDownRefresh
          ? createVNode(
              _component_page_body,
              {
                key: 2,
                onTouchstartPassive: _ctx._touchstart,
                onTouchmovePassive: _ctx._touchmove,
                onTouchendPassive: _ctx._touchend,
                onTouchcancelPassive: _ctx._touchend
              },
              {
                default: withCtx(() => [renderSlot(_ctx.$slots, 'page')]),
                _: 3
              },
              8,
              [
                'onTouchstartPassive',
                'onTouchmovePassive',
                'onTouchendPassive',
                'onTouchcancelPassive'
              ]
            )
          : createVNode(
              _component_page_body,
              { key: 3 },
              {
                default: withCtx(() => [renderSlot(_ctx.$slots, 'page')]),
                _: 3
              }
            )
      ],
      8,
      ['data-page']
    )
  )
}
script$8.render = render$8
script$8.__file = 'packages/uni-h5/src/framework/components/page/index.vue'
var script$9 = {
  name: 'AsyncError',
  methods: {
    _onClick() {
      window.location.reload()
    }
  }
}
function render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    openBlock(),
    createBlock(
      'div',
      {
        class: 'uni-async-error',
        onClick: _cache[1] || (_cache[1] = (...args) => _ctx._onClick(...args))
      },
      ' 连接服务器超时，点击屏幕重试 '
    )
  )
}
script$9.render = render$9
script$9.__file =
  'packages/uni-h5/src/framework/components/async-error/index.vue'
var script$a = {
  name: 'AsyncLoading'
}
const _hoisted_1$6 = { class: 'uni-async-loading' }
const _hoisted_2$6 = /* @__PURE__ */ createVNode(
  'i',
  { class: 'uni-loading' },
  null,
  -1
)
function render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock('div', _hoisted_1$6, [_hoisted_2$6])
}
script$a.render = render$a
script$a.__file =
  'packages/uni-h5/src/framework/components/async-loading/index.vue'
export {
  script$9 as AsyncErrorComponent,
  script$a as AsyncLoadingComponent,
  script$8 as PageComponent,
  addInterceptor,
  arrayBufferToBase64,
  base64ToArrayBuffer,
  canIUse,
  createIntersectionObserver$1 as createIntersectionObserver,
  createSelectorQuery$1 as createSelectorQuery,
  getApp,
  getCurrentPages$1 as getCurrentPages,
  getSystemInfo,
  getSystemInfoSync,
  makePhoneCall,
  navigateBack,
  navigateTo,
  openDocument,
  index as plugin,
  promiseInterceptor,
  reLaunch,
  redirectTo,
  removeInterceptor,
  switchTab,
  uni$1 as uni,
  upx2px
}
