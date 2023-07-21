import {
  isFn,
  noop
} from 'uni-shared'

import {
  wrapperMPEvent
} from 'uni-helpers/patch'

import {
  VD_SYNC,
  UI_EVENT,
  PAGE_CREATE,
  PAGE_CREATED,
  MOUNTED_DATA,
  UPDATED_DATA,
  VD_SYNC_VERSION
} from '../../../constants'

import {
  generateId
} from '../../../helpers/util'

import {
  removeVdSync,
  registerVdSync
} from '../subscribe-handlers/on-vd-sync'

import {
  vdSyncCallbacks
} from '../subscribe-handlers/on-vd-sync-callback'

import {
  hookKeyboardEvent
} from './keyboard'

import parseComponentCreateOptions from './parse-component-create-options'

function wrapperEvent (event) {
  event.preventDefault = noop
  event.stopPropagation = noop
  return wrapperMPEvent(event)
}

const handleVdData = {
  [UI_EVENT]: function onUIEvent (vdBatchEvent, vd) {
    vdBatchEvent.forEach(([cid, nid, event]) => {
      nid = String(nid)
      const target = vd.elements.find(target => target.cid === cid && target.nid === nid)
      if (!target) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(`event handler[${cid}][${nid}] not found`)
        }
        return
      }
      const type = event.type
      const mpEvent = wrapperEvent(event)
      if (type === 'focus' || type === 'blur') {
        hookKeyboardEvent(mpEvent, event => {
          target.dispatchEvent(type, event)
        })
      } else {
        target.dispatchEvent(type, mpEvent)
      }
    })
  }
}

function onVdSync (vdBatchData, vd) {
  vdBatchData.forEach(([type, vdData]) => {
    handleVdData[type](vdData, vd)
  })
}

export class VDomSync {
  constructor (pageId, pagePath, pageQuery, pageVm) {
    this.pageId = pageId
    this.pagePath = pagePath
    this.pageQuery = pageQuery
    this.pageVm = pageVm
    this.batchData = []
    this.vms = Object.create(null)
    this.initialized = false

    this.pageCreateData = false

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
    const id = vm._$id
    const oldVm = this.vms[id]
    if (oldVm) {
      const newId = generateId(oldVm, oldVm.$parent, VD_SYNC_VERSION)
      oldVm._$id = newId
      this.vms[newId] = oldVm
      this.elements.forEach(element => {
        const cid = element.cid
        element.cid = cid === id ? newId : cid
      })
    }
    this.vms[id] = vm
  }

  removeVm (vm) {
    const cid = vm._$id
    if (vm === this.vms[cid]) { // 仅相同vm的才移除，否则保留
      // 目前同一位置的vm，cid均一样
      // 移除尚未同步的data
      this.batchData = this.batchData.filter(data => data[1][0] !== cid)
      delete this.vms[cid]
    }
  }

  addElement (elm) {
    this.elements.indexOf(elm) === -1 && this.elements.push(elm)
  }

  removeElement (elm) {
    const elmIndex = this.elements.indexOf(elm)
    if (elmIndex === -1) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`removeElement[${elm.cid}][${elm.nid}] not found`)
      }
      return
    }
    this.elements.splice(elmIndex, 1)
  }

  push (type, cid, data, options) {
    const typeData = [cid, data]
    if (options) {
      typeData.push(options)
    }
    this.batchData.push([type, typeData])
  }

  find (type, cid) {
    return this.batchData.find(data => data[0] === type && data[1][0] === cid)
  }

  sendPageCreate (data) {
    this.pageCreateData = data
    UniServiceJSBridge.publishHandler(VD_SYNC, {
      data: [
        [PAGE_CREATE, data]
      ],
      options: {
        timestamp: Date.now()
      }
    }, [this.pageId])
  }

  flush () {
    if (!this.initialized) {
      this.initialized = true
      this.batchData.push([PAGE_CREATED, [this.pageId, this.pagePath, this.pageQuery]])
    }
    const batchData = this.batchData.filter(data => {
      if (data[0] === UPDATED_DATA && !Object.keys(data[1][1]).length) {
        return false
      }
      return true
    })
    this.batchData.length = 0
    if (batchData.length) {
      UniServiceJSBridge.publishHandler(VD_SYNC, {
        data: batchData,
        options: {
          timestamp: Date.now()
        }
      }, [this.pageId])
    }
  }

  restorePageCreate () {
    this.batchData.push([PAGE_CREATE, this.pageCreateData])
  }

  restoreMountedData () {
    const addMountedData = (vm) => {
      if (vm._$id) {
        this.push(MOUNTED_DATA, vm._$id, vm._$data, parseComponentCreateOptions(vm))
      }
      // TODO vue 中 $children 顺序不可靠，可能存在恢复误差
      vm.$children.forEach(childVm => addMountedData(childVm))
    }
    addMountedData(this.pageVm)
  }

  restorePageCreated () {
    this.batchData.push([PAGE_CREATED, [this.pageId, this.pagePath, this.pageQuery]])
  }

  restore () {
    this.initialized = true
    this.batchData.length = 0

    this.restorePageCreate()
    this.restoreMountedData()
    this.restorePageCreated()

    this.flush()
  }

  destroy () {
    this.batchData.length = 0
    this.vms = Object.create(null)
    this.initialized = false
    this.elements.length = 0
    removeVdSync(this.pageId)
  }
}
