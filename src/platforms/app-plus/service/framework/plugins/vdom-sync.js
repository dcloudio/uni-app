import {
  isFn
} from 'uni-shared'

import {
  PAGE_CREATED,
  VD_SYNC_CALLBACK
} from '../../../constants'

import {
  removeWebviewUIEvent,
  registerWebviewUIEvent
} from '../subscribe-handlers'

function noop() {}

const callbacks = [] // 数据同步 callback

export class VDomSync {
  constructor(pageId, pagePath) {
    this.pageId = pageId
    this.pagePath = pagePath
    this.batchData = []
    this.vms = Object.create(null)
    this.initialized = false
    // 事件
    this.handlers = Object.create(null)

    this._init()
  }

  _init() {
    UniServiceJSBridge.subscribe(VD_SYNC_CALLBACK, () => {
      const copies = callbacks.slice(0)
      callbacks.length = 0
      for (let i = 0; i < copies.length; i++) {
        copies[i]()
      }
    })

    registerWebviewUIEvent(this.pageId, (cid, nid, event) => {
      console.log(`[EVENT]`, cid, nid, event)
      event.preventDefault = noop
      event.stopPropagation = noop
      if (
        this.handlers[cid] &&
        this.handlers[cid][nid] &&
        this.handlers[cid][nid][event.type]
      ) {
        this.handlers[cid][nid][event.type].forEach(handler => {
          handler(event)
        })
      } else {
        console.error(`event handler[${cid}][${nid}][${event.type}] not found`)
      }
    })
  }

  addMountedVm(vm) {
    vm._$mounted() // 触发vd数据同步
    this.addCallback(function mounted() {
      vm.__call_hook('mounted')
    })
  }

  addUpdatedVm(vm) {
    vm._$updated() // 触发vd数据同步
    this.addCallback(function mounted() {
      vm.__call_hook('updated')
    })
  }

  addCallback(callback) {
    isFn(callback) && callbacks.push(callback)
  }

  getVm(id) {
    return this.vms[id]
  }

  addVm(vm) {
    this.vms[vm._$id] = vm
  }

  removeVm(vm) {
    delete this.vms[vm._$id]
  }

  addEvent(cid, nid, name, handler) {
    const cHandlers = this.handlers[cid] || (this.handlers[cid] = Object.create(null))
    const nHandlers = cHandlers[nid] || (cHandlers[nid] = Object.create(null));
    (nHandlers[name] || (nHandlers[name] = [])).push(handler)
  }

  removeEvent(cid, nid, name, handler) {
    const cHandlers = this.handlers[cid] || (this.handlers[cid] = Object.create(null))
    const nHandlers = cHandlers[nid] || (cHandlers[nid] = Object.create(null))
    const eHandlers = nHandlers[name]
    if (Array.isArray(eHandlers)) {
      const index = eHandlers.indexOf(handler)
      if (index !== -1) {
        eHandlers.splice(index, 1)
      }
    }
  }

  push(type, nodeId, data) {
    this.batchData.push([type, [nodeId, data]])
  }

  flush() {
    if (!this.initialized) {
      this.initialized = true
      this.batchData.push([PAGE_CREATED, [this.pageId, this.pagePath]])
    }
    if (this.batchData.length) {
      UniServiceJSBridge.publishHandler('vdSync', {
        data: this.batchData,
        options: {
          timestamp: Date.now()
        }
      }, [this.pageId])
      this.batchData.length = 0
    }
  }

  destroy() {
    this.batchData.length = 0
    this.vms = Object.create(null)
    this.initialized = false
    this.handlers = Object.create(null)
    removeWebviewUIEvent(this.pageId)
  }
}
