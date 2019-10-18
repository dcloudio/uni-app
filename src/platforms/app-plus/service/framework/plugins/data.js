import {
  guid,
  hasOwn
} from 'uni-shared'

import {
  VDomSync
} from './vdom-sync'

import {
  MOUNTED_DATA,
  UPDATED_DATA
} from '../../../constants'

import {
  diff
} from './diff'

export function initData (Vue) {
  Vue.prototype._$s = setData
  Vue.prototype._$i = setIfData
  Vue.prototype._$f = setForData
  Vue.prototype._$e = setElseIfData

  Vue.prototype._$setData = function setData (type, data) {
    this._$vd.push(type, this._$id, data)
  }

  Vue.prototype._$mounted = function mounted () {
    if (!this._$vd) {
      return
    }
    diff(this._$newData, this._$data, this._$vdMountedData)
    this._$data = JSON.parse(JSON.stringify(this._$newData))
    console.log(`[${this._$id}] mounted ` + Date.now())
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
    console.log(`[${this._$id}] updated ` + Date.now())
    this._$vd.initialized && this.$nextTick(this._$vd.flush.bind(this._$vd))
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
        this._$vdomSync = new VDomSync(this.$options.pageId, this.$options.pagePath)
      }
      if (this._$vd) {
        this._$id = guid()
        this._$vd.addVm(this)
        this._$vdMountedData = Object.create(null)
        this._$setData(MOUNTED_DATA, this._$vdMountedData)
        console.log(`[${this._$id}] beforeCreate ` + Date.now())
        // 目前全量采集做 diff(iOS 需要保留全量状态做 restore)，理论上可以差量采集
        this._$data = Object.create(null)
        this._$newData = Object.create(null)
      }
    },
    beforeUpdate () {
      if (!this._$vd) {
        return
      }
      this._$vdUpdatedData = Object.create(null)
      this._$setData(UPDATED_DATA, this._$vdUpdatedData)
      console.log(`[${this._$id}] beforeUpdate ` + Date.now())
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

function setData (id, name, value) {
  const diffData = this._$newData[id] || (this._$newData[id] = {})

  if (typeof name !== 'string') {
    for (let key in name) {
      diffData[key] = name[key]
    }
    return name
  }

  if (name === 'a-_i') {
    return value
  }
  return (diffData[name] = value)
}

function setForData (id, value) {
  const diffData = this._$newData[id] || (this._$newData[id] = {})
  const vForData = diffData['v-for'] || (diffData['v-for'] = [])

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

function setIfData (id, value) {
  return ((this._$newData[id] || (this._$newData[id] = {}))['v-if'] = value)
}

function setElseIfData (id, value) {
  return ((this._$newData[id] || (this._$newData[id] = {}))['v-else-if'] = value)
}
