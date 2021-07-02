import { queuePostFlushCb } from 'vue'
import {
  UniNode,
  NODE_TYPE_PAGE,
  UniBaseNode,
  IUniPageNode,
  formatLog,
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
  private createAction: PageCreateAction
  private createdAction: PageCreatedAction
  public updateActions: PageAction[] = []

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

    this.createAction = [ACTION_TYPE_PAGE_CREATE, options]
    this.createdAction = [ACTION_TYPE_PAGE_CREATED]

    this._update = this.update.bind(this)

    setup && this.setup()
  }
  onCreate(thisNode: UniNode, nodeName: string | number) {
    pushCreateAction(this, thisNode.nodeId!, nodeName)
    return thisNode
  }
  onInsertBefore(thisNode: UniNode, newChild: UniNode, index: number) {
    pushInsertAction(this, newChild as UniBaseNode, thisNode.nodeId!, index)
    return newChild
  }
  onRemoveChild(thisNode: UniNode, oldChild: UniNode) {
    pushRemoveAction(this, oldChild.nodeId!, thisNode.nodeId!)
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
  // mounted() {
  //   const { updateActions, createdAction } = this
  //   updateActions.unshift(createdAction)
  //   this.update()
  // }
  update() {
    const { updateActions } = this
    if (__DEV__) {
      console.log(formatLog('PageNode', 'update', updateActions.length))
    }
    if (updateActions.length) {
      this.send(updateActions)
      updateActions.length = 0
    }
  }
  send(action: PageAction[]) {
    UniServiceJSBridge.publishHandler(VD_SYNC, action, this.pageId)
  }
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
  index: number
) {
  pageNode.push([
    ACTION_TYPE_INSERT,
    newChild.nodeId!,
    parentNodeId,
    index,
    newChild.toJSON({ attr: true }),
  ])
}

function pushRemoveAction(
  pageNode: UniPageNode,
  nodeId: number,
  parentNodeId: number
) {
  pageNode.push([ACTION_TYPE_REMOVE, nodeId, parentNodeId])
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
