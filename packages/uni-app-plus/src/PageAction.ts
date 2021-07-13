import { onNodeEvent } from './service/framework/dom/onNodeEvent'
import { createElement } from './view/framework/dom/page'
import { UniElement } from './view/framework/dom/elements/UniElement'

export const ACTION_TYPE_PAGE_CREATE = 1
export const ACTION_TYPE_PAGE_CREATED = 2
export const ACTION_TYPE_CREATE = 3
export const ACTION_TYPE_INSERT = 4
export const ACTION_TYPE_REMOVE = 5
export const ACTION_TYPE_SET_ATTRIBUTE = 6
export const ACTION_TYPE_REMOVE_ATTRIBUTE = 7
export const ACTION_TYPE_ADD_EVENT = 8
export const ACTION_TYPE_REMOVE_EVENT = 9
export const ACTION_TYPE_SET_TEXT = 10

export const ACTION_TYPE_EVENT = 20

export interface PageNodeOptions {
  css: boolean
  route: string
  version: number
  locale: string
  platform: string
  pixelRatio: number
  windowWidth: number
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

export type EventAction = [
  typeof ACTION_TYPE_EVENT,
  Parameters<typeof onNodeEvent>[0],
  Parameters<typeof onNodeEvent>[1]
]

export type CreateAction = [
  typeof ACTION_TYPE_CREATE,
  ...Parameters<typeof createElement>
]

type NodeAction<T extends Parameters<any>> = [/* nodeId */ number, ...T]

export type InsertAction = [
  typeof ACTION_TYPE_INSERT,
  ...NodeAction<Parameters<UniElement<any>['insert']>>
]

export type RemoveAction = [
  typeof ACTION_TYPE_REMOVE,
  ...NodeAction<Parameters<UniElement<any>['remove']>>
]

export type AddEventAction = [
  typeof ACTION_TYPE_ADD_EVENT,
  ...NodeAction<Parameters<UniElement<any>['addEvent']>>
]

export type RemoveEventAction = [
  typeof ACTION_TYPE_REMOVE_EVENT,
  ...NodeAction<Parameters<UniElement<any>['removeEvent']>>
]

export type SetAttributeAction = [
  typeof ACTION_TYPE_SET_ATTRIBUTE,
  ...NodeAction<Parameters<UniElement<any>['setAttr']>>
]

export type RemoveAttributeAction = [
  typeof ACTION_TYPE_REMOVE_ATTRIBUTE,
  ...NodeAction<Parameters<UniElement<any>['removeAttr']>>
]

export type SetTextAction = [
  typeof ACTION_TYPE_SET_TEXT,
  ...NodeAction<Parameters<UniElement<any>['setText']>>
]

export type PageUpdateAction =
  | CreateAction
  | InsertAction
  | RemoveAction
  | AddEventAction
  | RemoveEventAction
  | SetAttributeAction
  | RemoveAttributeAction
  | SetTextAction

export type PageAction = PageCreateAction | PageCreatedAction | PageUpdateAction
