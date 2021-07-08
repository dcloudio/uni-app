import { queuePostFlushCb } from 'vue'
import {
  UniNode,
  NODE_TYPE_PAGE,
  UniBaseNode,
  IUniPageNode,
  formatLog,
  UniEvent,
} from '@dcloudio/uni-shared'
import {
  PageCreateAction,
  PageCreatedAction,
  PageAction,
  PageNodeOptions,
  ACTION_TYPE_CREATE,
  ACTION_TYPE_INSERT,
  ACTION_TYPE_REMOVE,
  ACTION_TYPE_SET_ATTRIBUTE,
  ACTION_TYPE_REMOVE_ATTRIBUTE,
  ACTION_TYPE_SET_TEXT,
  ACTION_TYPE_PAGE_CREATE,
  ACTION_TYPE_PAGE_CREATED,
} from '../../../PageAction'
import { VD_SYNC } from '../../../constants'

export default class UniPageNode extends UniNode implements IUniPageNode {
  pageId: number
  private _id: number = 1
  private _created: boolean = false
  private createAction: PageCreateAction
  private createdAction: PageCreatedAction
  public updateActions: PageAction[] = []

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

    this.isUnmounted = false

    this.createAction = [ACTION_TYPE_PAGE_CREATE, options]
    this.createdAction = [ACTION_TYPE_PAGE_CREATED]

    this._update = this.update.bind(this)

    setup && this.setup()
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
  push(action: PageAction) {
    if (this.isUnmounted) {
      if (__DEV__) {
        console.log(formatLog('PageNode', 'push.prevent', action))
      }
      return
    }
    this.updateActions.push(action)
    if (__DEV__) {
      console.log(formatLog('PageNode', 'push', action))
    }
    queuePostFlushCb(this._update)
  }
  restore() {
    this.push(this.createAction)
    // TODO restore children
    this.push(this.createdAction)
  }
  setup() {
    this.send([this.createAction])
  }
  update() {
    const { updateActions } = this
    if (__DEV__) {
      console.log(formatLog('PageNode', 'update', updateActions.length))
    }
    // 首次
    if (!this._created) {
      this._created = true
      updateActions.push(this.createdAction)
    }
    if (updateActions.length) {
      this.send(updateActions)
      updateActions.length = 0
    }
  }
  send(action: PageAction[]) {
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

function findNodeById(id: number, uniNode: UniNode): UniNode | null {
  if (uniNode.nodeId === id) {
    return uniNode
  }
  const { childNodes } = uniNode
  for (let i = 0; i < childNodes.length; i++) {
    const uniNode = findNodeById(id, childNodes[i])
    if (uniNode) {
      return uniNode
    }
  }
  return null
}

function pushCreateAction(
  pageNode: UniPageNode,
  nodeId: number,
  nodeName: string | number
) {
  pageNode.push([ACTION_TYPE_CREATE, nodeId, nodeName])
}

function pushInsertAction(
  pageNode: UniPageNode,
  newChild: UniBaseNode,
  parentNodeId: number,
  refChildId: number
) {
  pageNode.push([
    ACTION_TYPE_INSERT,
    newChild.nodeId!,
    parentNodeId,
    refChildId,
    newChild.toJSON({ attr: true }),
  ])
}

function pushRemoveAction(pageNode: UniPageNode, nodeId: number) {
  pageNode.push([ACTION_TYPE_REMOVE, nodeId])
}

function pushSetAttributeAction(
  pageNode: UniPageNode,
  nodeId: number,
  name: string,
  value: unknown
) {
  pageNode.push([ACTION_TYPE_SET_ATTRIBUTE, nodeId, name, value])
}

function pushRemoveAttributeAction(
  pageNode: UniPageNode,
  nodeId: number,
  name: string
) {
  pageNode.push([ACTION_TYPE_REMOVE_ATTRIBUTE, nodeId, name])
}

function pushSetTextAction(
  pageNode: UniPageNode,
  nodeId: number,
  text: string
) {
  pageNode.push([ACTION_TYPE_SET_TEXT, nodeId, text])
}

export function createPageNode(
  pageId: number,
  pageOptions: PageNodeOptions,
  setup?: boolean
) {
  return new UniPageNode(pageId, pageOptions, setup)
}
