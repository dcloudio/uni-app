import type { ComponentInternalInstance, ComponentPublicInstance } from 'vue'
import {
  isFunction,
  isPlainObject,
  isString,
  parseStringStyle,
  stringifyStyle,
} from '@vue/shared'
import {
  ON_WXS_INVOKE_CALL_METHOD,
  resolveOwnerEl,
  resolveOwnerVm,
} from '@dcloudio/uni-shared'

export interface WxsElement extends HTMLElement {
  __id?: number
  __ownerId?: number
  __wxsVm?: ComponentDescriptorVm
  __wxsStyle: Record<string, string | number>
  __wxsAddClass: string[]
  __wxsRemoveClass: string[]
  __wxsState: Record<string, any>
  __wxsClassChanged: boolean
  __wxsStyleChanged: boolean
  __vueParentComponent?: ComponentInternalInstance // vue3 引擎内部，需要开放该属性
  __wxsComponentDescriptor?: ComponentDescriptor
}

export interface ComponentDescriptorVm {
  ownerId?: number
  $el: WxsElement
  $emit: (event: string, ...args: any[]) => void
  $forceUpdate: any
}

export class ComponentDescriptor {
  private $vm: ComponentDescriptorVm
  private $el: WxsElement
  private $bindClass: boolean = false
  private $bindStyle: boolean = false
  constructor(vm: ComponentDescriptorVm) {
    this.$vm = vm
    if (__PLATFORM__ === 'h5') {
      this.$el = resolveOwnerEl((vm as ComponentPublicInstance).$) as WxsElement
    } else {
      this.$el = vm.$el
    }

    if (this.$el.getAttribute) {
      this.$bindClass = !!this.$el.getAttribute('class')
      this.$bindStyle = !!this.$el.getAttribute('style')
    }
  }

  selectComponent(selector: string) {
    if (!this.$el || !selector) {
      return
    }
    const wxsVm = getWxsVm(this.$el.querySelector(selector) as WxsElement)
    if (!wxsVm) {
      return
    }
    return createComponentDescriptor(wxsVm, false)
  }

  selectAllComponents(selector: string) {
    if (!this.$el || !selector) {
      return []
    }
    const descriptors: ComponentDescriptor[] = []
    const els = this.$el.querySelectorAll(selector)
    for (let i = 0; i < els.length; i++) {
      const wxsVm = getWxsVm(els[i] as WxsElement)
      if (wxsVm) {
        descriptors.push(createComponentDescriptor(wxsVm, false)!)
      }
    }
    return descriptors
  }

  forceUpdate(type: 'class' | 'style') {
    if (type === 'class') {
      if (this.$bindClass) {
        // 组件已绑定class，通过vue内核更新
        this.$el.__wxsClassChanged = true
        this.$vm.$forceUpdate()
      } else {
        this.updateWxsClass()
      }
    } else if (type === 'style') {
      if (this.$bindStyle) {
        // 组件已绑定style，通过vue内核更新
        this.$el.__wxsStyleChanged = true
        this.$vm.$forceUpdate()
      } else {
        this.updateWxsStyle()
      }
    }
  }
  updateWxsClass() {
    const { __wxsAddClass } = this.$el
    if (__wxsAddClass.length) {
      this.$el.className = __wxsAddClass.join(' ')
    }
  }
  updateWxsStyle() {
    const { __wxsStyle } = this.$el
    if (__wxsStyle) {
      this.$el.setAttribute('style', stringifyStyle(__wxsStyle))
    }
  }
  setStyle(style: string | Record<string, string | number>) {
    if (!this.$el || !style) {
      return this
    }
    if (isString(style)) {
      style = parseStringStyle(style)
    }
    if (isPlainObject(style)) {
      this.$el.__wxsStyle = style
      this.forceUpdate('style')
    }
    return this
  }

  addClass(clazz: string) {
    if (!this.$el || !clazz) {
      return this
    }
    const __wxsAddClass =
      this.$el.__wxsAddClass || (this.$el.__wxsAddClass = [])
    if (__wxsAddClass.indexOf(clazz) === -1) {
      __wxsAddClass.push(clazz)
      this.forceUpdate('class')
    }
    return this
  }

