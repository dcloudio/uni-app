import {
  guid,
  hasOwn,
  camelize
} from 'uni-shared'

import {
  MOUNTED_DATA,
  UPDATED_DATA
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
    // TODO 自定义组件中的 slot 数据采集是在组件内部，导致所在 context 中无法获取到差量数据
    // 如何保证每个 vm 数据有变动，就加入 diff 中呢？
    // 每次变化，可能触发多次 beforeUpdate，updated
    // 子组件 updated 时，可能会增加父组件的 diffData，如 slot 等情况
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
        this._$vdomSync = new VDomSync(this.$options.pageId, this.$options.pagePath, this)
      }
      if (this._$vd) {
        this._$id = guid()
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
  }
  // TODO 暂时先传递 dataset 至 view 层(理论上不需要)
  if (name.indexOf('a-data-') === 0) {
    try {
      value = JSON.stringify(value)
    } catch (e) {}
  }

  return ((this._$newData[id] || (this._$newData[id] = {}))[name] = value)
}

function setForData (id, value) {
  const diffData = this._$newData[id] || (this._$newData[id] = {})
  const vForData = diffData[V_FOR] || (diffData[V_FOR] = [])

  if (value.forItems) {
    return value.forItems
  }

  const {
    forIndex,
    key
  } = value

  if (!hasOwn(value, 'keyIndex')) {
    vForData[forIndex] = key
  } else {
    (vForData[forIndex] || (vForData[forIndex] = {}))['k' + value.keyIndex] = key
  }
  return key
}
