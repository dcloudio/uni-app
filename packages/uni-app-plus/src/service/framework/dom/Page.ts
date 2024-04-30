import { queuePostFlushCb } from 'vue'
import { isPlainObject } from '@vue/shared'
import {
  ACTION_TYPE_ADD_EVENT,
  ACTION_TYPE_ADD_WXS_EVENT,
  ACTION_TYPE_CREATE,
  ACTION_TYPE_INSERT,
  ACTION_TYPE_PAGE_CREATE,
  ACTION_TYPE_PAGE_CREATED,
  ACTION_TYPE_PAGE_SCROLL,
  ACTION_TYPE_REMOVE,
  ACTION_TYPE_REMOVE_ATTRIBUTE,
  ACTION_TYPE_REMOVE_EVENT,
  ACTION_TYPE_SET_ATTRIBUTE,
  ACTION_TYPE_SET_TEXT,
  type CreateAction,
  type IUniPageNode,
  NODE_TYPE_PAGE,
  ON_PAGE_SCROLL,
  ON_REACH_BOTTOM,
  type PageAction,
  type PageCreateAction,
  type PageCreatedAction,
  type PageNodeOptions,
  type PageScrollAction,
  type UniBaseNode,
  type UniEvent,
  UniNode,
  type UniNodeJSON,
  formatLog,
} from '@dcloudio/uni-shared'

import {
  ACTION_MINIFY,
  ACTION_TYPE_DICT,
  type DictAction,
  type Dictionary,
  VD_SYNC,
  type Value,
} from '../../../constants'
import { getPageById } from '../page/getCurrentPages'

export default class UniPageNode extends UniNode implements IUniPageNode {
  pageId: number
  private _id: number = 1
  private _created: boolean = false
  private _updating: boolean = false
  private options: PageNodeOptions
  private createAction: PageCreateAction
  private createdAction: PageCreatedAction
  private scrollAction?: PageScrollAction
  private _createActionMap = new Map<number, CreateAction>()
  public updateActions: (PageAction | DictAction)[] = []

  public dicts: Dictionary = []

  public normalizeDict: (
    value: unknown,
    normalizeValue?: boolean
  ) => any | number

  public isUnmounted: boolean

  private _update: () => void

