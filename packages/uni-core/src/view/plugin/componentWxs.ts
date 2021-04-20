import { ComponentPublicInstance } from 'vue'
import { isFunction, isPlainObject } from '@vue/shared'
// import { normalizeEvent, findUniTarget } from './componentEvents'

interface WxsElement extends HTMLElement {
  __wxsStyle: Record<string, string>
  __wxsAddClass: string
  __wxsRemoveClass: string[]
  __wxsState: Record<string, any>
  __vue__: ComponentPublicInstance // TODO vue3 暂不支持
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

class ComponentDescriptor {
  private $vm: ComponentPublicInstance
  private $el: WxsElement
  constructor(vm: ComponentPublicInstance) {
    this.$vm = vm
    this.$el = vm.$el
  }

  selectComponent(selector: string) {
    if (!this.$el || !selector) {
      return
    }
    const el = this.$el.querySelector(selector) as WxsElement
    return el && el.__vue__ && createComponentDescriptor(el.__vue__, false)
  }

  selectAllComponents(selector: string) {
    if (!this.$el || !selector) {
      return []
    }
    const descriptors = []
    const els = this.$el.querySelectorAll(selector)
    for (let i = 0; i < els.length; i++) {
      const el = els[i] as WxsElement
      el.__vue__ &&
        descriptors.push(createComponentDescriptor(el.__vue__, false))
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

  getComputedStyle() {
    if (this.$el) {
      return window.getComputedStyle(this.$el)
    }
    return {}
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
    return window.requestAnimationFrame(callback), this
  }

  getState() {
    return this.$el && (this.$el.__wxsState || (this.$el.__wxsState = {}))
  }

  triggerEvent(eventName: string, detail = {}) {
    // TODO options
    return this.$vm.$emit(eventName, detail), this
  }
}

function createComponentDescriptor(
  vm: ComponentPublicInstance,
  isOwnerInstance = true
) {
  if (
    isOwnerInstance &&
    vm &&
    vm.$options.name &&
    vm.$options.name.indexOf('VUni') === 0
  ) {
    // ownerInstance 内置组件需要使用父 vm
    vm = vm.$parent!
  }
  if (vm && vm.$el) {
    if (!vm.$el.__wxsComponentDescriptor) {
      vm.$el.__wxsComponentDescriptor = new ComponentDescriptor(vm)
    }
    return vm.$el.__wxsComponentDescriptor
  }
}

export function getComponentDescriptor(
  this: ComponentPublicInstance,
  instance: ComponentPublicInstance,
  isOwnerInstance: boolean
) {
  return createComponentDescriptor(instance || this, isOwnerInstance)
}

// export function handleWxsEvent(this: ComponentPublicInstance, $event: Event) {
//   if (!($event instanceof Event)) {
//     return $event
//   }
//   const currentTarget = $event.currentTarget as WxsElement
//   const instance =
//     currentTarget &&
//     currentTarget.__vue__ &&
//     getComponentDescriptor.call(this, currentTarget.__vue__, false)
//   const $origEvent = $event
//   $event = normalizeEvent(
//     $origEvent.type,
//     $origEvent,
//     {},
//     findUniTarget($origEvent, this.$el) || $origEvent.target,
//     $origEvent.currentTarget as HTMLElement
//   ) as Event
//   ;($event as any).instance = instance
//   $event.preventDefault = function () {
//     return $origEvent.preventDefault()
//   }
//   $event.stopPropagation = function () {
//     return $origEvent.stopPropagation()
//   }
// }
