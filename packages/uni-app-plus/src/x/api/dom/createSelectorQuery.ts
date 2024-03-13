import { SelectorQueryRequest } from '@dcloudio/uni-api'
import {
  CreateSelectorQuery,
  NodeField,
  NodeInfo,
  NodesRef,
  SelectorQuery,
  SelectorQueryNodeInfoCallback,
} from '@dcloudio/uni-app-x/types/uni'
import { getCurrentPage } from '@dcloudio/uni-core'
// import { isFunction } from 'util'
import type { ComponentPublicInstance } from 'vue'
import { isVueComponent } from '../../utils'

const isFunction = (val: any): val is Function => typeof val === 'function'

class NodesRefImpl implements NodesRef {
  private _selectorQuery: SelectorQueryImpl
  private _component: ComponentPublicInstance | null
  private _selector: string
  private _single: boolean
  constructor(
    selectorQuery: SelectorQueryImpl,
    component: ComponentPublicInstance | null,
    selector: string,
    single: boolean
  ) {
    this._selectorQuery = selectorQuery
    this._component = component
    this._selector = selector
    this._single = single
  }

  boundingClientRect(
    callback?: SelectorQueryNodeInfoCallback | null
  ): SelectorQuery {
    const hasArg = callback === null || typeof callback === 'function'
    if (hasArg) {
      this._selectorQuery._push(
        this._selector,
        this._component,
        this._single,
        {
          id: true,
          dataset: true,
          rect: true,
          size: true,
        } as NodeField,
        callback
      )
      return this._selectorQuery
    } else {
      return this.boundingClientRect(null)
    }
  }

  fields(
    fields: NodeField,
    callback: SelectorQueryNodeInfoCallback
  ): SelectorQuery {
    this._selectorQuery._push(
      this._selector,
      this._component,
      this._single,
      fields,
      callback
    )
    return this._selectorQuery
  }

  scrollOffset(callback: SelectorQueryNodeInfoCallback): SelectorQuery {
    this._selectorQuery._push(
      this._selector,
      this._component,
      this._single,
      {
        id: true,
        dataset: true,
        scrollOffset: true,
      } as NodeField,
      callback
    )
    return this._selectorQuery
  }

  context(callback: SelectorQueryNodeInfoCallback): SelectorQuery {
    this._selectorQuery._push(
      this._selector,
      this._component,
      this._single,
      {
        context: true,
      } as NodeField,
      callback
    )
    return this._selectorQuery
  }

  node(_callback: (result: any) => void): SelectorQuery {
    return this._selectorQuery
  }
}

class SelectorQueryImpl implements SelectorQuery {
  private _queue: Array<SelectorQueryRequest>
  private _component: ComponentPublicInstance | null = null
  private _queueCb: Array<SelectorQueryNodeInfoCallback | null>
  private _nodesRef!: NodesRef
  constructor(component: ComponentPublicInstance) {
    this._component = component
    this._queue = []
    this._queueCb = []
  }

  exec(callback?: (result: Array<any>) => void | null): NodesRef | null {
    this._component?.$?.$waitNativeRender(() => {
      requestComponentInfo(this._component, this._queue, (res: Array<any>) => {
        const queueCbs = this._queueCb
        res.forEach((info: any, _index) => {
          const queueCb = queueCbs[_index]
          if (isFunction(queueCb)) {
            queueCb!(info)
          }
        })
        if (callback && isFunction(callback)) {
          callback(res)
        }
      })
    })
    return this._nodesRef
  }

  in(component: any | null): SelectorQuery {
    if (isVueComponent(component)) {
      this._component = component as ComponentPublicInstance
    }
    return this
  }

  select(selector: string): NodesRef {
    this._nodesRef = new NodesRefImpl(this, this._component, selector, true)
    return this._nodesRef
  }

  selectAll(selector: string): NodesRef {
    this._nodesRef = new NodesRefImpl(this, this._component, selector, false)
    return this._nodesRef
  }

  selectViewport(): NodesRef {
    this._nodesRef = new NodesRefImpl(this, null, '', true)
    return this._nodesRef
  }

  _push(
    selector: string,
    component: ComponentPublicInstance | null,
    single: boolean,
    fields: NodeField,
    callback: SelectorQueryNodeInfoCallback | null
  ) {
    this._queue.push({
      component,
      selector,
      single,
      fields,
    } as SelectorQueryRequest)
    this._queueCb.push(callback)
  }
}

function getNodeInfo(node: Element): NodeInfo {
  const rect = node.getBoundingClientRect()
  const nodeInfo = {
    id: node.getAttribute('id')?.toString(),
    dataset: null,
    left: rect.left,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    width: rect.width,
    height: rect.height,
  } as NodeInfo
  return nodeInfo
}

function querySelf(element: Element | null, selector: string): Element | null {
  if (element == null || selector.length < 2) {
    return null
  }

  const selectorType = selector.charAt(0)
  const selectorName = selector.slice(1)
  if (
    selectorType == '.' &&
    Array.from(element!.classList).includes(selectorName)
  ) {
    return element
  }
  if (selectorType == '#' && element!.getAttribute('id') == selectorName) {
    return element
  }
  if (selector.toUpperCase() == element!.nodeName!.toUpperCase()) {
    return element
  }

  return null
}

function requestComponentInfo(
  vueComponent: ComponentPublicInstance | null,
  queue: Array<SelectorQueryRequest>,
  callback: any
) {
  const result: Array<any> = []
  const el = vueComponent?.$el
  if (el != null) {
    queue.forEach((item: SelectorQueryRequest) => {
      if (item.single) {
        let element = querySelf(el, item.selector)
        if (element == null) {
          element = el.querySelector(item.selector)
        }
        if (element != null) {
          result.push(getNodeInfo(element))
        }
      } else {
        const nodesInfo: Array<NodeInfo> = []

        const element = querySelf(el, item.selector)
        if (element != null) {
          nodesInfo.push(getNodeInfo(element))
        }

        const findNodes = el.querySelectorAll(item.selector)
        findNodes?.forEach((node: Element) => {
          nodesInfo.push(getNodeInfo(node))
        })
        result.push(nodesInfo)
      }
    })
  }
  callback(result)
}

export const createSelectorQuery: CreateSelectorQuery =
  function (): SelectorQuery {
    const instance = getCurrentPage() as ComponentPublicInstance
    return new SelectorQueryImpl(instance)
  }
