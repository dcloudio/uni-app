import { isArray, isFunction } from '@vue/shared'
import {
  formatLog,
  getValueByDataPath,
  WXS_PROTOCOL,
  WXS_MODULES,
  RENDERJS_MODULES,
} from '@dcloudio/uni-shared'
import {
  ComponentDescriptorVm,
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

function getWxsModule(moduleId: string) {
  const __wxsModules = window[('__' + WXS_MODULES) as '__wxsModules']
  const __renderjsModules =
    window[('__' + RENDERJS_MODULES) as '__renderjsModules']
  let module = __wxsModules && __wxsModules[moduleId]
  if (!module) {
    module = __renderjsModules && __renderjsModules[moduleId]
  }
  if (!module) {
    return console.error(formatLog('wxs or renderjs', moduleId + ' not found'))
  }
  return module
}

const WXS_PROTOCOL_LEN = WXS_PROTOCOL.length

export function invokeWxs(wxsStr: string, invokerArgs?: unknown[]) {
  const [, moduleId, invoker, args] = JSON.parse(
    wxsStr.substr(WXS_PROTOCOL_LEN)
  )
  if (isArray(invokerArgs) || isArray(args)) {
    // methods
    const [moduleName, mehtodName] = invoker.split('.')
    return invokeWxsMethod(
      moduleId,
      moduleName,
      mehtodName,
      invokerArgs || args
    )
  }
  return getWxsProp(moduleId, invoker)
}

export function invokeWxsEvent(
  wxsStr: string,
  el: UniCustomElement,
  event: Record<string, any>
) {
  const [ownerId, moduleId, invoker] = JSON.parse(
    wxsStr.substr(WXS_PROTOCOL_LEN)
  )
  const [moduleName, mehtodName] = invoker.split('.')
  return invokeWxsMethod(moduleId, moduleName, mehtodName, [
    wrapperWxsEvent(event, el),
    getComponentDescriptor(
      createComponentDescriptorVm(resolveOwnerEl(el, ownerId)),
      false
    ),
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

export function invokeWxsProps(
  wxsStr: string,
  el: UniCustomElement,
  newValue: unknown,
  oldValue: unknown
) {
  const [ownerId, moduleId, invoker] = JSON.parse(
    wxsStr.substr(WXS_PROTOCOL_LEN)
  )
  const [moduleName, mehtodName] = invoker.split('.')
  return invokeWxsMethod(moduleId, moduleName, mehtodName, [
    newValue,
    oldValue,
    getComponentDescriptor(
      createComponentDescriptorVm(resolveOwnerEl(el, ownerId)),
      false
    ),
    getComponentDescriptor(createComponentDescriptorVm(el), false),
  ])
}

function invokeWxsMethod(
  moduleId: string,
  moduleName: string,
  methodName: string,
  args: unknown[]
) {
  const module = getWxsModule(moduleId)
  if (!module) {
    return console.error(
      formatLog('wxs', 'module ' + moduleName + ' not found')
    )
  }
  const method = module[methodName]
  if (!isFunction(method)) {
    return console.error(moduleName + '.' + methodName + ' is not a function')
  }
  return method.apply(module, args)
}

function getWxsProp(moduleId: string, dataPath: string) {
  const module = getWxsModule(moduleId)
  if (!module) {
    return console.error(formatLog('wxs', 'module ' + dataPath + ' not found'))
  }
  return getValueByDataPath(module, dataPath.substr(dataPath.indexOf('.') + 1))
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

function createComponentDescriptorVm(el: UniCustomElement) {
  return (
    el.__wxsVm ||
    (el.__wxsVm = {
      ownerId: el.__ownerId,
      $el: el,
      $emit() {},
      $forceUpdate() {
        const {
          __wxsStyle,
          __wxsAddClass,
          __wxsRemoveClass,
          __wxsStyleChanged,
          __wxsClassChanged,
        } = el
        let updateClass: () => void
        let updateStyle: () => void
        if (__wxsStyleChanged) {
          el.__wxsStyleChanged = false
          __wxsStyle &&
            (updateStyle = () => {
              Object.keys(__wxsStyle).forEach((n) => {
                el.style[n as any] = __wxsStyle[n] as string
              })
            })
        }
        if (__wxsClassChanged) {
          el.__wxsClassChanged = false
          updateClass = () => {
            __wxsRemoveClass &&
              __wxsRemoveClass.forEach((clazz) => {
                el.classList.remove(clazz)
              })
            __wxsAddClass &&
              __wxsAddClass.forEach((clazz) => {
                el.classList.add(clazz)
              })
          }
        }
        requestAnimationFrame(() => {
          updateClass && updateClass()
          updateStyle && updateStyle()
        })
      },
    } as unknown as ComponentDescriptorVm)
  )
}
