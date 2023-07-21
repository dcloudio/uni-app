import {
  isFn
} from 'uni-shared'

const SUCCESS = 'success'
const FAIL = 'fail'
const COMPLETE = 'complete'
const CALLBACKS = [SUCCESS, FAIL, COMPLETE]

/**
 * 调用无参数，或仅一个参数且为 callback 的 API
 * @param {Object} vm
 * @param {Object} method
 * @param {Object} args
 * @param {Object} extras
 */
export function invokeVmMethodWithoutArgs (vm, method, args, extras) {
  if (!vm) {
    return
  }
  if (typeof args === 'undefined') {
    return vm[method]()
  }
  const [, callbacks] = normalizeArgs(args, extras)
  if (!Object.keys(callbacks).length) {
    return vm[method]()
  }
  return vm[method](normalizeCallback(method, callbacks))
}
/**
 * 调用两个参数（第一个入参为普通参数，第二个入参为 callback） API
 * @param {Object} vm
 * @param {Object} method
 * @param {Object} args
 * @param {Object} extras
 */
export function invokeVmMethod (vm, method, args, extras) {
  if (!vm) {
    return
  }
  const [pureArgs, callbacks] = normalizeArgs(args, extras)
  if (!Object.keys(callbacks).length) {
    return vm[method](pureArgs)
  }
  return vm[method](pureArgs, normalizeCallback(method, callbacks))
}

export function findElmById (id, vm) {
  const elm = findRefByElm(id, vm.$el)
  if (!elm) {
    return console.error('Can not find `' + id + '`')
  }
  return elm
}

function findRefByElm (id, elm) {
  if (!id || !elm) {
    return
  }
  if (elm.attr && elm.attr.id === id) {
    return elm
  }
  const children = elm.children
  if (!children) {
    return
  }
  for (let i = 0, len = children.length; i < len; i++) {
    const elm = findRefByElm(id, children[i])
    if (elm) {
      return elm
    }
  }
}

function normalizeArgs (args = {}, extras) {
  const callbacks = Object.create(null)

  const iterator = function iterator (name) {
    const callback = args[name]
    if (isFn(callback)) {
      callbacks[name] = callback
      delete args[name]
    }
  }

  CALLBACKS.forEach(iterator)

  extras && extras.forEach(iterator)

  return [args, callbacks]
}

function normalizeCallback (method, callbacks) {
  return function weexCallback (ret) {
    const type = ret.type
    delete ret.type
    const callback = callbacks[type]

    if (type === SUCCESS) {
      ret.errMsg = `${method}:ok`
    } else if (type === FAIL) {
      ret.errMsg = method + ':fail' + (ret.msg ? (' ' + ret.msg) : '')
    }

    delete ret.code
    delete ret.msg

    isFn(callback) && callback(ret)

    if (type === SUCCESS || type === FAIL) {
      const complete = callbacks.complete
      isFn(complete) && complete(ret)
    }
  }
}
