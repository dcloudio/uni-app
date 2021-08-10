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
  // 使用了内部属性__scopeId
  const component = (instance.type as any).__scopeId || instance.proxy!.route
  const ctx = (instance as any).ctx
  const $wxsModules = (instance.$wxsModules ||
    (instance.$wxsModules = [])) as unknown as string[]
  modules.forEach((module) => {
    ctx[module] = proxyModule(component, module)
    $wxsModules.push(module)
  })
}

function proxyModule(component: string, module: string) {
  const target: Record<string, any> = {}
  return new Proxy(target, {
    get(_, p) {
      return (
        target[p as string] ||
        (target[p as string] = createModuleFunction(
          component,
          module,
          p as string
        ))
      )
    },
  })
}

function createModuleFunction(
  component: string,
  module: string,
  name: string
): Function {
  const target: any = () => {}
  const toJSON = () =>
    WXS_PROTOCOL + JSON.stringify([component, module + '.' + name])
  return new Proxy(target, {
    get(_, p) {
      if (p === 'toJSON') {
        return toJSON
      }
      return (
        target[p as string] ||
        (target[p as string] = createModuleFunction(
          component,
          module + '.' + name,
          p as string
        ))
      )
    },
    apply(_target, _thisArg, args) {
      return (
        WXS_PROTOCOL +
        JSON.stringify([component, module + '.' + name, [...args]])
      )
    },
  })
}
