import {
  isFn,
  cached,
  camelize
} from 'uni-shared'

import {
  handleLink as handleBaseLink
} from '../../../mp-weixin/runtime/wrapper/util'

import deepEqual from './deep-equal'

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

    handleRef.call(vueOptions.parent.$scope, childMPInstance)

    childMPInstance.$vm.$mount()

    initChildVues(childMPInstance)

    console.log(childMPInstance.is, 'mounted')
    childMPInstance.$vm._isMounted = true
    childMPInstance.$vm.__call_hook('mounted')
    childMPInstance.$vm.__call_hook('onReady')
  })

  delete mpInstance._$childVues
}

export function handleRef (ref) {
  if (!ref) {
    return
  }
  const refName = ref.props['data-ref']
  const refInForName = ref.props['data-ref-in-for']
  if (refName) {
    this.$vm.$refs[refName] = ref.$vm || ref
  } else if (refInForName) {
    this.$vm.$refs[refInForName] = [ref.$vm || ref]
  }
}

export function triggerEvent (type, detail, options) {
  const handler = this.props[customize('on-' + type)]
  if (!handler) {
    return
  }

  const eventOpts = this.props['data-event-opts']

  const target = {
    dataset: {
      eventOpts
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
