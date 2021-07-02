export const ACTION_TYPE_PAGE_CREATE = 1
export const ACTION_TYPE_PAGE_CREATED = 2
export const ACTION_TYPE_CREATE = 3
export const ACTION_TYPE_INSERT = 4
export const ACTION_TYPE_REMOVE = 5
export const ACTION_TYPE_SET_ATTRIBUTE = 6
export const ACTION_TYPE_REMOVE_ATTRIBUTE = 7
export const ACTION_TYPE_SET_TEXT = 8

export interface PageNodeOptions {
  route: string
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

export interface PageCreateData extends PageNodeOptions {}

export type PageCreateAction = [typeof ACTION_TYPE_PAGE_CREATE, PageCreateData]
export type PageCreatedAction = [typeof ACTION_TYPE_PAGE_CREATED]

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

export type PageUpdateAction =
  | CreateAction
  | InsertAction
  | RemoveAction
  | SetAttributeAction
  | RemoveAttributeAction
  | SetTextAction

export type PageAction = PageCreateAction | PageCreatedAction | PageUpdateAction
