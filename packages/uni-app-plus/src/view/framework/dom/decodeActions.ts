import { hasOwn } from '@vue/shared'
import {
  ACTION_TYPE_ADD_EVENT,
  ACTION_TYPE_ADD_WXS_EVENT,
  ACTION_TYPE_CREATE,
  ACTION_TYPE_INSERT,
  ACTION_TYPE_PAGE_CREATE,
  ACTION_TYPE_PAGE_CREATED,
  ACTION_TYPE_REMOVE,
  ACTION_TYPE_REMOVE_ATTRIBUTE,
  ACTION_TYPE_REMOVE_EVENT,
  ACTION_TYPE_SET_ATTRIBUTE,
  ACTION_TYPE_SET_TEXT,
  type AddEventAction,
  type AddWxsEventAction,
  type CreateAction,
  type InsertAction,
  type PageAction,
  type PageCreateAction,
  type PageCreatedAction,
  type RemoveAction,
  type RemoveAttributeAction,
  type RemoveEventAction,
  type SetAttributeAction,
  type SetTextAction,
  type UniNodeJSON,
} from '@dcloudio/uni-shared'
import type { UniNodeJSONMinify } from 'packages/uni-shared/src/vdom/Node'
import type { UniCSSStyleDeclarationJSON } from 'packages/uni-shared/src/vdom/Style'
import {
  ACTION_TYPE_DICT,
  type DictAction,
  type Dictionary,
  type Value,
} from '../../../constants'

type GetDict = ReturnType<typeof createGetDict>

export function createGetDict(dict: Dictionary) {
  if (!dict.length) {
    return (v: any) => v
  }
  const getDict = (
    value: number | [number, number][],
    includeValue: boolean = true
  ) => {
    if (typeof value === 'number') {
      return (dict as Dictionary)[value]
    }
    const res: Record<string, unknown> = {}
    value.forEach(([n, v]) => {
      if (includeValue) {
        res[getDict(n) as string] = getDict(v) as Value
      } else {
        res[getDict(n) as string] = v
      }
    })
    return res
  }
  return getDict
}

export function decodeActions(actions: (PageAction | DictAction)[]) {
  const [type, dict] = actions[0]
  if (type !== ACTION_TYPE_DICT) {
    return actions
  }
  const getDict = createGetDict(dict as Dictionary)

  return actions.map((action) => {
    switch (action[0]) {
      case ACTION_TYPE_DICT:
        return action
      case ACTION_TYPE_PAGE_CREATE:
        return decodePageCreateAction(action)
      case ACTION_TYPE_PAGE_CREATED:
        return decodePageCreatedAction(action)
      case ACTION_TYPE_CREATE:
        return decodeCreateAction(action, getDict)
      case ACTION_TYPE_INSERT:
        return decodeInsertAction(action, getDict)
      case ACTION_TYPE_REMOVE:
        return decodeRemoveAction(action)
      case ACTION_TYPE_SET_ATTRIBUTE:
        return decodeSetAttributeAction(action, getDict)
      case ACTION_TYPE_REMOVE_ATTRIBUTE:
        return decodeRemoveAttributeAction(action, getDict)
      case ACTION_TYPE_ADD_EVENT:
        return decodeAddEventAction(action, getDict)
      case ACTION_TYPE_ADD_WXS_EVENT:
        return decodeAddWxsEventAction(action, getDict)
      case ACTION_TYPE_REMOVE_EVENT:
        return decodeRemoveEventAction(action, getDict)
      case ACTION_TYPE_SET_TEXT:
        return decodeSetTextAction(action, getDict)
    }
  })
}

function decodePageCreateAction([, pageCreateData]: PageCreateAction) {
  return ['pageCreate', pageCreateData]
}

function decodePageCreatedAction([]: PageCreatedAction) {
  return ['pageCreated']
}

export function decodeNodeJson(
  getDict: GetDict,
  nodeJson?: Partial<UniNodeJSONMinify>
) {
  if (!nodeJson) {
    return
  }
  if (hasOwn(nodeJson, 'a')) {
    ;(nodeJson as unknown as UniNodeJSON).a = getDict(nodeJson.a!) as Record<
      string,
      unknown
    >
  }
  if (hasOwn(nodeJson, 'e')) {
    ;(nodeJson as unknown as UniNodeJSON).e = getDict(
      nodeJson.e!,
      false
    ) as Record<string, number>
  }
  if (hasOwn(nodeJson, 'w')) {
    ;(nodeJson as unknown as UniNodeJSON).w = getWxsEventDict(
      nodeJson.w!,
      getDict
    )
  }
  if (hasOwn(nodeJson, 's')) {
    ;(nodeJson as unknown as UniNodeJSON).s = getDict(
      nodeJson.s as [number, number][]
    ) as UniCSSStyleDeclarationJSON
  }
  if (hasOwn(nodeJson, 't')) {
    ;(nodeJson as unknown as UniNodeJSON).t = getDict(nodeJson.t!) as string
  }
  return nodeJson as unknown as UniNodeJSON
}

function getWxsEventDict(w: UniNodeJSONMinify['w'], getDict: GetDict) {
  const res: UniNodeJSON['w'] = {}
  w.forEach(([name, [wxsEvent, flag]]) => {
    res[getDict(name)] = [getDict(wxsEvent), flag]
  })
  return res
}

function decodeCreateAction(
  [, nodeId, nodeName, parentNodeId, refNodeId, nodeJson]: CreateAction,
  getDict: GetDict
) {
  return [
    'create',
    nodeId,
    getDict(nodeName as number),
    parentNodeId,
    refNodeId,
    decodeNodeJson(getDict, nodeJson as UniNodeJSONMinify),
  ]
}

function decodeInsertAction([, ...action]: InsertAction, getDict: GetDict) {
  return [
    'insert',
    action[0],
    action[1],
    action[2],
    action[3] ? decodeNodeJson(getDict, action[3] as UniNodeJSONMinify) : {},
  ]
}

function decodeRemoveAction([, ...action]: RemoveAction) {
  return ['remove', ...action]
}

function decodeAddEventAction([, ...action]: AddEventAction, getDict: GetDict) {
  return ['addEvent', action[0], getDict(action[1] as number), action[2]]
}

function decodeAddWxsEventAction(
  [, ...action]: AddWxsEventAction,
  getDict: GetDict
) {
  return [
    'addWxsEvent',
    action[0],
    getDict(action[1] as number),
    getDict(action[2] as number),
    action[3],
  ]
}

function decodeRemoveEventAction(
  [, ...action]: RemoveEventAction,
  getDict: GetDict
) {
  return ['removeEvent', action[0], getDict(action[1] as number)]
}

function decodeSetAttributeAction(
  [, ...action]: SetAttributeAction,
  getDict: GetDict
) {
  return [
    'setAttr',
    action[0],
    getDict(action[1] as number),
    getDict(action[2] as number),
  ]
}

function decodeRemoveAttributeAction(
  [, ...action]: RemoveAttributeAction,
  getDict: GetDict
) {
  return ['removeAttr', action[0], getDict(action[1] as number)]
}

function decodeSetTextAction([, ...action]: SetTextAction, getDict: GetDict) {
  return ['setText', action[0], getDict(action[1] as number)]
}
