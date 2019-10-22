import {
  isFn,
  noop
} from 'uni-shared'

import {
  VD_SYNC,
  UI_EVENT,
  PAGE_CREATED
} from '../../../constants'

import {
  vdSyncCallbacks,
  removeVdSync,
  registerVdSync
} from '../subscribe-handlers'

const handleVdData = {
  [UI_EVENT]: function onUIEvent (vdBatchEvent, vd) {
    vdBatchEvent.forEach(([cid, nid, event]) => {
      nid = String(nid)
      console.log(`[EVENT]`, cid, nid, event)
      event.preventDefault = noop
      event.stopPropagation = noop
      const target = vd.elements.find(target => target.cid === cid && target.nid === nid)
      if (!target) {
        return console.error(`event handler[${cid}][${nid}] not found`)
      }
      target.dispatchEvent(event.type, event)
    })
  }
}

function onVdSync (vdBatchData, vd) {
  vdBatchData.forEach(([type, vdData]) => {
    handleVdData[type](vdData, vd)
  })
}

export class VDomSync {
  constructor (pageId, pagePath) {
    this.pageId = pageId
    this.pagePath = pagePath
    this.batchData = []
    this.vms = Object.create(null)
    this.initialized = false

    this.elements = [] //  目前仅存储事件 element

    this._init()
  }

  _init () {
    registerVdSync(this.pageId, (vdBatchData) => {
      onVdSync(vdBatchData, this)
    })
  }

  addMountedVm (vm) {
    vm._$mounted() // 触发vd数据同步
    this.addVdSyncCallback(function mounted () {
      vm.__call_hook('mounted')
    })
  }

  addUpdatedVm (vm) {
    vm._$updated() // 触发vd数据同步
    this.addVdSyncCallback(function mounted () {
      vm.__call_hook('updated')
    })
  }

  addVdSyncCallback (callback) {
    isFn(callback) && vdSyncCallbacks.push(callback)
  }

  getVm (id) {
    return this.vms[id]
  }

  addVm (vm) {
    this.vms[vm._$id] = vm
  }

  removeVm (vm) {
    delete this.vms[vm._$id]
  }

  addElement (elm) {
    this.elements.indexOf(elm) === -1 && this.elements.push(elm)
  }

  removeElement (elm) {
    const elmIndex = this.elements.indexOf(elm)
    if (elmIndex === -1) {
      return console.error(`removeElement[${elm.cid}][${elm.nid}] not found`)
    }
    this.elements.splice(elmIndex, 1)
  }

  push (type, cid, data) {
    this.batchData.push([type, [cid, data]])
  }

  flush () {
    if (!this.initialized) {
      this.initialized = true
      this.batchData.push([PAGE_CREATED, [this.pageId, this.pagePath]])
    }
    if (this.batchData.length) {
      UniServiceJSBridge.publishHandler(VD_SYNC, {
        data: this.batchData,
        options: {
          timestamp: Date.now()
        }
      }, [this.pageId])
      this.batchData.length = 0
    }
  }

  destroy () {
    this.batchData.length = 0
    this.vms = Object.create(null)
    this.initialized = false
    this.elements.length = 0
    removeVdSync(this.pageId)
  }
}
