import {
  UniNode,
  NODE_TYPE_PAGE,
  UniBaseNode,
  IUniPageNode,
} from '@dcloudio/uni-shared'

const BRIDGE_NODE_SYNC = 'nodeSync'

const ACTION_TYPE_PAGE_CREATE = 1
const ACTION_TYPE_PAGE_CREATED = 2
export const ACTION_TYPE_CREATE = 3
export const ACTION_TYPE_INSERT = 4
export const ACTION_TYPE_REMOVE = 5
export const ACTION_TYPE_SET_ATTRIBUTE = 6
export const ACTION_TYPE_REMOVE_ATTRIBUTE = 7
export const ACTION_TYPE_SET_TEXT = 8

export interface PageNodeOptions {
  version: number
  locale: string
  disableScroll: boolean
  onPageScroll: boolean
  onPageReachBottom: boolean
  onReachBottomDistance: number
  statusbarHeight: number
  windowTop: number
  windowBottom: number
}

interface PageCreateData extends PageNodeOptions {}

type PageCreateAction = [typeof ACTION_TYPE_PAGE_CREATE, PageCreateData]
type PageCreatedAction = [typeof ACTION_TYPE_PAGE_CREATED]

export type CreateAction = [
  typeof ACTION_TYPE_CREATE,
  number, // nodeId
  string | number //nodeName
]

export type InsertAction = [
  typeof ACTION_TYPE_INSERT,
  number, // nodeId
  number, // parentNodeId
  number, // index
  Record<string, any> // Element JSON
]

export type RemoveAction = [
  typeof ACTION_TYPE_REMOVE,
  number, // nodeId
  number // parentNodeId
]

export type SetAttributeAction = [
  typeof ACTION_TYPE_SET_ATTRIBUTE,
  number, // nodeId
  string, // attribute name
  unknown // attribute value
]
export type RemoveAttributeAction = [
  typeof ACTION_TYPE_REMOVE_ATTRIBUTE,
  number, // nodeId
  string // attribute name
]

export type SetTextAction = [
  typeof ACTION_TYPE_SET_TEXT,
  number, // nodeId
  string // text content
]

type PageUpdateAction =
  | CreateAction
  | InsertAction
  | RemoveAction
  | SetAttributeAction
  | RemoveAttributeAction
  | SetTextAction

export type PageAction = PageCreateAction | PageCreatedAction | PageUpdateAction

export default class UniPageNode extends UniNode implements IUniPageNode {
  pageId: number
  private _id: number = 1
  private createAction: PageCreateAction
  private createdAction: PageCreatedAction
  public updateActions: PageAction[] = []
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
  }
  restore() {
    this.push(this.createAction)
    // TODO restore children
    this.push(this.createdAction)
  }
  setup() {
    this.send([this.createAction])
  }
  mounted() {
    const { updateActions, createdAction } = this
    updateActions.unshift(createdAction)
    this.update()
  }
  update() {
    const { updateActions } = this
    if (updateActions.length) {
      this.send(updateActions)
      updateActions.length = 0
    }
  }
  send(action: PageAction[]) {
    UniServiceJSBridge.publishHandler(BRIDGE_NODE_SYNC, action, this.pageId)
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
