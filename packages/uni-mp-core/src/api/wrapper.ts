import { hasOwn, isFunction, isPlainObject, isString } from '@vue/shared'

import type {
  MPProtocolArgs,
  MPProtocolArgsValue,
  MPProtocolObject,
  MPProtocols,
} from './protocols'
import { shouldKeepReturnValue } from './protocols/x'

import { isContextApi, isSyncApi, isTaskApi } from './promise'

const CALLBACKS = ['success', 'fail', 'cancel', 'complete']

export function initWrapper(protocols: MPProtocols) {
  function processCallback(
    methodName: string,
    method: Function,
    returnValue: unknown
  ) {
    return function (res: Record<string, any>) {
      return method(processReturnValue(methodName, res, returnValue))
    }
  }

  function processArgs(
    methodName: string,
    fromArgs: unknown,
    argsOption: MPProtocolArgs = {},
    returnValue = {},
    keepFromArgs = false
  ) {
    if (isPlainObject(fromArgs)) {
      // 一般 api 的参数解析
      const toArgs = (keepFromArgs === true ? fromArgs : {}) as Record<
        string,
        any
      > // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
      if (isFunction(argsOption)) {
        argsOption = argsOption(fromArgs, toArgs) || {}
      }
      for (const key in fromArgs) {
        if (hasOwn(argsOption, key)) {
          let keyOption = argsOption[key]
          if (isFunction(keyOption)) {
            keyOption = (keyOption as Function)(fromArgs[key], fromArgs, toArgs)
          }
          if (!keyOption) {
            // 不支持的参数
            console.warn(`__PLATFORM_TITLE__ ${methodName} 暂不支持 ${key}`)
          } else if (isString(keyOption)) {
            // 重写参数 key
            toArgs[keyOption] = fromArgs[key]
          } else if (isPlainObject(keyOption)) {
            // {name:newName,value:value}可重新指定参数 key:value
            toArgs[keyOption.name ? keyOption.name : key] = (
              keyOption as MPProtocolArgsValue
            ).value
          }
        } else if (CALLBACKS.indexOf(key) !== -1) {
          const callback = (fromArgs as any)[key]
          if (isFunction(callback)) {
            toArgs[key] = processCallback(methodName, callback, returnValue)
          }
        } else {
          if (!keepFromArgs && !hasOwn(toArgs, key)) {
            toArgs[key] = (fromArgs as any)[key]
          }
        }
      }
      return toArgs
    } else if (isFunction(fromArgs)) {
      fromArgs = processCallback(methodName, fromArgs, returnValue)
    }
    return fromArgs
  }

  function processReturnValue(
    methodName: string,
    res: Record<string, any>,
    returnValue: unknown,
    keepReturnValue = false
  ) {
    if (isFunction(protocols.returnValue)) {
      // 处理通用 returnValue
      res = protocols.returnValue(methodName, res)
    }
    const realKeepReturnValue =
      keepReturnValue || (__X__ && shouldKeepReturnValue(methodName))
    return processArgs(
      methodName,
      res,
      returnValue as MPProtocolArgs,
      {},
      realKeepReturnValue
    )
  }
  return function wrapper(methodName: string, method: unknown) {
    if ((isContextApi(methodName) || isTaskApi(methodName)) && method) {
      const oldMethod = method as Function
      method = function (...args: unknown[]) {
        const contextOrTask = oldMethod(...args)
        if (contextOrTask) {
          contextOrTask.__v_skip = true
        }
        return contextOrTask
      }
    }
    if (
      (!hasOwn(protocols, methodName) && !isFunction(protocols.returnValue)) ||
      !isFunction(method)
    ) {
      return method
    }
    const protocol = protocols[methodName] as MPProtocolObject
    if (!protocol && !isFunction(protocols.returnValue)) {
      // 暂不支持的 api
      return function () {
        console.error(`__PLATFORM_TITLE__ 暂不支持${methodName}`)
      }
    }
    return function (arg1: unknown, arg2: unknown) {
      // 目前 api 最多两个参数
      let options = protocol || {}
      if (isFunction(protocol)) {
        options = protocol(arg1)
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue)

      const args = [arg1]
      if (typeof arg2 !== 'undefined') {
        args.push(arg2)
      }
      const returnValue = __GLOBAL__[options.name || methodName].apply(
        __GLOBAL__,
        args
      )
      if (isContextApi(methodName) || isTaskApi(methodName)) {
        if (returnValue && !returnValue.__v_skip) {
          returnValue.__v_skip = true
        }
      }
      if (isSyncApi(methodName)) {
        // 同步 api
        return processReturnValue(
          methodName,
          returnValue,
          options.returnValue,
          isContextApi(methodName)
        )
      }
      return returnValue
    }
  }
}