  removeClass(clazz: string) {
    if (!this.$el || !clazz) {
      return this
    }
    const { __wxsAddClass } = this.$el
    if (__wxsAddClass) {
      const index = __wxsAddClass.indexOf(clazz)
      if (index > -1) {
        __wxsAddClass.splice(index, 1)
      }
    }
    const __wxsRemoveClass =
      this.$el.__wxsRemoveClass || (this.$el.__wxsRemoveClass = [])
    if (__wxsRemoveClass.indexOf(clazz) === -1) {
      __wxsRemoveClass.push(clazz)
      this.forceUpdate('class')
    }
    return this
  }

  hasClass(cls: string) {
    return this.$el && this.$el.classList.contains(cls)
  }

  getDataset() {
    return this.$el && this.$el.dataset
  }

  callMethod(funcName: string, args = {}) {
    const func = (this.$vm as any)[funcName]
    if (isFunction(func)) {
      func(JSON.parse(JSON.stringify(args)))
    } else if (this.$vm.ownerId) {
      UniViewJSBridge.publishHandler(ON_WXS_INVOKE_CALL_METHOD, {
        nodeId: this.$el.__id,
        ownerId: this.$vm.ownerId,
        method: funcName,
        args,
      })
    }
  }

  requestAnimationFrame(callback: FrameRequestCallback) {
    return window.requestAnimationFrame(callback)
  }

  getState() {
    return this.$el && (this.$el.__wxsState || (this.$el.__wxsState = {}))
  }

  triggerEvent(eventName: string, detail = {}) {
    // TODO options
    return this.$vm.$emit(eventName, detail), this
  }

  getComputedStyle(names?: string[]) {
    if (this.$el) {
      const styles = window.getComputedStyle(this.$el)
      if (names && names.length) {
        return names.reduce<Record<string, any>>((res, n) => {
          res[n] = styles[n as keyof CSSStyleDeclaration]
          return res
        }, {})
      }
      return styles
    }
    return {}
  }

  setTimeout(handler: TimerHandler, timeout?: number) {
    return window.setTimeout(handler, timeout)
  }

  clearTimeout(handle?: number) {
    return window.clearTimeout(handle)
  }

  getBoundingClientRect() {
    return this.$el.getBoundingClientRect()
  }
}

function createComponentDescriptor(
  vm: ComponentDescriptorVm,
  isOwnerInstance = true
) {
  if (__PLATFORM__ === 'h5') {
    if (isOwnerInstance && vm) {
      vm = resolveOwnerVm((vm as ComponentPublicInstance).$)!
    }
  }
  if (vm && vm.$el) {
    if (!vm.$el.__wxsComponentDescriptor) {
      vm.$el.__wxsComponentDescriptor = new ComponentDescriptor(vm)
    }
    return vm.$el.__wxsComponentDescriptor
  }
}

export function getComponentDescriptor(
  instance: ComponentDescriptorVm | ComponentPublicInstance,
  isOwnerInstance: boolean
) {
  return createComponentDescriptor(instance, isOwnerInstance)
}

function resolveOwnerComponentPublicInstance(
  eventValue: Function,
  instance: ComponentInternalInstance | null,
  checkArgsLength = true
) {
  if (!instance) {
    return false
  }
  if (checkArgsLength && eventValue.length < 2) {
    return false
  }
  const ownerVm = resolveOwnerVm(instance)
  if (!ownerVm) {
    return false
  }
  const type = ownerVm.$.type
  if (!(type as any).$wxs && !(type as any).$renderjs) {
    return false
  }
  return ownerVm
}

export function wrapperH5WxsEvent(
  event: Record<string, any>,
  eventValue?: Function,
  instance?: ComponentInternalInstance | null,
  checkArgsLength = true
) {
  if (eventValue) {
    if (!event.__instance) {
      event.__instance = true
      Object.defineProperty(event, 'instance', {
        get() {
          return getComponentDescriptor(instance!.proxy!, false)
        },
      })
    }
    const ownerVm = resolveOwnerComponentPublicInstance(
      eventValue,
      instance!,
      checkArgsLength
    )
    if (ownerVm) {
      return [event, getComponentDescriptor(ownerVm, false)]
    }
  }
}

function getWxsVm(el: WxsElement) {
  if (!el) {
    return
  }
  if (__PLATFORM__ === 'app') {
    return createComponentDescriptorVm(el)
  } else if (__PLATFORM__ === 'h5') {
    return el.__vueParentComponent && el.__vueParentComponent.proxy!
  }
}

export function createComponentDescriptorVm(
  el: WxsElement
): ComponentDescriptorVm {
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
