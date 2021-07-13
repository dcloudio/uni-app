import { decodeTag } from '@dcloudio/uni-shared'
import {
  CreateAction,
  InsertAction,
  RemoveAction,
  SetAttributeAction,
  RemoveAttributeAction,
  SetTextAction,
  ACTION_TYPE_CREATE,
  ACTION_TYPE_INSERT,
  ACTION_TYPE_REMOVE,
  ACTION_TYPE_SET_ATTRIBUTE,
  ACTION_TYPE_REMOVE_ATTRIBUTE,
  ACTION_TYPE_SET_TEXT,
  PageAction,
  PageCreateAction,
  PageCreatedAction,
  ACTION_TYPE_PAGE_CREATE,
  ACTION_TYPE_PAGE_CREATED,
  AddEventAction,
  RemoveEventAction,
  ACTION_TYPE_ADD_EVENT,
  ACTION_TYPE_REMOVE_EVENT,
} from '../../../PageAction'

function decodePageCreateAction([, pageCreateData]: PageCreateAction) {
  return ['pageCreate', pageCreateData]
}

function decodePageCreatedAction([]: PageCreatedAction) {
  return ['pageCreated']
}

function decodeCreateAction([
  ,
  nodeId,
  nodeName,
  parentNodeId,
  nodeJson,
]: CreateAction) {
  return ['create', nodeId, decodeTag(nodeName), parentNodeId, nodeJson]
}

function decodeInsertAction([, ...action]: InsertAction) {
  return ['insert', ...action]
}

function decodeRemoveAction([, ...action]: RemoveAction) {
  return ['remove', ...action]
}

function decodeAddEventAction([, ...action]: AddEventAction) {
  return ['addEvent', ...action]
}

function decodeRemoveEventAction([, ...action]: RemoveEventAction) {
  return ['removeEvent', ...action]
}

function decodeSetAttributeAction([, ...action]: SetAttributeAction) {
  return ['setAttr', ...action]
}

function decodeRemoveAttributeAction([, ...action]: RemoveAttributeAction) {
  return ['removeAttr', ...action]
}

function decodeSetTextAction([, ...action]: SetTextAction) {
  return ['setText', action]
}

export function decodeActions(actions: PageAction[]) {
  return actions.map((action) => {
    switch (action[0]) {
      case ACTION_TYPE_PAGE_CREATE:
        return decodePageCreateAction(action)
      case ACTION_TYPE_PAGE_CREATED:
        return decodePageCreatedAction(action)
      case ACTION_TYPE_CREATE:
        return decodeCreateAction(action)
      case ACTION_TYPE_INSERT:
        return decodeInsertAction(action)
      case ACTION_TYPE_REMOVE:
        return decodeRemoveAction(action)
      case ACTION_TYPE_SET_ATTRIBUTE:
        return decodeSetAttributeAction(action)
      case ACTION_TYPE_REMOVE_ATTRIBUTE:
        return decodeRemoveAttributeAction(action)
      case ACTION_TYPE_ADD_EVENT:
        return decodeAddEventAction(action)
      case ACTION_TYPE_REMOVE_EVENT:
        return decodeRemoveEventAction(action)
      case ACTION_TYPE_SET_TEXT:
        return decodeSetTextAction(action)
    }
    return action
  })
}
