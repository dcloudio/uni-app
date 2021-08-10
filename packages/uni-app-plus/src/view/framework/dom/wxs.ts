import { isArray } from '@vue/shared'
import {
  formatLog,
  getValueByDataPath,
  WXS_PROTOCOL,
  ATTR_CHANGE_PREFIX,
} from '@dcloudio/uni-shared'
import { ComponentDescriptor } from '@dcloudio/uni-core'

declare global {
  interface Window {
    WxsModules: {
      [name: string]: Record<string, any>
    }
    RenderjsModules: {
      [name: string]: Record<string, any>
    }
  }
}

function getWxsModule(component: string) {
  const { WxsModules, RenderjsModules } = window
  let module = WxsModules && WxsModules[component]
  if (!module) {
    module = RenderjsModules && RenderjsModules[component]
  }
  if (!module) {
    return console.error(formatLog('wxs or renderjs', component + ' not found'))
  }
  return module
}

const WXS_PROTOCOL_LEN = WXS_PROTOCOL.length

export function invokeWxs(value: string, invokerArgs?: unknown[]) {
  const [component, invoker, args] = JSON.parse(value.substr(WXS_PROTOCOL_LEN))
  if (isArray(invokerArgs) || isArray(args)) {
    // methods
    const [moduleName, mehtodName] = invoker.split('.')
    return invokeWxsMethod(
      component,
      moduleName,
      mehtodName,
      invokerArgs || args
    )
  }
  return getWxsProp(component, invoker)
}

function invokeWxsMethod(
  component: string,
  moduleName: string,
  methodName: string,
  args: unknown[]
) {
  const modules = getWxsModule(component)
  if (!modules) {
    return
  }
  const module = modules[moduleName]
  if (!module) {
    return console.error(
      formatLog('wxs', 'module ' + moduleName + ' not found')
    )
  }
  return module[methodName].apply(module, args)
}

function getWxsProp(component: string, dataPath: string) {
  const modules = getWxsModule(component)
  if (!modules) {
    return
  }
  return getValueByDataPath(modules, dataPath)
}

export type WxsPropsInvoker = (newValue: unknown) => void

export function createWxsPropsInvoker(
  wxsInvoker: string,
  value: unknown
): WxsPropsInvoker {
  let oldValue = value
  return (newValue: unknown) => {
    // TODO
    const ownerInstance: ComponentDescriptor | null = null
    const instance: ComponentDescriptor | null = null
    try {
      invokeWxs(wxsInvoker, [newValue, oldValue, ownerInstance, instance])
    } catch (e) {
      console.error(e)
    }
    oldValue = newValue
  }
}
