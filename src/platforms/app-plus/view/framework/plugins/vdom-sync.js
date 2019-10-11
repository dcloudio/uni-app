import {
  guid
} from 'uni-shared'

export class VDomSync {
  constructor (pageId) {
    this.pageId = pageId
    this.addVDatas = []
    this.updateVDatas = []
    this.vms = Object.create(null)
  }

  addVData (nodeId, data = {}) {
    this.addVDatas.push([nodeId, data])
  }

  updateVData (nodeId, data = {}) {
    this.updateVDatas.push([nodeId, data])
  }

  initVm (vm) {
    const [nodeId, data] = this.addVDatas.pop()
    if (!nodeId) {
      vm._$id = guid()
      console.error('nodeId unmatched', vm)
    } else {
      vm._$id = nodeId
    }
    vm.$r = data || Object.create(null)
    this.vms[vm._$id] = vm
  }

  flush () {
    console.log('update....', this.addVDatas, this.updateVDatas)
    this.updateVDatas.forEach(([nodeId, data]) => {
      const vm = this.vms[nodeId]
      if (!vm) {
        return console.error(`Not found ${nodeId}`)
      }
      Object.assign(vm.$r, data)
      vm.$forceUpdate()
    })
    this.updateVDatas.length = 0
  }
}
