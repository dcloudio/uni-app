import { isArray, isFunction } from '@vue/shared'
import {
  formatLog,
  getValueByDataPath,
  WXS_PROTOCOL,
  WXS_MODULES,
} from '@dcloudio/uni-shared'
import {
  createComponentDescriptorVm,
  getComponentDescriptor,
} from '@dcloudio/uni-core'
import { UniCustomElement } from './components'
import { UniNode } from './elements/UniNode'

declare global {
  interface Window {
    __wxsModules: {
      [name: string]: Record<string, any>
    }
    __renderjsModules: {
      [name: string]: Record<string, any>
    }
  }
}

function getViewModule(moduleId: string, ownerEl: UniCustomElement) {
  const __wxsModules = window[('__' + WXS_MODULES) as '__wxsModules']
  const module = __wxsModules && __wxsModules[moduleId]
  if (module) {
    return module
  }
  if (ownerEl && ownerEl.__renderjsInstances) {
    return ownerEl.__renderjsInstances[moduleId]
  }
}

const WXS_PROTOCOL_LEN = WXS_PROTOCOL.length

export function invokeWxs(
  el: UniCustomElement | undefined,
  wxsStr: string,
  invokerArgs?: unknown[]
) {
  const [ownerId, moduleId, invoker, args] = parseWxs(wxsStr)
  const ownerEl = resolveOwnerEl(el!, ownerId)
  if (isArray(invokerArgs) || isArray(args)) {
    // methods
    const [moduleName, methodName] = invoker.split('.')
    return invokeWxsMethod(
      ownerEl,
      moduleId,
      moduleName,
      methodName,
      invokerArgs || args
    )
  }
  return getWxsProp(ownerEl, moduleId, invoker)
}

export function invokeWxsEvent(
  el: UniCustomElement,
  wxsStr: string,
  event: Record<string, any>
) {
  const [ownerId, moduleId, invoker] = parseWxs(wxsStr)
  const [moduleName, methodName] = invoker.split('.')
  const ownerEl = resolveOwnerEl(el, ownerId)
  return invokeWxsMethod(ownerEl, moduleId, moduleName, methodName, [
    wrapperWxsEvent(event, el),
    getComponentDescriptor(createComponentDescriptorVm(ownerEl), false),
  ])
}

function resolveOwnerEl(el: UniCustomElement, ownerId: number) {
  if (el.__ownerId === ownerId) {
    return el
  }
  let parentElement = el.parentElement as UniCustomElement
  while (parentElement) {
    if (parentElement.__ownerId === ownerId) {
      return parentElement
    }
    parentElement = parentElement.parentElement as UniCustomElement
  }
  return el
}

function parseWxs(wxsStr: string) {
  return JSON.parse(wxsStr.slice(WXS_PROTOCOL_LEN)) as [
    number,
    string,
    string,
    any
  ]
}

export function invokeWxsProps(
  wxsStr: string,
  el: UniCustomElement,
  newValue: unknown,
  oldValue: unknown
) {
  const [ownerId, moduleId, invoker] = parseWxs(wxsStr)
  const ownerEl = resolveOwnerEl(el, ownerId)
  const [moduleName, methodName] = invoker.split('.')
  return invokeWxsMethod(ownerEl, moduleId, moduleName, methodName, [
    newValue,
    oldValue,
    getComponentDescriptor(createComponentDescriptorVm(ownerEl), false),
    getComponentDescriptor(createComponentDescriptorVm(el), false),
  ])
}

function invokeWxsMethod(
  ownerEl: UniCustomElement,
  moduleId: string,
  moduleName: string,
  methodName: string,
  args: unknown[]
) {
  const module = getViewModule(moduleId, ownerEl)
  if (!module) {
    return console.error(
      formatLog('wxs', 'module ' + moduleName + ' not found')
    )
  }
  const method = (module as Record<string, any>)[methodName]
  if (!isFunction(method)) {
    return console.error(moduleName + '.' + methodName + ' is not a function')
  }
  return method.apply(module, args)
}

function getWxsProp(
  ownerEl: UniCustomElement,
  moduleId: string,
  dataPath: string
) {
  const module = getViewModule(moduleId, ownerEl)
  if (!module) {
    return console.error(formatLog('wxs', 'module ' + dataPath + ' not found'))
  }
  return getValueByDataPath(module, dataPath.slice(dataPath.indexOf('.') + 1))
}

export type WxsPropsInvoker = (newValue: unknown) => void

export function createWxsPropsInvoker(
  node: UniNode,
  wxsInvoker: string,
  value: unknown
): WxsPropsInvoker {
  let oldValue = value
  return (newValue: unknown) => {
    try {
      // 延迟到执行时再获取$，因为刚开始创建invoker时，组件的$还未准备好
      invokeWxsProps(wxsInvoker, node.$ as UniCustomElement, newValue, oldValue)
    } catch (e) {
      console.error(e)
    }
    oldValue = newValue
  }
}

function wrapperWxsEvent(event: Record<string, any>, el: UniCustomElement) {
  const vm = createComponentDescriptorVm(el)
  Object.defineProperty(event, 'instance', {
    get() {
      return getComponentDescriptor(vm, false)
    },
  })
  return event
}
