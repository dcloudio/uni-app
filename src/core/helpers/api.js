import {
  isFn,
  isPlainObject
} from 'uni-shared'

import {
  tryCatch,
  tryCatchFramework
} from './catch'

import {
  isTaskApi,
  isSyncApi,
  isCallbackApi
} from './promise'

import protocol from 'uni-api-protocol'

import validateParam from './params'

function invokeCallbackHandlerFail (err, apiName, callbackId) {
  const errMsg = `${apiName}:fail ${err}`
  console.error(errMsg)
  if (callbackId === -1) {
    throw new Error(errMsg)
  }
  if (typeof callbackId === 'number') {
    invokeCallbackHandler(callbackId, {
      errMsg
    })
  }
  return false
}

const callbackApiParamTypes = [{
  name: 'callback',
  type: Function,
  required: true
}]

function validateParams (apiName, paramsData, callbackId) {
  let paramTypes = protocol[apiName]
  if (!paramTypes && isCallbackApi(apiName)) {
    paramTypes = callbackApiParamTypes
  }
  if (paramTypes) {
    if (Array.isArray(paramTypes) && Array.isArray(paramsData)) {
      const paramTypeObj = Object.create(null)
      const paramsDataObj = Object.create(null)
      const paramsDataLength = paramsData.length
      paramTypes.forEach((paramType, index) => {
        paramTypeObj[paramType.name] = paramType
        if (paramsDataLength > index) {
          paramsDataObj[paramType.name] = paramsData[index]
        }
      })
      paramTypes = paramTypeObj
      paramsData = paramsDataObj
    }

    if (isFn(paramTypes.beforeValidate)) {
      const err = paramTypes.beforeValidate(paramsData)
      if (err) {
        return invokeCallbackHandlerFail(err, apiName, callbackId)
      }
    }

    const keys = Object.keys(paramTypes)
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === 'beforeValidate') {
        continue
      }
      const err = validateParam(keys[i], paramTypes, paramsData)
      if (err) {
        return invokeCallbackHandlerFail(err, apiName, callbackId)
      }
    }
  }
  return true
}

let invokeCallbackId = 1

const invokeCallbacks = {}

function createKeepAliveApiCallback (apiName, callback) {
  const callbackId = invokeCallbackId++
  const invokeCallbackName = 'api.' + apiName + '.' + callbackId

  const invokeCallback = function (res) {
    callback(res)
  }

  invokeCallbacks[callbackId] = {
    name: invokeCallbackName,
    keepAlive: true,
    callback: invokeCallback
  }
  return callbackId
}

function createApiCallback (apiName, params = {}, extras = {}) {
  if (!isPlainObject(params)) {
    return {
      params
    }
  }
  params = Object.assign({}, params)

  const apiCallbacks = {}
  for (let name in params) {
    const param = params[name]
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param)
      delete params[name]
    }
  }

  const {
    success,
    fail,
    cancel,
    complete
  } = apiCallbacks

  const hasSuccess = isFn(success)
  const hasFail = isFn(fail)
  const hasCancel = isFn(cancel)
  const hasComplete = isFn(complete)

  if (!hasSuccess && !hasFail && !hasCancel && !hasComplete) { // 无回调
    return {
      params
    }
  }

  const wrapperCallbacks = {}
  for (let name in extras) {
    const extra = extras[name]
    if (isFn(extra)) {
      wrapperCallbacks[name] = tryCatchFramework(extra)
    }
  }

  const {
    beforeSuccess,
    afterSuccess,
    beforeFail,
    afterFail,
    beforeCancel,
    afterCancel,
    afterAll
  } = wrapperCallbacks

  const callbackId = invokeCallbackId++
  const invokeCallbackName = 'api.' + apiName + '.' + callbackId

  const invokeCallback = function (res) {
    res.errMsg = res.errMsg || apiName + ':ok'

    // 部分 api 可能返回的 errMsg 的 api 名称部分不一致，格式化为正确的
    if (res.errMsg.indexOf(':ok') !== -1) {
      res.errMsg = apiName + ':ok'
    } else if (res.errMsg.indexOf(':cancel') !== -1) {
      res.errMsg = apiName + ':cancel'
    } else if (res.errMsg.indexOf(':fail') !== -1) {
      res.errMsg = apiName + ':fail'
    }

    const errMsg = res.errMsg

    if (errMsg.indexOf(apiName + ':ok') === 0) {
      isFn(beforeSuccess) && beforeSuccess(res)

      hasSuccess && success(res)

      isFn(afterSuccess) && afterSuccess(res)
    } else if (errMsg.indexOf(apiName + ':cancel') === 0) {
      res.errMsg = res.errMsg.replace(apiName + ':cancel', apiName + ':fail cancel')

      hasFail && fail(res)

      isFn(beforeCancel) && beforeCancel(res)

      hasCancel && cancel(res)

      isFn(afterCancel) && afterCancel(res)
    } else if (errMsg.indexOf(apiName + ':fail') === 0) {
      isFn(beforeFail) && beforeFail(res)

      hasFail && fail(res)

      isFn(afterFail) && afterFail(res)
    }

    hasComplete && complete(res)

    isFn(afterAll) && afterAll(res)
  }

  invokeCallbacks[callbackId] = {
    name: invokeCallbackName,
    callback: invokeCallback
  }

  return {
    params,
    callbackId
  }
}

function createInvokeCallback (apiName, params = {}, extras = {}) {
  const {
    params: args,
    callbackId
  } = createApiCallback(apiName, params, extras)

  if (isPlainObject(args) && !validateParams(apiName, args, callbackId)) {
    return {
      params: args,
      callbackId: false
    }
  }

  return {
    params: args,
    callbackId
  }
}

export function invokeCallbackHandler (invokeCallbackId, res) {
  if (typeof invokeCallbackId === 'number') {
    const invokeCallback = invokeCallbacks[invokeCallbackId]
    if (invokeCallback) {
      if (!invokeCallback.keepAlive) {
        delete invokeCallbacks[invokeCallbackId]
      }
      return invokeCallback.callback(res)
    }
  }
  return res
}

export function wrapperUnimplemented (name) {
  return function todo (args) {
    console.error('API `' + name + '` is not yet implemented')
  }
}

function wrapperExtras (name, extras) {
  const protocolOptions = protocol[name]
  if (protocolOptions) {
    isFn(protocolOptions.beforeSuccess) && (extras.beforeSuccess = protocolOptions.beforeSuccess)
  }
}

export function wrapper (name, invokeMethod, extras = {}) {
  if (!isFn(invokeMethod)) {
    return invokeMethod
  }
  wrapperExtras(name, extras)
  return function (...args) {
    if (isSyncApi(name)) {
      if (validateParams(name, args, -1)) {
        return invokeMethod.apply(null, args)
      }
    } else if (isCallbackApi(name)) {
      if (validateParams(name, args, -1)) {
        return invokeMethod(createKeepAliveApiCallback(name, args[0]))
      }
    } else {
      let argsObj = {}
      if (args.length) {
        argsObj = args[0]
      }
      const {
        params,
        callbackId
      } = createInvokeCallback(name, argsObj, extras)
      if (callbackId !== false) {
        let res
        if (isFn(params)) {
          res = invokeMethod(callbackId)
        } else {
          res = invokeMethod(params, callbackId)
        }
        if (res && !isTaskApi(name)) {
          res = invokeCallbackHandler(callbackId, res)
          if (isPlainObject(res)) {
            res.errMsg = res.errMsg || name + ':ok'
          }
        }
        return res
      }
    }
  }
}
