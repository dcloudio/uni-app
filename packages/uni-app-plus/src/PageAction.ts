import { onNodeCreate } from './view/framework/subscriber/vdom/onNodeCreate'
import { onNodeInsert } from './view/framework/subscriber/vdom/onNodeInsert'
import { onNodeRemove } from './view/framework/subscriber/vdom/onNodeRemove'
import { onNodeRemoveAttr } from './view/framework/subscriber/vdom/onNodeRemoveAttr'
import { onNodeSetAttr } from './view/framework/subscriber/vdom/onNodeSetAttr'
import { onNodeSetText } from './view/framework/subscriber/vdom/onNodeSetText'

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
  ...Parameters<typeof onNodeCreate>
]

export type InsertAction = [
  typeof ACTION_TYPE_INSERT,
  ...Parameters<typeof onNodeInsert>
]

export type RemoveAction = [
  typeof ACTION_TYPE_REMOVE,
  ...Parameters<typeof onNodeRemove>
]

export type SetAttributeAction = [
  typeof ACTION_TYPE_SET_ATTRIBUTE,
  ...Parameters<typeof onNodeSetAttr>
]

export type RemoveAttributeAction = [
  typeof ACTION_TYPE_REMOVE_ATTRIBUTE,
  ...Parameters<typeof onNodeRemoveAttr>
]

export type SetTextAction = [
  typeof ACTION_TYPE_SET_TEXT,
  ...Parameters<typeof onNodeSetText>
]

export type PageUpdateAction =
  | CreateAction
  | InsertAction
  | RemoveAction
  | SetAttributeAction
  | RemoveAttributeAction
  | SetTextAction

export type PageAction = PageCreateAction | PageCreatedAction | PageUpdateAction
