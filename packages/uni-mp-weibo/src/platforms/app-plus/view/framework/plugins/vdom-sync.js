import {
  VD_SYNC,
  UI_EVENT
} from '../../../constants'

import {
  generateId
} from '../../../helpers/util'

function findParent (vm) {
  let parent = vm.$parent
  while (parent) {
    if (parent._$id) {
      return parent
    }
    parent = parent.$parent
  }
}

export class VDomSync {
  constructor (pageId, options = {}) {
    this.pageId = pageId
    this.addBatchVData = Object.create(null)
    this.updateBatchVData = []
    this.vms = Object.create(null)

    this.version = options.version
  }

  addVData (cid, data = {}, options = {}) {
    this.addBatchVData[cid] = [data, options]
  }

  updateVData (cid, data = {}) {
    this.updateBatchVData.push([cid, data])
  }

  addVm (vm) {
    const id = vm._$id
    const oldVm = this.vms[id]
    if (oldVm) {
      const newId = generateId(oldVm, findParent(oldVm), this.version)
      oldVm._$id = newId
      this.vms[newId] = oldVm
    }
    this.vms[id] = vm
  }

  initVm (vm) {
    vm._$id = generateId(vm, findParent(vm), this.version)
    let vData = this.addBatchVData[vm._$id]
    if (!vData) {
      console.error('cid unmatched', vm)
      vData = [{}, {}]
    } else {
      delete this.addBatchVData[vm._$id]
    }
    const [data, options] = vData
    Object.assign(vm.$options, options)
    vm.$r = data || Object.create(null)
    this.addVm(vm)
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
    if (process.env.NODE_ENV !== 'production') {
      if (Object.keys(this.addBatchVData).length) {
        console.error('this.addBatchVData...=' + JSON.stringify(this.addBatchVData))
      }
    }
    this.addBatchVData = Object.create(null)
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
