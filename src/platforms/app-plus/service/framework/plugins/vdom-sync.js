import {
  PAGE_CREATED
} from '../../../constants'

import {
  removeWebviewUIEvent,
  registerWebviewUIEvent
} from '../subscribe-handlers'

export class VDomSync {
  constructor (pageId, pagePath) {
    this.pageId = pageId
    this.pagePath = pagePath
    this.batchData = []
    this.vms = Object.create(null)
    this.initialized = false
    // 事件
    this.handlers = Object.create(null)

    this._init()
  }

  _init () {
    registerWebviewUIEvent(this.pageId, (cid, nid, event) => {
      console.log(`[EVENT]`, cid, nid, event)
      if (
        this.handlers[cid] &&
        this.handlers[cid][nid] &&
        this.handlers[cid][nid][event.type]
      ) {
        this.handlers[cid][nid][event.type].forEach(handler => {
          handler(event)
        })
      }
    })
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

  addEvent (cid, nid, name, handler) {
    const cHandlers = this.handlers[cid] || (this.handlers[cid] = Object.create(null))
    const nHandlers = cHandlers[nid] || (cHandlers[nid] = Object.create(null));
    (nHandlers[name] || (nHandlers[name] = [])).push(handler)
  }

  removeEvent (cid, nid, name, handler) {
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

  push (type, nodeId, data) {
    this.batchData.push([type, [nodeId, data]])
  }

  flush () {
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

  destroy () {
    this.batchData.length = 0
    this.vms = Object.create(null)
    this.initialized = false
    this.handlers = Object.create(null)
    removeWebviewUIEvent(this.pageId)
  }
}
