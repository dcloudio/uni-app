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

    this.uiEventBatchData = []
  }

  addVData (cid, data = {}) {
    this.addBatchVData.push([cid, data])
  }

  updateVData (cid, data = {}) {
    this.updateBatchVData.push([cid, data])
  }

  initVm (vm) {
    const [cid, data] = this.addBatchVData.shift()
    if (!cid) {
      vm._$id = guid()
      console.error('cid unmatched', vm)
    } else {
      vm._$id = cid
    }
    vm.$r = data || Object.create(null)
    this.vms[vm._$id] = vm
  }

  addUIEvent (cid, nid, event) {
    this.uiEventBatchData.push([cid, nid, event])
  }

  sendUIEvent () {
    if (this.uiEventBatchData.length) {
      UniViewJSBridge.publishHandler(VD_SYNC, {
        data: [
          [UI_EVENT, this.uiEventBatchData]
        ],
        options: {
          timestamp: Date.now()
        }
      })
      this.uiEventBatchData.length = 0
    }
  }

  flush () {
    console.log('update....', this.addBatchVData, this.updateBatchVData)
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
