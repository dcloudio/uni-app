import Vue from 'vue'

import {
  isFn,
  noop,
  hasOwn,
  isPlainObject
} from 'uni-shared'

export const PAGE_EVENT_HOOKS = [
  'onPullDownRefresh',
  'onReachBottom',
  'onAddToFavorites',
  'onShareTimeline',
  'onShareAppMessage',
  'onPageScroll',
  'onResize',
  'onTabItemTap'
]

export function initMocks (vm, mocks) {
  const mpInstance = vm.$mp[vm.mpType]
  mocks.forEach(mock => {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock]
    }
  })
}

function hasHook (hook, vueOptions) {
  if (!vueOptions) {
    return true
  }

  if (Vue.options && Array.isArray(Vue.options[hook])) {
    return true
  }

  vueOptions = vueOptions.default || vueOptions

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true
    }
    if (vueOptions.super &&
      vueOptions.super.options &&
      Array.isArray(vueOptions.super.options[hook])) {
      return true
    }
    return false
  }

  if (isFn(vueOptions[hook])) {
    return true
  }
  const mixins = vueOptions.mixins
  if (Array.isArray(mixins)) {
    return !!mixins.find(mixin => hasHook(hook, mixin))
  }
}

export function initHooks (mpOptions, hooks, vueOptions) {
  hooks.forEach(hook => {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args)
      }
    }
  })
}

export function initVueComponent (Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions
  let VueComponent
  if (isFn(vueOptions)) {
    VueComponent = vueOptions
  } else {
    VueComponent = Vue.extend(vueOptions)
  }
  vueOptions = VueComponent.options
  return [VueComponent, vueOptions]
}

export function initSlots (vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    const $slots = Object.create(null)
    vueSlots.forEach(slotName => {
      $slots[slotName] = true
    })
    vm.$scopedSlots = vm.$slots = $slots
  }
}

export function initVueIds (vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',')
  const len = vueIds.length

  if (len === 1) {
    mpInstance._$vueId = vueIds[0]
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0]
    mpInstance._$vuePid = vueIds[1]
  }
}

export function initData (vueOptions, context) {
  let data = vueOptions.data || {}
  const methods = vueOptions.methods || {}

  if (typeof data === 'function') {
    try {
      data = data.call(context) // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (process.env.VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data)
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data))
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {}
  }

  Object.keys(methods).forEach(methodName => {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName]
    }
  })

  return data
}

const PROP_TYPES = [String, Number, Boolean, Object, Array, null]

function createObserver (name) {
  return function observer (newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal // 为了触发其他非 render watcher
    }
  }
}

export function initBehaviors (vueOptions, initBehavior) {
  const vueBehaviors = vueOptions.behaviors
  const vueExtends = vueOptions.extends
  const vueMixins = vueOptions.mixins

  let vueProps = vueOptions.props

  if (!vueProps) {
    vueOptions.props = vueProps = []
  }

  const behaviors = []
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(behavior => {
      behaviors.push(behavior.replace('uni://', `${__PLATFORM_PREFIX__}://`))
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name')
          vueProps.push('value')
        } else {
          vueProps.name = {
            type: String,
            default: ''
          }
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ''
          }
        }
      }
    })
  }
  if (__PLATFORM__ === 'mp-alipay') { // alipay 重复定义props会报错,下边的代码对于其他平台也没有意义，保险起见，仅对alipay做处理
    return
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
      initBehavior({
        properties: initProperties(vueExtends.props, true)
      })
    )
  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(vueMixin => {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
          initBehavior({
            properties: initProperties(vueMixin.props, true)
          })
        )
      }
    })
  }
  return behaviors
}

function parsePropType (key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0]
  }
  if (__PLATFORM__ === 'mp-baidu') {
    if (
      defaultValue === false &&
      Array.isArray(type) &&
      type.length === 2 &&
      type.indexOf(String) !== -1 &&
      type.indexOf(Boolean) !== -1
    ) { // [String,Boolean]=>Boolean
      if (file) {
        console.warn(
          `props.${key}.type should use Boolean instead of [String,Boolean] at ${file}`
        )
      }
      return Boolean
    }
  }
  return type
}

export function initProperties (props, isBehavior = false, file = '') {
  const properties = {}
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: ''
    }
    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: ''
    }
    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function (newVal, oldVal) {
        const $slots = Object.create(null)
        newVal.forEach(slotName => {
          $slots[slotName] = true
        })
        this.setData({
          $slots
        })
      }
    }
  }
  if (Array.isArray(props)) { // ['title']
    props.forEach(key => {
      properties[key] = {
        type: null,
        observer: createObserver(key)
      }
    })
  } else if (isPlainObject(props)) { // {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(key => {
      const opts = props[key]
      if (isPlainObject(opts)) { // title:{type:String,default:''}
        let value = opts.default
        if (isFn(value)) {
          value = value()
        }

        opts.type = parsePropType(key, opts.type, value, file)

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value,
          observer: createObserver(key)
        }
      } else { // content:String
        const type = parsePropType(key, opts, null, file)
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key)
        }
      }
    })
  }
  return properties
}

