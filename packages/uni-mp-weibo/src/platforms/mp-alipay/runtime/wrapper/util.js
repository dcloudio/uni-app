import {
  isFn,
  cached,
  camelize,
  hasOwn
} from 'uni-shared'

import {
  handleLink as handleBaseLink,
  toSkip
} from '../../../mp-weixin/runtime/wrapper/util'

import deepEqual from './deep-equal'

export { markMPComponent } from '../../../mp-weixin/runtime/wrapper/util'

const customizeRE = /:/g

const customize = cached((str) => {
  return camelize(str.replace(customizeRE, '-'))
})

export const isComponent2 = my.canIUse('component2')

export const mocks = ['$id']

export function initRefs () {

}

export function initBehavior ({
  properties
}) {
  const props = {}

  Object.keys(properties).forEach(key => {
    props[key] = properties[key].value
  })

  return {
    props
  }
}

export function initRelation (detail) {
  this.props.onVueInit(detail)
}

export function initSpecialMethods (mpInstance) {
  if (!mpInstance.$vm) {
    return
  }
  let path = mpInstance.is || mpInstance.route
  if (!path) {
    return
  }
  if (path.indexOf('/') === 0) {
    path = path.substr(1)
  }
  const specialMethods = my.specialMethods && my.specialMethods[path]
  if (specialMethods) {
    specialMethods.forEach(method => {
      if (isFn(mpInstance.$vm[method])) {
        mpInstance[method] = function (event) {
          if (hasOwn(event, 'markerId')) {
            event.detail = typeof event.detail === 'object' ? event.detail : {}
            event.detail.markerId = event.markerId
          }
          // TODO normalizeEvent
          mpInstance.$vm[method](event)
        }
      }
    })
  }
}

export function initChildVues (mpInstance) {
  // 此时需保证当前 mpInstance 已经存在 $vm
  if (!mpInstance.$vm) {
    return
  }
  mpInstance._$childVues && mpInstance._$childVues.forEach(({
    vuePid,
    vueOptions,
    VueComponent,
    mpInstance: childMPInstance
  }) => {
    // 父子关系
    handleBaseLink.call(mpInstance, {
      detail: {
        vuePid,
        vueOptions
      }
    })

    childMPInstance.$vm = new VueComponent(vueOptions)

    initSpecialMethods(childMPInstance)

    handleRef.call(vueOptions.parent.$scope, childMPInstance)

    childMPInstance.$vm.$mount()

    initChildVues(childMPInstance)

    childMPInstance.$vm._isMounted = true
    childMPInstance.$vm.__call_hook('mounted')
    childMPInstance.$vm.__call_hook('onReady')
  })

  delete mpInstance._$childVues
}

export function handleProps (ref) {
  const eventProps = {}
  let refProps = ref.props
  const eventList = (refProps['data-event-list'] || '').split(',')
  // 初始化支付宝小程序组件事件
  eventList.forEach(key => {
    const handler = refProps[key]
    const res = key.match(/^on([A-Z])(\S*)/)
    const event = res && (res[1].toLowerCase() + res[2])
    refProps[key] = eventProps[key] = function () {
      const props = Object.assign({}, refProps)
      props[key] = handler
      // 由于支付宝事件可能包含多个参数，不使用微信小程序事件格式
      delete props['data-com-type']
      triggerEvent.bind({ props })(event, {
        __args__: [...arguments]
      })
    }
  })
  // 处理 props 重写
  Object.defineProperty(ref, 'props', {
    get () {
      return refProps
    },
    set (value) {
      refProps = Object.assign(value, eventProps)
    }
  })
}

export function handleRef (ref) {
  if (!(ref && this.$vm)) {
    return
  }
  const refName = ref.props['data-ref']
  const refInForName = ref.props['data-ref-in-for']
  if (refName) {
    this.$vm.$refs[refName] = ref.$vm || toSkip(ref)
  } else if (refInForName) {
    (this.$vm.$refs[refInForName] || (this.$vm.$refs[refInForName] = [])).push(ref.$vm || toSkip(ref))
  }
}

export function triggerEvent (type, detail, options) {
  const handler = this.props && this.props[customize('on-' + type)]
  if (!handler) {
    return
  }

  const eventOpts = this.props['data-event-opts']
  const eventParams = this.props['data-event-params']
  const comType = this.props['data-com-type']

  const target = {
    dataset: {
      eventOpts,
      eventParams,
      comType
    }
  }

  handler({
    type: customize(type),
    target,
    currentTarget: target,
    detail
  })
}

const IGNORES = ['$slots', '$scopedSlots']

export function createObserver (isDidUpdate) {
  return function observe (props) {
    const prevProps = isDidUpdate ? props : this.props
    const nextProps = isDidUpdate ? this.props : props
    if (deepEqual(prevProps, nextProps)) {
      return
    }
    Object.keys(prevProps).forEach(name => {
      if (IGNORES.indexOf(name) === -1) {
        const prevValue = prevProps[name]
        const nextValue = nextProps[name]
        if (!isFn(prevValue) && !isFn(nextValue) && !deepEqual(prevValue, nextValue)) {
          this.$vm[name] = nextProps[name]
        }
      }
    })
  }
}

export const handleLink = (function () {
  if (isComponent2) {
    return function handleLink (detail) {
      return handleBaseLink.call(this, {
        detail
      })
    }
  }
  return function handleLink (detail) {
    if (this.$vm && this.$vm._isMounted) { // 父已初始化
      return handleBaseLink.call(this, {
        detail: {
          vuePid: detail.vuePid,
          vueOptions: detail.vueOptions
        }
      })
    }
    // 支付宝通过 didMount 来实现，先子后父，故等父 ready 之后，统一初始化
    (this._$childVues || (this._$childVues = [])).unshift(detail)
  }
})()

export const handleWrap = function (mp, destory) {
  const vueId = mp.props.vueId
  const list = (mp.props['data-event-list'] || '').split(',')
  list.forEach(eventName => {
    const key = `${eventName}${vueId}`
    if (destory) {
      delete this[key]
    } else {
      this[key] = function () {
        mp.props[eventName].apply(this, arguments)
      }
    }
  })
  if (!destory) {
    handleProps(mp)
  }
}
