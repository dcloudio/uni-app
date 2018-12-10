import {
  isFn,
  isStr,
  hasOwn,
  isPlainObject
} from 'uni-shared'

import {
  isSyncApi
} from '../helpers/promise'

import protocols from 'uni-platform/service/api/protocols'

const CALLBACKS = ['success', 'fail', 'cancel', 'complete']

function processCallback (methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue))
  }
}

function processArgs (methodName, fromArgs, argsOption = {}, returnValue = {}) {
  if (isPlainObject(fromArgs)) { // 一般 api 的参数解析
    const toArgs = {}
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {}
    }
    Object.keys(fromArgs).forEach(key => {
      if (hasOwn(argsOption, key)) {
        let keyOption = argsOption[key]
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs)
        }
        if (!keyOption) { // 不支持的参数
          console.warn(`__PLATFORM_TITLE__ ${methodName}暂不支持${key}`)
        } else if (isStr(keyOption)) { // 重写参数 key
          toArgs[keyOption] = fromArgs[key]
        } else if (isPlainObject(keyOption)) { // {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value
        }
      } else if (CALLBACKS.includes(key)) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue)
      } else {
        toArgs[key] = fromArgs[key]
      }
    })
    return toArgs
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue)
  }
  return fromArgs
}

function processReturnValue (methodName, res, returnValue) {
  if (isFn(protocols.returnValue)) { // 处理通用 returnValue
    res = protocols.returnValue(methodName, res)
  }
  return processArgs(methodName, res, returnValue)
}

export default function wrapper (methodName, method) {
  if (hasOwn(protocols, methodName)) {
    const protocol = protocols[methodName]
    if (!protocol) { // 暂不支持的 api
      return function () {
        console.error(`__PLATFORM_TITLE__ 暂不支持${methodName}`)
      }
    }
    return function (arg1, arg2) { // 目前 api 最多两个参数
      let options = protocol
      if (isFn(protocol)) {
        options = protocol(arg1)
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue)

      const returnValue = __GLOBAL__[options.name || methodName](arg1, arg2)
      if (isSyncApi(methodName)) { // 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue)
      }
      return returnValue
    }
  }
  return method
}