function wrapper (event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event))
  } catch (e) {}

  event.stopPropagation = noop
  event.preventDefault = noop

  event.target = event.target || {}

  if (!hasOwn(event, 'detail')) {
    event.detail = {}
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {}
    event.detail.markerId = event.markerId
  }

  if (__PLATFORM__ === 'mp-baidu') { // mp-baidu，checked=>value
    if (
      isPlainObject(event.detail) &&
      hasOwn(event.detail, 'checked') &&
      !hasOwn(event.detail, 'value')
    ) {
      event.detail.value = event.detail.checked
    }
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail)
  }

  return event
}

function getExtraValue (vm, dataPathsArray) {
  let context = vm
  dataPathsArray.forEach(dataPathArray => {
    const dataPath = dataPathArray[0]
    const value = dataPathArray[2]
    if (dataPath || typeof value !== 'undefined') { // ['','',index,'disable']
      const propPath = dataPathArray[1]
      const valuePath = dataPathArray[3]

      let vFor
      if (Number.isInteger(dataPath)) {
        vFor = dataPath
      } else if (!dataPath) {
        vFor = context
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3)
        } else {
          vFor = vm.__get_value(dataPath, context)
        }
      }

      if (Number.isInteger(vFor)) {
        context = value
      } else if (!propPath) {
        context = vFor[value]
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(vForItem => {
            return vm.__get_value(propPath, vForItem) === value
          })
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(vForKey => {
            return vm.__get_value(propPath, vFor[vForKey]) === value
          })
        } else {
          console.error('v-for 暂不支持循环数据：', vFor)
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context)
      }
    }
  })
  return context
}

function processEventExtra (vm, extra, event) {
  const extraObj = {}

  if (Array.isArray(extra) && extra.length) {
    /**
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *'test'
     */
    extra.forEach((dataPath, index) => {
      if (typeof dataPath === 'string') {
        if (!dataPath) { // model,prop.sync
          extraObj['$' + index] = vm
        } else {
          if (dataPath === '$event') { // $event
            extraObj['$' + index] = event
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__
            } else {
              extraObj['$' + index] = [event]
            }
          } else if (dataPath.indexOf('$event.') === 0) { // $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event)
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath)
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath)
      }
    })
  }

  return extraObj
}

function getObjByArray (arr) {
  const obj = {}
  for (let i = 1; i < arr.length; i++) {
    const element = arr[i]
    obj[element[0]] = element[1]
  }
  return obj
}

function processEventArgs (vm, event, args = [], extra = [], isCustom, methodName) {
  let isCustomMPEvent = false // wxcomponent 组件，传递原始 event 对象
  if (isCustom) { // 自定义事件
    isCustomMPEvent = event.currentTarget &&
      event.currentTarget.dataset &&
      event.currentTarget.dataset.comType === 'wx'
    if (!args.length) { // 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event]
      }
      return event.detail.__args__ || event.detail
    }
  }

  const extraObj = processEventExtra(vm, extra, event)

  const ret = []
  args.forEach(arg => {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) { // input v-model value
        ret.push(event.target.value)
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0])
        } else { // wxcomponent 组件或内置组件
          ret.push(event)
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg))
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg])
      } else {
        ret.push(arg)
      }
    }
  })

  return ret
}

const ONCE = '~'
const CUSTOM = '^'

function isMatchEventType (eventType, optType) {
  return (eventType === optType) ||
    (
      optType === 'regionchange' &&
      (
        eventType === 'begin' ||
        eventType === 'end'
      )
    )
}

function getContextVm (vm) {
  let $parent = vm.$parent
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent
  }
  return $parent && $parent.$parent
}

export function handleEvent (event) {
  event = wrapper(event)

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  const dataset = (event.currentTarget || event.target).dataset
  if (!dataset) {
    return console.warn('事件信息不存在')
  }
  const eventOpts = dataset.eventOpts || dataset['event-opts'] // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在')
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  const eventType = event.type

  const ret = []

  eventOpts.forEach(eventOpt => {
    let type = eventOpt[0]
    const eventsArray = eventOpt[1]

    const isCustom = type.charAt(0) === CUSTOM
    type = isCustom ? type.slice(1) : type
    const isOnce = type.charAt(0) === ONCE
    type = isOnce ? type.slice(1) : type

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(eventArray => {
        const methodName = eventArray[0]
        if (methodName) {
          let handlerCtx = this.$vm
          if (handlerCtx.$options.generic) { // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
              processEventArgs(
                this.$vm,
                event,
                eventArray[1],
                eventArray[2],
                isCustom,
                methodName
              ))
            return
          }
          const handler = handlerCtx[methodName]
          if (!isFn(handler)) {
            throw new Error(` _vm.${methodName} is not a function`)
          }
          if (isOnce) {
            if (handler.once) {
              return
            }
            handler.once = true
          }
          let params = processEventArgs(
            this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName
          )
          params = Array.isArray(params) ? params : []
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([, , , , , , , , , , event])
          }
          ret.push(handler.apply(handlerCtx, params))
        }
      })
    }
  })

  if (
    eventType === 'input' &&
    ret.length === 1 &&
    typeof ret[0] !== 'undefined'
  ) {
    return ret[0]
  }
}
