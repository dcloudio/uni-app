import {
  isFn,
  noop,
  hasOwn,
  isPlainObject
} from 'uni-shared'

const MOCKS = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__']

export function initMocks (vm) {
  const mpInstance = vm.$mp[vm.mpType]
  MOCKS.forEach(mock => {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock]
    }
  })
}

export function initHooks (mpOptions, hooks, delay = false) {
  hooks.forEach(hook => {
    mpOptions[hook] = function (args) {
      if (delay) {
        setTimeout(() => this.$vm.__call_hook(hook, args))
      } else {
        this.$vm.__call_hook(hook, args)
      }
    }
  })
}

export function getData (vueOptions, context) {
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

  Object.keys(methods).forEach(methodName => {
    if (!hasOwn(data, methodName)) {
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

export function getProperties (props) {
  const properties = {
    vueSlots: { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
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
        let value = opts['default']
        if (isFn(value)) {
          value = value()
        }
        properties[key] = {
          type: PROP_TYPES.includes(opts.type) ? opts.type : null,
          value,
          observer: createObserver(key)
        }
      } else { // content:String
        properties[key] = {
          type: PROP_TYPES.includes(opts) ? opts : null,
          observer: createObserver(key)
        }
      }
    })
  }
  return properties
}

function wrapper (event) {
  event.stopPropagation = noop
  event.preventDefault = noop

  event.target = event.target || {}
  event.detail = event.detail || {}

  if (__PLATFORM__ === 'mp-baidu') { // mp-baidu，checked=>value
    if (hasOwn(event.detail, 'checked') && !hasOwn(event.detail, 'value')) {
      event.detail.value = event.detail.checked
    }
  }

  // TODO 又得兼容 mpvue 的 mp 对象
  event.mp = event
  event.target = Object.assign({}, event.target, event.detail)
  return event
}

function processEventArgs (event, args = [], isCustom) {
  if (isCustom && !args.length) { // 无参数，直接传入 detail 数组
    return event.detail
  }
  const ret = []
  args.forEach(arg => {
    if (arg === '$event') {
      ret.push(isCustom ? event.detail[0] : event)
    } else {
      ret.push(arg)
    }
  })

  return ret
}

const ONCE = '~'
const CUSTOM = '^'

export function handleEvent (event) {
  event = wrapper(event)

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  const eventOpts = (event.currentTarget || event.target).dataset.eventOpts
  if (!eventOpts) {
    return console.warn(`事件信息不存在`)
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  const eventType = event.type
  eventOpts.forEach(eventOpt => {
    let type = eventOpt[0]
    const eventsArray = eventOpt[1]

    const isCustom = type.charAt(0) === CUSTOM
    type = isCustom ? type.slice(1) : type
    const isOnce = type.charAt(0) === ONCE
    type = isOnce ? type.slice(1) : type

    if (eventsArray && eventType === type) {
      eventsArray.forEach(eventArray => {
        const handler = this.$vm[eventArray[0]]
        if (!isFn(handler)) {
          throw new Error(` _vm.${eventArray[0]} is not a function`)
        }
        if (isOnce) {
          if (handler.once) {
            return
          }
          handler.once = true
        }
        handler.apply(this.$vm, processEventArgs(event, eventArray[1], isCustom))
      })
    }
  })
}

export function initRefs (vm) {
  const mpInstance = vm.$mp[vm.mpType]
  Object.defineProperty(vm, '$refs', {
    get () {
      const $refs = Object.create(null)
      const components = mpInstance.selectAllComponents('.vue-ref')
      components.forEach(component => {
        const ref = component.dataset.ref
        $refs[ref] = component.$vm
      })
      const forComponents = mpInstance.selectAllComponents('.vue-ref-in-for')
      forComponents.forEach(component => {
        const ref = component.dataset.ref
        if (!$refs[ref]) {
          $refs[ref] = []
        }
        $refs[ref].push(component.$vm)
      })
      return $refs
    }
  })
}

function baiduComponentDestroy ($vm) {
  $vm.$children.forEach(childVm => {
    childVm.$mp.component.detached()
  })
  $vm.$mp.component.detached()
}

export function baiduPageDestroy ($vm) {
  $vm.$destroy()
  $vm.$children.forEach(childVm => {
    baiduComponentDestroy(childVm)
  })
}
