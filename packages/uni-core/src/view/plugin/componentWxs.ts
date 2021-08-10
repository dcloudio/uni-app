import { ComponentInternalInstance, ComponentPublicInstance } from 'vue'
import { hyphenate, isFunction, isPlainObject } from '@vue/shared'
import { isBuiltInComponent } from '@dcloudio/uni-shared'
// import { normalizeEvent, findUniTarget } from './componentEvents'

interface WxsElement extends HTMLElement {
  __wxsStyle: Record<string, string>
  __wxsAddClass: string
  __wxsRemoveClass: string[]
  __wxsState: Record<string, any>
  __vueParentComponent: ComponentInternalInstance // vue3 引擎内部，需要开放该属性
  __wxsComponentDescriptor: ComponentDescriptor
}

const CLASS_RE = /^\s+|\s+$/g
const WXS_CLASS_RE = /\s+/

function getWxsClsArr(
  clsArr: string[],
  classList: DOMTokenList,
  isAdd: boolean
) {
  const wxsClsArr: string[] = []

  let checkClassList: (cls: string) => boolean = function (cls: string) {
    if (isAdd) {
      checkClassList = function (cls) {
        return !classList.contains(cls)
      }
    } else {
      checkClassList = function (cls) {
        return classList.contains(cls)
      }
    }
    return checkClassList(cls)
  }

  clsArr.forEach((cls) => {
    cls = cls.replace(CLASS_RE, '')
    checkClassList(cls) && wxsClsArr.push(cls)
  })
  return wxsClsArr
}

function parseStyleText(cssText: string) {
  const res: Record<string, string> = {}
  const listDelimiter = /;(?![^(]*\))/g
  const propertyDelimiter = /:(.+)/
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      const tmp = item.split(propertyDelimiter)
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim())
    }
  })
  return res
}

interface ComponentDescriptorVm {
  _$id?: string
  $el: WxsElement
  $emit: (event: string, ...args: any[]) => void
  $forceUpdate: () => void
}

export class ComponentDescriptor {
  private $vm: ComponentDescriptorVm
  private $el: WxsElement
  constructor(vm: ComponentDescriptorVm) {
    this.$vm = vm
    this.$el = vm.$el
  }

  selectComponent(selector: string) {
    if (!this.$el || !selector) {
      return
    }
    const el = this.$el.querySelector(selector) as WxsElement
    return (
      el &&
      el.__vueParentComponent &&
      createComponentDescriptor(el.__vueParentComponent.proxy!, false)
    )
  }

  selectAllComponents(selector: string) {
    if (!this.$el || !selector) {
      return []
    }
    const descriptors = []
    const els = this.$el.querySelectorAll(selector)
    for (let i = 0; i < els.length; i++) {
      const el = els[i] as WxsElement
      el.__vueParentComponent &&
        descriptors.push(
          createComponentDescriptor(el.__vueParentComponent.proxy!, false)
        )
    }
    return descriptors
  }

  setStyle(style: string | Record<string, string>) {
    if (!this.$el || !style) {
      return this
    }
    if (typeof style === 'string') {
      style = parseStyleText(style)
    }
    if (isPlainObject(style)) {
      this.$el.__wxsStyle = style
      this.$vm.$forceUpdate()
    }
    return this
  }

  addClass(...clsArr: string[]) {
    if (!this.$el || !clsArr.length) {
      return this
    }

    const wxsClsArr = getWxsClsArr(clsArr, this.$el.classList, true)
    if (wxsClsArr.length) {
      const wxsClass = this.$el.__wxsAddClass || ''
      this.$el.__wxsAddClass =
        wxsClass + (wxsClass ? ' ' : '') + wxsClsArr.join(' ')
      this.$vm.$forceUpdate()
    }

    return this
  }

  removeClass(...clsArr: string[]) {
    if (!this.$el || !clsArr.length) {
      return this
    }
    const classList = this.$el.classList
    const addWxsClsArr = this.$el.__wxsAddClass
      ? this.$el.__wxsAddClass.split(WXS_CLASS_RE)
      : []
    const wxsClsArr = getWxsClsArr(clsArr, classList, false)
    if (wxsClsArr.length) {
      const removeWxsClsArr: string[] = []
      wxsClsArr.forEach((cls) => {
        const clsIndex = addWxsClsArr.findIndex(
          (oldCls: string) => oldCls === cls
        )
        if (clsIndex !== -1) {
          // 在 addWxsClass 中
          addWxsClsArr.splice(clsIndex, 1)
        }
        removeWxsClsArr.push(cls)
      })
      this.$el.__wxsRemoveClass = removeWxsClsArr
      this.$el.__wxsAddClass = addWxsClsArr.join(' ')
      this.$vm.$forceUpdate()
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
    } else if ((this.$vm as any)._$id) {
      UniViewJSBridge.publishHandler('onWxsInvokeCallMethod', {
        cid: (this.$vm as any)._$id,
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

function resolveOwnerVm(vm: ComponentPublicInstance) {
  let componentName = vm.$options && vm.$options.name
  while (componentName && isBuiltInComponent(hyphenate(componentName))) {
    // ownerInstance 内置组件需要使用父 vm
    vm = vm.$parent!
    componentName = vm.$options && vm.$options.name
  }
  return vm
}

function createComponentDescriptor(
  vm: ComponentDescriptorVm,
  isOwnerInstance = true
) {
  if (isOwnerInstance && vm) {
    if (__PLATFORM__ === 'h5') {
      vm = resolveOwnerVm(vm as ComponentPublicInstance)
    }
    // TODO App
  }
  if (vm && vm.$el) {
    if (!vm.$el.__wxsComponentDescriptor) {
      vm.$el.__wxsComponentDescriptor = new ComponentDescriptor(vm)
    }
    return vm.$el.__wxsComponentDescriptor
  }
}

export function getComponentDescriptor(
  instance: ComponentPublicInstance,
  isOwnerInstance: boolean
) {
  return createComponentDescriptor(instance, isOwnerInstance)
}
