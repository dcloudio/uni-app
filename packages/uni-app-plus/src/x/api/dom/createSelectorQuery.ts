import type { SelectorQueryRequest } from '@dcloudio/uni-api'
import type {
  CreateSelectorQuery,
  NodesRef,
  SelectorQuery,
  SelectorQueryNodeInfoCallback,
  NodeField as _NodeField,
  NodeInfo as _NodeInfo,
} from '@dcloudio/uni-app-x/types/uni'
import { getCurrentPage } from '@dcloudio/uni-core'
import type { ComponentPublicInstance, VNode } from 'vue'

type NodeInfo = Partial<
  _NodeInfo & {
    node: UniElement
  }
>

type NodeField = _NodeField & {
  node?: boolean
}

export function isVueComponent(comp: any) {
  const has$instance = typeof comp.$ === 'object'
  const has$el = typeof comp.$el === 'object'

  return has$instance && has$el
}

const isFunction = (val: any): val is Function => typeof val === 'function'

class NodesRefImpl implements NodesRef {
  private _selectorQuery: SelectorQueryImpl
  private _component: ComponentPublicInstance | null
  private _selector: string
  /** single=true querySelector */
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
    callback: SelectorQueryNodeInfoCallback | null
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

  /**
   * fields({node:true})
   */
  node(_callback: (result: any) => void): SelectorQuery {
    this._selectorQuery._push(
      this._selector,
      this._component,
      this._single,
      {
        node: true,
      } as NodeField,
      _callback
    )
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

/**
 * QuerySelectorHelper
 */
class QuerySelectorHelper {
  _element: UniElement
  _commentStartVNode: VNode | undefined
  _fields: NodeField

  constructor(
    element: UniElement,
    vnode: VNode | undefined,
    fields: NodeField
  ) {
    this._element = element
    this._commentStartVNode = vnode
    this._fields = fields
  }

  /**
   * entry
   */
  static queryElement(
    element: UniElement,
    selector: string,
    all: boolean,
    vnode: VNode | undefined,
    fields: NodeField
  ): any | null {
    return new QuerySelectorHelper(element, vnode, fields).query(selector, all)
  }

  /**
   * 执行查询
   * @param selector 选择器
   * @param all 是否查询所有 selectAll
   * @returns
   */
  query(selector: string, all: boolean): any | null {
    if (this._element.nodeName == '#comment') {
      return this.queryFragment(this._element, selector, all)
    } else {
      return all
        ? this.querySelectorAll(this._element, selector)
        : this.querySelector(this._element, selector)
    }
  }

  queryFragment(el: UniElement, selector: string, all: boolean): any | null {
    let current = el.nextSibling
    if (current == null) {
      return null
    }

    if (all) {
      const result1: Array<NodeInfo> = []
      while (true) {
        const queryResult = this.querySelectorAll(current!, selector)
        if (queryResult != null) {
          result1.push(...queryResult)
        }
        current = current.nextSibling
        if (current == null || this._commentStartVNode!.anchor == current) {
          break
        }
      }
      return result1
    } else {
      let result2: NodeInfo | null = null
      while (true) {
        result2 = this.querySelector(current!, selector)
        current = current.nextSibling
        if (
          result2 != null ||
          current == null ||
          this._commentStartVNode!.anchor == current
        ) {
          break
        }
      }
      return result2
    }
  }

  querySelector(element: UniElement, selector: string): NodeInfo | null {
    let element2 = this.querySelf(element, selector)
    if (element2 == null) {
      element2 = element.querySelector(selector)
    }
    // 查询到元素，查询 nodeInfo
    if (element2 != null) {
      return this.getNodeInfo(element2)
    }
    return null
  }

  querySelectorAll(
    element: UniElement,
    selector: string
  ): Array<NodeInfo> | null {
    const nodesInfoArray: Array<NodeInfo> = []
    const element2 = this.querySelf(element, selector)
    if (element2 != null) {
      nodesInfoArray.push(this.getNodeInfo(element))
    }
    const findNodes = element.querySelectorAll(selector)
    findNodes?.forEach((el: UniElement) => {
      nodesInfoArray.push(this.getNodeInfo(el))
    })
    return nodesInfoArray
  }

  querySelf(element: UniElement | null, selector: string): UniElement | null {
    if (element == null || selector.length < 2) {
      return null
    }

    const selectorType = selector.charAt(0)
    const selectorName = selector.slice(1)
    if (selectorType == '.' && element.classList.includes(selectorName)) {
      return element
    }
    if (selectorType == '#' && element.getAttribute('id') == selectorName) {
      return element
    }
    if (selector.toUpperCase() == element.nodeName.toUpperCase()) {
      return element
    }

    return null
  }

  /**
   * 查询元素信息
   * @param element
   * @returns
   */
  getNodeInfo(element: UniElement): NodeInfo {
    if (this._fields.node == true) {
      const nodeInfo: NodeInfo = {
        node: element,
      }

      if (this._fields.size == true) {
        const rect = element.getBoundingClientRect()
        nodeInfo.width = rect.width
        nodeInfo.height = rect.height
      }
      return nodeInfo
    }

    const rect = element.getBoundingClientRect()
    const nodeInfo = {
      id: element.getAttribute('id')?.toString(),
      dataset: null,
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      width: rect.width,
      height: rect.height,
    }
    return nodeInfo
  }
}

/**
 * requestComponentInfo
 * @param vueComponent
 * @param queue
 * @param callback
 */
function requestComponentInfo(
  vueComponent: ComponentPublicInstance | null,
  queue: Array<SelectorQueryRequest>,
  callback: any
) {
  const result: Array<any> = []
  const el = vueComponent?.$el
  if (el != null) {
    // 执行待查询 queue
    queue.forEach((item: SelectorQueryRequest) => {
      const queryResult = QuerySelectorHelper.queryElement(
        el,
        item.selector,
        !item.single,
        vueComponent?.$.subTree,
        item.fields
      )
      if (queryResult != null) {
        result.push(queryResult)
      }
    })
  }
  callback(result)
}

/**
 * createSelectorQuery
 */
export const createSelectorQuery: CreateSelectorQuery =
  function (): SelectorQuery {
    const instance = getCurrentPage() as ComponentPublicInstance
    return new SelectorQueryImpl(instance)
  }
