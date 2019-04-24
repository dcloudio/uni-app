import {
  isFn,
  cached,
  camelize
} from 'uni-shared'

import deepEqual from './deep-equal'

const customizeRE = /:/g

const customize = cached((str) => {
  return camelize(str.replace(customizeRE, '-'))
})

export const mocks = ['$id']

export function initRefs () {

}

function handleRef (ref) {
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

export function initPage (pageOptions, vueOptions) {
  const {
    lifetimes,
    methods
  } = pageOptions

  pageOptions.onReady = lifetimes.ready
  pageOptions.onUnload = function () {
    lifetimes.detached.call(this)
    methods.onUnload.call(this)
  }

  Object.keys(methods).forEach(method => {
    if (method !== 'onUnload') {
      pageOptions[method] = methods[method]
    }
  })

  pageOptions['__r'] = handleRef

  if (vueOptions.methods && vueOptions.methods.formReset) {
    pageOptions['formReset'] = vueOptions.methods.formReset
  }

  delete pageOptions.lifetimes
  delete pageOptions.methods

  return Page(pageOptions)
}

function triggerEvent (type, detail, options) {
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

function createObserver (isDidUpdate) {
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

export function initComponent (componentOptions, vueOptions) {
  const {
    lifetimes,
    properties,
    behaviors
  } = componentOptions

  componentOptions.mixins = behaviors

  const props = {
    onTriggerLink: function () {}
  }

  Object.keys(properties).forEach(key => {
    if (key !== 'vueSlots') {
      props[key] = properties[key].value
    }
  })

  componentOptions.props = props

  if (my.canIUse('component2')) {
    componentOptions.onInit = lifetimes.attached
  }
  componentOptions.didMount = lifetimes.ready
  componentOptions.didUnmount = lifetimes.detached

  if (my.canIUse('component2')) {
    componentOptions.deriveDataFromProps = createObserver() // nextProps
  } else {
    componentOptions.didUpdate = createObserver(true) // prevProps
  }

  if (!componentOptions.methods) {
    componentOptions.methods = {}
  }

  if (vueOptions.methods && vueOptions.methods.formReset) {
    componentOptions.methods['formReset'] = vueOptions.methods.formReset
  }

  componentOptions.methods['__r'] = handleRef
  componentOptions.methods.triggerEvent = triggerEvent

  delete componentOptions.properties
  delete componentOptions.behaviors
  delete componentOptions.lifetimes
  delete componentOptions.pageLifetimes

  return Component(componentOptions)
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

export function triggerLink (mpInstance, vueOptions) {
  mpInstance.props.onTriggerLink(mpInstance.$vm || vueOptions)
}

export function handleLink (detail) {
  if (detail.$mp) { // vm
    if (!detail.$parent) {
      detail.$parent = this.$vm
      if (detail.$parent) {
        detail.$parent.$children.push(detail)
        detail.$root = this.$vm.$root
      }
    }
  } else { // vueOptions
    if (!detail.parent) {
      detail.parent = this.$vm
    }
  }
}
