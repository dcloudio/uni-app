import {
  hasOwn,
  isObject,
  camelize
} from 'uni-shared'

import {
  MOUNTED_DATA,
  UPDATED_DATA,
  VD_SYNC_VERSION
} from '../../../constants'

import {
  VDomSync
} from './vdom-sync'

import {
  V_IF,
  V_FOR,
  V_SHOW,
  V_ELSE_IF,
  B_CLASS,
  B_STYLE,
  S_CLASS
} from '../../constants'

import {
  generateId
} from '../../../helpers/util'

import {
  diff
} from './diff'

import parseComponentCreateOptions from './parse-component-create-options'

export function initData (Vue) {
  Vue.prototype._$s = setData

  Vue.prototype._$setData = function setData (type, data) {
    this._$vd.push(
      type,
      this._$id,
      data,
      type === MOUNTED_DATA && parseComponentCreateOptions(this)
    )
  }

  Vue.prototype._$mounted = function mounted () {
    if (!this._$vd) {
      return
    }
    diff(this._$newData, this._$data, this._$vdMountedData)
    this._$data = JSON.parse(JSON.stringify(this._$newData))
    if (this.mpType === 'page') {
      // 页面 mounted 之后，第一次同步数据
      this._$vd.flush()
    }
  }

  Vue.prototype._$updated = function updated () {
    if (!this._$vd) {
      return
    }

    diff(this._$newData, this._$data, this._$vdUpdatedData)
    this._$data = JSON.parse(JSON.stringify(this._$newData))
    // setTimeout 一下再 nextTick（ 直接 nextTick 的话，会紧接着该 updated 做 flush，导致父组件 updated 数据被丢弃）
    this._$vd.initialized && setTimeout(() => {
      this.$nextTick(this._$vd.flush.bind(this._$vd))
    }, 0)
  }

  Object.defineProperty(Vue.prototype, '_$vd', {
    get () {
      return this.$root._$vdomSync
    }
  })

  Vue.mixin({
    beforeCreate () {
      if (this.$options.mpType) {
        this.mpType = this.$options.mpType
      }
      if (this.mpType === 'app') {
        return
      }
      if (this.mpType === 'page') {
        this._$vdomSync = new VDomSync(this.$options.pageId, this.$options.pagePath, this.$options.pageQuery, this)
      }
      if (this._$vd) {
        this._$id = generateId(this, this.$parent, VD_SYNC_VERSION)
        this._$vd.addVm(this)
        this._$vdMountedData = Object.create(null)
        this._$setData(MOUNTED_DATA, this._$vdMountedData)
        this._$data = Object.create(null)
        this._$newData = Object.create(null)
      }
    },
    beforeUpdate () {
      if (!this._$vd) {
        return
      }
      // 当已存在 _$vdMountedData 时,使用重置后的 _$vdMountedData
      const mountedData = this._$vd.find(MOUNTED_DATA, this._$id)
      if (mountedData) {
        this._$data = Object.create(null) // 清空已有数据
        this._$vdUpdatedData = mountedData[1][1] = Object.create(null)
        if (process.env.NODE_ENV !== 'production') {
          console.log('updated=>mounted:' + this._$id)
        }
      } else {
        this._$vdUpdatedData = Object.create(null)
        this._$setData(UPDATED_DATA, this._$vdUpdatedData)
      }
      this._$newData = Object.create(null)
    },
    beforeDestroy () {
      if (!this._$vd) {
        return
      }
      this._$vd.removeVm(this)
      this._$vdomSync && this._$vdomSync.destroy()
    }
  })
}

function parseExternalClasses (clazz, vm) {
  const mpOptions = vm.$options.mpOptions
  if (mpOptions && Array.isArray(mpOptions.externalClasses)) {
    mpOptions.externalClasses.forEach(externalClass => {
      // 简单替换 externalClass
      const externalClassValue = vm[camelize(externalClass)]
      externalClassValue && (clazz = clazz.replace(externalClass, externalClassValue))
    })
  }
  return clazz
}

function setData (id, name, value) {
  switch (name) {
    case B_CLASS:
      value = parseExternalClasses(this._$stringifyClass(value), this)
      break
    case S_CLASS:
      value = parseExternalClasses(value, this)
      break
    case B_STYLE:
      value = this._$normalizeStyleBinding(value)
      break
    case V_IF:
    case V_SHOW:
    case V_ELSE_IF:
      value = value ? 1 : 0
      break
    case V_FOR:
      return setForData.call(this, id, value)
    case 'is': {
      if (typeof value === 'function') {
        value = value.options
      }
    }
  }

  return ((this._$newData[id] || (this._$newData[id] = {}))[name] = value)
}

function fillVForData (forItems, vForData) {
  let i, l
  if (Array.isArray(forItems) || typeof forItems === 'string') {
    for (i = 0, l = forItems.length; i < l; i++) {
      vForData[i] = i
    }
  } else if (typeof forItems === 'number') {
    for (i = 0; i < forItems; i++) {
      vForData[i] = i
    }
  } else if (isObject(forItems)) {
    for (i = 0, l = Object.keys(forItems).length; i < l; i++) {
      vForData[i] = i
    }
  }
}

function setForData (id, value) {
  const diffData = this._$newData[id] || (this._$newData[id] = {})
  const vForData = diffData[V_FOR] || (diffData[V_FOR] = [])

  if (value.forItems) {
    value.fill && fillVForData(value.forItems, vForData)
    return value.forItems
  }

  const {
    forIndex,
    key
  } = value

  if (!hasOwn(value, 'keyIndex')) {
    vForData[forIndex] = key
  } else {
    if (typeof vForData[forIndex] !== 'object') {
      vForData[forIndex] = {}
    }
    vForData[forIndex]['k' + value.keyIndex] = key
  }
  return key
}
