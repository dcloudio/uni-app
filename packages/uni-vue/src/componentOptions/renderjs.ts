import { formatLog, RENDERJS_MODULES, WXS_PROTOCOL } from '@dcloudio/uni-shared'
import { isArray } from '@vue/shared'

import { ComponentInternalInstance, ComponentOptions } from 'vue'

export function initRenderjs(
  options: ComponentOptions,
  instance: ComponentInternalInstance
) {
  initModules(instance, options.$renderjs, options['$' + RENDERJS_MODULES])
}

export function initModules(
  instance: ComponentInternalInstance,
  modules: string[],
  moduleIds: Record<string, string> = {}
) {
  if (!isArray(modules)) {
    return
  }

  const ownerId = instance.uid
  // 在vue的定制内核中，通过$wxsModules来判断事件函数源码中是否包含该模块调用
  // !$wxsModules.find(module => invokerSourceCode.indexOf('.' + module + '.') > -1)
  const $wxsModules = (instance.$wxsModules ||
    (instance.$wxsModules = [])) as unknown as string[]
  const ctx = (instance as any).ctx

  modules.forEach((module) => {
    if (moduleIds[module]) {
      ctx[module] = proxyModule(ownerId, moduleIds[module], module)
      $wxsModules.push(module)
    } else {
      if (__DEV__) {
        console.error(formatLog('initModules', modules, moduleIds))
      }
    }
  })
}

function proxyModule(ownerId: number, moduleId: string, module: string) {
  const target: Record<string, any> = {}
  return new Proxy(target, {
    get(_, p) {
      return (
        target[p as string] ||
        (target[p as string] = createModuleFunction(
          ownerId,
          moduleId,
          module,
          p as string
        ))
      )
    },
  })
}

function createModuleFunction(
  ownerId: number,
  moduleId: string,
  module: string,
  name: string
): Function {
  const target: any = () => {}
  const toJSON = () =>
    WXS_PROTOCOL + JSON.stringify([ownerId, moduleId, module + '.' + name])
  return new Proxy(target, {
    get(_, p) {
      if (p === 'toJSON') {
        return toJSON
      }
      return (
        target[p as string] ||
        (target[p as string] = createModuleFunction(
          ownerId,
          moduleId,
          module + '.' + name,
          p as string
        ))
      )
    },
    apply(_target, _thisArg, args) {
      return (
        WXS_PROTOCOL +
        JSON.stringify([ownerId, moduleId, module + '.' + name, [...args]])
      )
    },
  })
}