  constructor(
    pageId: number,
    options: PageNodeOptions,
    setup: boolean = false
  ) {
    super(NODE_TYPE_PAGE, '#page', null as unknown as IUniPageNode)
    this.nodeId = 0
    this.pageId = pageId
    this.pageNode = this
    this.options = options

    this.isUnmounted = false

    this.createAction = [ACTION_TYPE_PAGE_CREATE, options]
    this.createdAction = [ACTION_TYPE_PAGE_CREATED]

    this.normalizeDict = this._normalizeDict.bind(this)

    this._update = this.update.bind(this)

    setup && this.setup()
  }
  _normalizeDict(value: unknown, normalizeValue: boolean = true) {
    if (!ACTION_MINIFY) {
      return value
    }
    if (!isPlainObject(value)) {
      return this.addDict(value as Value)
    }
    const dictArray: [number, number][] = []
    Object.keys(value).forEach((n) => {
      const dict = [this.addDict(n) as number]
      const v = value[n as keyof typeof value] as Value
      if (normalizeValue) {
        dict.push(this.addDict(v) as number)
      } else {
        dict.push(v as number)
      }
      dictArray.push(dict as [number, number])
    })
    return dictArray
  }
  addDict<T extends Value>(value: T): T | number {
    if (!ACTION_MINIFY) {
      return value
    }
    const { dicts } = this
    const index = dicts.indexOf(value)
    if (index > -1) {
      return index
    }
    return dicts.push(value) - 1
  }
  onInjectHook(hook: string) {
    if (
      (hook === ON_PAGE_SCROLL || hook === ON_REACH_BOTTOM) &&
      !this.scrollAction
    ) {
      this.scrollAction = [
        ACTION_TYPE_PAGE_SCROLL,
        this.options.onReachBottomDistance,
      ]
      this.push(this.scrollAction)
    }
  }
  onCreate(thisNode: UniNode, nodeName: string | number) {
    pushCreateAction(this, thisNode.nodeId!, nodeName)
    return thisNode
  }
  onInsertBefore(
    thisNode: UniNode,
    newChild: UniNode,
    refChild: UniNode | null
  ) {
    pushInsertAction(
      this,
      newChild as UniBaseNode,
      thisNode.nodeId!,
      (refChild && refChild.nodeId!) || -1
    )
    return newChild
  }
  onRemoveChild(oldChild: UniNode) {
    pushRemoveAction(this, oldChild.nodeId!)
    return oldChild
  }
  onAddEvent(thisNode: UniNode, name: string, flag: number) {
    if (thisNode.parentNode) {
      pushAddEventAction(this, thisNode.nodeId!, name, flag)
    }
  }
  onAddWxsEvent(
    thisNode: UniNode,
    name: string,
    wxsEvent: string,
    flag: number
  ) {
    if (thisNode.parentNode) {
      pushAddWxsEventAction(this, thisNode.nodeId!, name, wxsEvent, flag)
    }
  }
  onRemoveEvent(thisNode: UniNode, name: string) {
    if (thisNode.parentNode) {
      pushRemoveEventAction(this, thisNode.nodeId!, name)
    }
  }
  onSetAttribute(thisNode: UniNode, qualifiedName: string, value: unknown) {
    if (thisNode.parentNode) {
      pushSetAttributeAction(this, thisNode.nodeId!, qualifiedName, value)
    }
  }
  onRemoveAttribute(thisNode: UniNode, qualifiedName: string) {
    if (thisNode.parentNode) {
      pushRemoveAttributeAction(this, thisNode.nodeId!, qualifiedName)
    }
  }
  onTextContent(thisNode: UniNode, text: string) {
    if (thisNode.parentNode) {
      pushSetTextAction(this, thisNode.nodeId!, text)
    }
  }
  onNodeValue(thisNode: UniNode, val: string | null) {
    if (thisNode.parentNode) {
      pushSetTextAction(this, thisNode.nodeId!, val as string)
    }
  }
  genId() {
    return this._id++
  }
  push(action: PageAction, extras?: unknown) {
    if (this.isUnmounted) {
      if (__DEV__) {
        console.log(formatLog('PageNode', 'push.prevent', action))
      }
      return
    }
    switch (action[0]) {
      case ACTION_TYPE_CREATE:
        this._createActionMap.set(action[1], action)
        break
      case ACTION_TYPE_INSERT:
        const createAction = this._createActionMap.get(action[1])
        if (createAction) {
          createAction[3] = action[2] // parentNodeId
          createAction[4] = action[3] // anchorId
          if (extras) {
            createAction[5] = extras as UniNodeJSON
          }
        } else {
          // 部分手机上，create 和 insert 可能不在同一批次，被分批发送
          if (extras) {
            action[4] = extras as UniNodeJSON
          }
          this.updateActions.push(action)
          // if (__DEV__) {
          //   console.error(formatLog(`Insert`, action, 'not found createAction'))
          // }
        }
        break
    }
    // insert 被合并进 create
    if (action[0] !== ACTION_TYPE_INSERT) {
      this.updateActions.push(action)
    }
    if (!this._updating) {
      this._updating = true
      queuePostFlushCb(this._update)
    }
  }
  restore() {
    this.clear()
    // createAction 需要单独发送，因为 view 层需要现根据 create 来设置 page 的 ready
    this.setup()
    if (this.scrollAction) {
      this.push(this.scrollAction)
    }
    const restoreNode = (node: UniNode) => {
      this.onCreate(node, node.nodeName)
      this.onInsertBefore(node.parentNode!, node, null)
      node.childNodes.forEach((childNode) => {
        restoreNode(childNode)
      })
    }
    this.childNodes.forEach((childNode) => restoreNode(childNode))
    this.push(this.createdAction)
  }
  setup() {
    this.send([this.createAction])
  }
  update() {
    const { dicts, updateActions, _createActionMap } = this
    if (__DEV__) {
      console.log(
        formatLog(
          'PageNode',
          'update',
          updateActions.length,
          _createActionMap.size
        )
      )
    }
    // 首次
    if (!this._created) {
      this._created = true
      updateActions.push(this.createdAction)
    }
    if (updateActions.length) {
      if (dicts.length) {
        updateActions.unshift([ACTION_TYPE_DICT, dicts])
      }
      this.send(updateActions)
    }
    this.clear()
  }
  clear() {
    this.dicts.length = 0
    this.updateActions.length = 0
    this._updating = false
    this._createActionMap.clear()
  }
  send(action: (PageAction | DictAction)[]) {
    UniServiceJSBridge.publishHandler(VD_SYNC, action, this.pageId)
  }
  fireEvent(id: number, evt: UniEvent) {
    const node = findNodeById(id, this)
    if (node) {
      node.dispatchEvent(evt)
    } else if (__DEV__) {
      console.error(formatLog('PageNode', 'fireEvent', id, 'not found', evt))
    }
  }
}
export function getPageNode(pageId: number): UniPageNode | null {
  const page = getPageById(pageId)
  if (!page) return null
  return (page as any).__page_container__ as UniPageNode
}

