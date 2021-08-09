import { WXS_PROTOCOL } from '@dcloudio/uni-shared'
import { isArray } from '@vue/shared'

import { ComponentInternalInstance, ComponentOptions } from 'vue'

export function initRenderjs(
  { $renderjs }: ComponentOptions,
  instance: ComponentInternalInstance
) {
  initModules(instance, $renderjs)
}

export function initModules(
  instance: ComponentInternalInstance,
  modules: string[]
) {
  if (!isArray(modules)) {
    return
  }
  const ctx = (instance as any).ctx
  const $wxsModules = (instance.$wxsModules ||
    (instance.$wxsModules = [])) as unknown as string[]

  modules.forEach((module) => {
    ctx[module] = proxyModule(module)
    $wxsModules.push(module)
  })
}

const renderjsModule = {}

function proxyModule(module: string) {
  return new Proxy(renderjsModule, {
    get(_, p) {
      return createModuleFunction(module, p as string)
    },
  })
}

function renderjsFn() {}

function createModuleFunction(module: string, name: string): Function {
  const toJSON = () => WXS_PROTOCOL + JSON.stringify([module + '.' + name])
  return new Proxy(renderjsFn, {
    get(_, p) {
      if (p === 'toJSON') {
        return toJSON
      }
      return createModuleFunction(module + '.' + name, p as string)
    },
    apply(_target, _thisArg, args) {
      return WXS_PROTOCOL + JSON.stringify([module + '.' + name, ...args])
    },
  })
}
