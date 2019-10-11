import {
  PAGE_CREATE,
  MOUNTED_DATA,
  UPDATED_DATA,
  PAGE_CREATED
} from '../../../constants'

import {
  VDomSync
} from './vdom-sync'

import {
  createPage
} from '../page'

let vd

const handleData = {
  [PAGE_CREATE]: function onPageCreate (data) {
    const [pageId] = data

    __uniConfig.id = pageId

    vd = new VDomSync(pageId)
  },
  [MOUNTED_DATA]: function onMounted (data) {
    vd.addVData.apply(vd, data)
  },
  [UPDATED_DATA]: function onUpdated (data) {
    vd.updateVData.apply(vd, data)
  },
  [PAGE_CREATED]: function onPageCreated (data) {
    const [pagePath] = data
    createPage(pagePath, {
      mpType: 'page',
      pageId: vd.pageId,
      pagePath: pagePath
    }).$mount('#app')
  }
}

function vdSync ({
  data,
  options
}) {
  data.forEach(data => {
    handleData[data[0]](data[1])
  })
  vd.flush()
}

export function initData (Vue) {
  UniViewJSBridge.subscribe('vdSync', vdSync)

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
        console.log(`[${this._$id}] beforeCreate ` + Date.now())
      } else {
        console.log(`[null] beforeCreate ` + Date.now())
      }
    }
  })
}