function findNode(
  name: 'nodeId' | 'nodeName',
  value: string | number,
  uniNode: UniNode | number
): UniNode | null {
  if (typeof uniNode === 'number') {
    uniNode = getPageNode(uniNode) as UniNode
  }
  if (uniNode[name] === value) {
    return uniNode
  }
  const { childNodes } = uniNode
  for (let i = 0; i < childNodes.length; i++) {
    const uniNode = findNode(name, value, childNodes[i])
    if (uniNode) {
      return uniNode
    }
  }
  return null
}

export function findNodeById(nodeId: number, uniNode: UniNode | number) {
  return findNode('nodeId', nodeId, uniNode)
}

export function findNodeByTagName(
  tagName: string,
  uniNode: UniNode | number
): UniNode | null {
  return findNode('nodeName', tagName.toUpperCase(), uniNode)
}

function pushCreateAction(
  pageNode: UniPageNode,
  nodeId: number,
  nodeName: string | number
) {
  pageNode.push([
    ACTION_TYPE_CREATE,
    nodeId,
    pageNode.addDict(nodeName),
    -1,
    -1,
  ])
}

function pushInsertAction(
  pageNode: UniPageNode,
  newChild: UniBaseNode,
  parentNodeId: number,
  refChildId: number
) {
  const nodeJson = newChild.toJSON({
    attr: true,
    normalize: pageNode.normalizeDict,
  })
  pageNode.push(
    [ACTION_TYPE_INSERT, newChild.nodeId!, parentNodeId, refChildId],
    Object.keys(nodeJson).length ? nodeJson : undefined
  )
}

function pushRemoveAction(pageNode: UniPageNode, nodeId: number) {
  pageNode.push([ACTION_TYPE_REMOVE, nodeId])
}

function pushAddEventAction(
  pageNode: UniPageNode,
  nodeId: number,
  name: string,
  value: number
) {
  pageNode.push([ACTION_TYPE_ADD_EVENT, nodeId, pageNode.addDict(name), value])
}

function pushAddWxsEventAction(
  pageNode: UniPageNode,
  nodeId: number,
  name: string,
  wxsEvent: string,
  value: number
) {
  pageNode.push([
    ACTION_TYPE_ADD_WXS_EVENT,
    nodeId,
    pageNode.addDict(name),
    pageNode.addDict(wxsEvent),
    value,
  ])
}

function pushRemoveEventAction(
  pageNode: UniPageNode,
  nodeId: number,
  name: string
) {
  pageNode.push([ACTION_TYPE_REMOVE_EVENT, nodeId, pageNode.addDict(name)])
}

function normalizeAttrValue(
  pageNode: UniPageNode,
  name: string,
  value: unknown
) {
  return name === 'style' && isPlainObject(value)
    ? pageNode.normalizeDict(value)
    : pageNode.addDict(value as Value)
}

function pushSetAttributeAction(
  pageNode: UniPageNode,
  nodeId: number,
  name: string,
  value: unknown
) {
  pageNode.push([
    ACTION_TYPE_SET_ATTRIBUTE,
    nodeId,
    pageNode.addDict(name),
    normalizeAttrValue(pageNode, name, value),
  ])
}

function pushRemoveAttributeAction(
  pageNode: UniPageNode,
  nodeId: number,
  name: string
) {
  pageNode.push([ACTION_TYPE_REMOVE_ATTRIBUTE, nodeId, pageNode.addDict(name)])
}

function pushSetTextAction(
  pageNode: UniPageNode,
  nodeId: number,
  text: string
) {
  pageNode.push([ACTION_TYPE_SET_TEXT, nodeId, pageNode.addDict(text)])
}

export function createPageNode(
  pageId: number,
  pageOptions: PageNodeOptions,
  setup?: boolean
) {
  return new UniPageNode(pageId, pageOptions, setup)
}
