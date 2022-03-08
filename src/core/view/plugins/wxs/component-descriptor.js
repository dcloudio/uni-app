import {
  isPlainObject
} from 'uni-shared'

const CLASS_RE = /^\s+|\s+$/g
const WXS_CLASS_RE = /\s+/

function getWxsClsArr (clsArr, classList, isAdd) {
  const wxsClsArr = []

  let checkClassList = function (cls) {
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

  clsArr.forEach(cls => {
    cls = cls.replace(CLASS_RE, '')
    checkClassList(cls) && wxsClsArr.push(cls)
  })
  return wxsClsArr
}

function parseStyleText (cssText) {
  const res = {}
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
  constructor (vm) {
    this.$vm = vm
    Object.defineProperty(this, '$el', {
      get () {
        return vm.$el
      }
    })
  }

  selectComponent (selector) {
    if (!this.$el || !selector) {
      return
    }
    const el = this.$el.querySelector(selector)
    return el && el.__vue__ && createComponentDescriptor(el.__vue__, false)
  }

  selectAllComponents (selector) {
    if (!this.$el || !selector) {
      return []
    }
    const descriptors = []
    const els = this.$el.querySelectorAll(selector)
    for (let i = 0; i < els.length; i++) {
      const el = els[i]
      el.__vue__ && descriptors.push(createComponentDescriptor(el.__vue__, false))
    }
    return descriptors
  }

  setStyle (style) {
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

  addClass (...clsArr) {
    if (!this.$el || !clsArr.length) {
      return this
    }

    const wxsClsArr = getWxsClsArr(clsArr, this.$el.classList, true)
    if (wxsClsArr.length) {
      const wxsClass = this.$el.__wxsAddClass || ''
      this.$el.__wxsAddClass = wxsClass + (wxsClass ? ' ' : '') + wxsClsArr.join(' ')
      this.$vm.$forceUpdate()
    }

    return this
  }

  removeClass (...clsArr) {
    if (!this.$el || !clsArr.length) {
      return this
    }
    const classList = this.$el.classList
    const addWxsClsArr = this.$el.__wxsAddClass ? this.$el.__wxsAddClass.split(WXS_CLASS_RE) : []
    const wxsClsArr = getWxsClsArr(clsArr, classList, false)
    if (wxsClsArr.length) {
      const removeWxsClsArr = []
      wxsClsArr.forEach(cls => {
        const clsIndex = addWxsClsArr.findIndex(oldCls => oldCls === cls)
        if (clsIndex !== -1) { // 在 addWxsClass 中
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

  hasClass (cls) {
    return this.$el && this.$el.classList.contains(cls)
  }

  getComputedStyle () {
    if (this.$el) {
      return window.getComputedStyle(this.$el)
    }
    return {}
  }

  getDataset () {
    return this.$el && this.$el.dataset
  }

  callMethod (funcName, args = {}) {
    if (funcName in this.$vm) {
      this.$vm[funcName](JSON.parse(JSON.stringify(args)))
    } else if (this.$vm._$id) {
      UniViewJSBridge.publishHandler('onWxsInvokeCallMethod', {
        cid: this.$vm._$id,
        method: funcName,
        args
      })
    }
  }

  requestAnimationFrame (callback) {
    return (global.requestAnimationFrame(callback), this)
  }

  getState () {
    return this.$el && (this.$el.__wxsState || (this.$el.__wxsState = {}))
  }

  triggerEvent (eventName, detail = {}, options = {}) {
    // TODO options
    return (this.$vm.$emit(eventName, detail), this)
  }

  setTimeout (handler, timeout) {
    return window.setTimeout(handler, timeout)
  }

  clearTimeout (handler) {
    return window.clearTimeout(handler)
  }

  getBoundingClientRect () {
    return this.$el.getBoundingClientRect()
  }
}

export function createComponentDescriptor (vm, isOwnerInstance = true) {
  if (isOwnerInstance && vm && vm.$options.name && vm.$options.name.indexOf('VUni') === 0) {
    // ownerInstance 内置组件需要使用父 vm
    vm = vm.$parent
  }
  // 改为挂载到 vm 实例，不同 vm 实例的 $el 可能重复
  if (vm) {
    if (!('__wxsComponentDescriptor' in vm)) {
      vm.__wxsComponentDescriptor = new ComponentDescriptor(vm)
    }
    return vm.__wxsComponentDescriptor
  }
}
