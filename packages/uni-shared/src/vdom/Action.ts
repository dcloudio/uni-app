import type { UniNodeJSON, UniNodeJSONMinify } from './Node'

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

export const ACTION_TYPE_ADD_WXS_EVENT = 12
export const ACTION_TYPE_PAGE_SCROLL = 15

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

/**
 * nodeId
 * tag
 * parentNodeId
 * refNodeId
 * nodeJson
 */
export type CreateAction = [
  typeof ACTION_TYPE_CREATE,
  number,
  string | number,
  number,
  number,
  Partial<UniNodeJSON | UniNodeJSONMinify>?
]

/**
 * nodeId
 * parentNodeId
 * refNodeId
 * nodeJson
 */
export type InsertAction = [
  typeof ACTION_TYPE_INSERT,
  number,
  number,
  number,
  Partial<UniNodeJSON | UniNodeJSONMinify>?
]

/**
 * nodeId
 */
export type RemoveAction = [typeof ACTION_TYPE_REMOVE, number]

/**
 * nodeId
 * event
 * flag
 */
export type AddEventAction = [
  typeof ACTION_TYPE_ADD_EVENT,
  number,
  string | number,
  number
]

/**
 * nodeId
 * event
 * wxsEvent
 * flag
 */
export type AddWxsEventAction = [
  typeof ACTION_TYPE_ADD_WXS_EVENT,
  number,
  string | number,
  string | number,
  number
]

/**
 * nodeId
 * event
 */
export type RemoveEventAction = [
  typeof ACTION_TYPE_REMOVE_EVENT,
  number,
  string | number
]

/**
 * nodeId
 * name
 * value
 */
export type SetAttributeAction = [
  typeof ACTION_TYPE_SET_ATTRIBUTE,
  number,
  string | number,
  unknown | number
]

/**
 * nodeId
 * name
 */
export type RemoveAttributeAction = [
  typeof ACTION_TYPE_REMOVE_ATTRIBUTE,
  number,
  string | number
]

/**
 * nodeId
 * text
 */
export type SetTextAction = [
  typeof ACTION_TYPE_SET_TEXT,
  number,
  string | number
]

/**
 * onReachBottomDistance
 */
export type PageScrollAction = [typeof ACTION_TYPE_PAGE_SCROLL, number]

export type PageUpdateAction =
  | CreateAction
  | InsertAction
  | RemoveAction
  | AddEventAction
  | AddWxsEventAction
  | RemoveEventAction
  | SetAttributeAction
  | RemoveAttributeAction
  | SetTextAction

export type PageAction =
  | PageCreateAction
  | PageCreatedAction
  | PageUpdateAction
  | PageScrollAction
