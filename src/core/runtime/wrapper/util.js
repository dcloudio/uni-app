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

export function initHooks (mpOptions, hooks) {
  hooks.forEach(hook => {
    mpOptions[hook] = function (args) {
      this.$vm.__call_hook(hook, args)
    }
  })
}

export function initMethods (mpOptions, vueOptions) {
  //   if (vueOptions.methods) {
  //     Object.assign(mpOptions, vueOptions.methods)
  //   }
}

export function getData (data) {
  if (typeof data === 'function') {
    try {
      return data()
    } catch (e) {
      console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。')
    }
    return {}
  }
  return data || {}
}

const PROP_TYPES = [String, Number, Boolean, Object, Array, null]

export function getProperties (props) {
  const properties = {}
  if (Array.isArray(props)) { // ['title']
    props.forEach(key => {
      properties[key] = null
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
          value
        }
      } else { // content:String
        properties[key] = PROP_TYPES.includes(opts) ? opts : null
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

export function handleLink (event) {
  event.detail.$parent = this.$vm
}

export function initRefs (vm) {
  const mpInstance = vm.$mp[vm.mpType]
  Object.defineProperty(vm, '$refs', {
    get () {
      const $refs = Object.create(null)
      const components = mpInstance.selectAllComponents('.__ref__')
      components.forEach(component => {
        const id = component.id
        $refs[id] = component.$vm
      })
      const forComponents = mpInstance.selectAllComponents('.__ref-in-for__')
      forComponents.forEach(component => {
        const id = component.id
        if (!$refs[id]) {
          $refs[id] = []
        }
        $refs[id].push(component.$vm)
      })
      return $refs
    }
  })
}
