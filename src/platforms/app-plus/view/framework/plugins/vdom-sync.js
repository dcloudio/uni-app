import {
  guid
} from 'uni-shared'

import {
  VD_SYNC,
  UI_EVENT
} from '../../../constants'

export class VDomSync {
  constructor (pageId) {
    this.pageId = pageId
    this.addBatchVData = []
    this.updateBatchVData = []
    this.vms = Object.create(null)
  }

  addVData (cid, data = {}, options = {}) {
    this.addBatchVData.push([cid, data, options])
  }

  updateVData (cid, data = {}) {
    this.updateBatchVData.push([cid, data])
  }

  initVm (vm) {
    const [cid, data, options] = this.addBatchVData.shift()
    if (!cid) {
      vm._$id = guid()
      console.error('cid unmatched', vm)
    } else {
      vm._$id = cid
    }
    Object.assign(vm.$options, options)
    vm.$r = data || Object.create(null)
    this.vms[vm._$id] = vm
  }

  sendUIEvent (cid, nid, event) {
    UniViewJSBridge.publishHandler(VD_SYNC, {
      data: [
        [UI_EVENT, [
          [cid, nid, event]
        ]]
      ],
      options: {
        timestamp: Date.now()
      }
    })
  }

  clearAddBatchVData () {
    this.addBatchVData.length = 0
  }

  flush () {
    this.updateBatchVData.forEach(([cid, data]) => {
      const vm = this.vms[cid]
      if (!vm) {
        return console.error(`Not found ${cid}`)
      }
      Object.keys(data).forEach(cid => {
        Object.assign((vm.$r[cid] || (vm.$r[cid] = Object.create(null))), data[cid])
      })

      vm.$forceUpdate()
    })
    this.updateBatchVData.length = 0
  }
}
