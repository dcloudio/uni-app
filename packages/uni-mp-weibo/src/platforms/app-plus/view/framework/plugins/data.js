import Vue from 'vue'

import {
  VD_SYNC,
  PAGE_CREATE,
  MOUNTED_DATA,
  UPDATED_DATA,
  PAGE_CREATED,
  VD_SYNC_CALLBACK
} from '../../../constants'

import {
  ON_PAGE_CREATE
} from '../../constants'

import {
  VDomSync
} from './vdom-sync'

import {
  setCurrentPage
} from '../page'

import {
  getPageVueComponent
} from '../../../page-factory'

export let vd

let PageVueComponent

const handleData = {
  [PAGE_CREATE]: function onPageCreate (data) {
    const [pageId, pagePath, pageOptions] = data
    document.title = `${pagePath}[${pageId}]`

    // 设置当前页面伪对象，方便其他地方使用 getCurrentPages 获取当前页面 id，route
    setCurrentPage(pageId, pagePath)
    // 通知页面创建，根据当前页面配置信息，初始化部分事件
    UniViewJSBridge.subscribeHandler(ON_PAGE_CREATE, pageOptions, pageId)
    // 初始化当前页面 VueComponent（生成页面样式代码）
    PageVueComponent = getPageVueComponent(pagePath)
    // 生成当前页面 vd
    vd = new VDomSync(pageId, {
      version: pageOptions.version
    })
  },
  [MOUNTED_DATA]: function onMounted (data) {
    vd.addVData.apply(vd, data)
  },
  [UPDATED_DATA]: function onUpdated (data) {
    vd.updateVData.apply(vd, data)
  },
  [PAGE_CREATED]: function onPageCreated (data) {
    const [pageId, pagePath, pageQuery] = data
    const page = getCurrentPages()[0]
    page.options = pageQuery || {}
    page.$vm = new PageVueComponent({
      mpType: 'page',
      pageId,
      pagePath,
      pageQuery
    }).$mount('#app')
  }
}

function broadcast (vm, componentName, eventName, ...params) {
  vm.$children.forEach(child => {
    const name = child.$options.name && child.$options.name.replace(/^VUni/, '')
    if (~componentName.indexOf(name)) {
      child.$emit(eventName, ...params)
    }
    broadcast(child, componentName, eventName, ...params)
  })
}

const NATIVE_COMPONENTS = ['Camera', 'LivePlayer', 'LivePusher', 'Map', 'Video', 'CoverView', 'CoverImage', 'Ad']

function updateView () {
  const pages = getCurrentPages()
  const pageVm = pages[0] && pages[0].$vm
  pageVm && broadcast(
    pageVm,
    NATIVE_COMPONENTS,
    'uni-view-update'
  )
}

window.addEventListener('resize', () => {
  updateView()
})

window.addEventListener('updateview', updateView)

function vdSync ({
  data,
  options
}) {
  let isVdCallback = true
  data.forEach(data => {
    if (data[0] === PAGE_CREATE) { // 页面创建无需触发 callback
      isVdCallback = false
    }
    handleData[data[0]](data[1])
  })
  vd.flush()
  Vue.nextTick(() => {
    // 清空本次 addBatchData
    vd.clearAddBatchVData()
    updateView()
    isVdCallback && UniViewJSBridge.publishHandler(VD_SYNC_CALLBACK)
  })
}

function getData (id, name) {
  try {
    const data = this.$r[id][name]
    if (name === 'is' && typeof data === 'object') {
      const components = this.$options.components || {}
      for (const key in components) {
        const value = components[key]
        const options = typeof value === 'function' ? value.options : value
        if (options.__file === data.__file) {
          return options
        }
      }
    }
    return data
  } catch (e) {
    // console.error(this.$options.__file + `:[${this._$id}]$r[${id}][${name}] is undefined`)
  }
}
/**
 * wxs change:prop
 * @param {Object} id
 * @param {Object} name
 */
function getChangeData (id, name) {
  try {
    const value = this.$r[id][name]
    const wxsPropName = name.replace('change:', '')
    this[wxsPropName] = value
    this.$set(this.wxsProps, wxsPropName, value)
    return value
  } catch (e) {
    // console.error(this.$options.__file + `:[${this._$id}]$r[${id}][${name}] is undefined`)
  }
}

export function initData (Vue) {
  Vue.prototype._$g = getData
  Vue.prototype._$gc = getChangeData

  UniViewJSBridge.subscribe(VD_SYNC, vdSync)

  Object.defineProperty(Vue.prototype, '_$vd', {
    get () {
      return !this.$options.isReserved && vd
    }
  })

  Vue.mixin({
    beforeCreate () {
      if (this.$options.mpType) {
        this.mpType = this.$options.mpType
      }
      if (this._$vd) {
        this._$vd.initVm(this)
      }
    }
  })
}
