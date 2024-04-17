import { nextTick } from 'vue'
import {
  ACTION_TYPE_ADD_EVENT,
  ACTION_TYPE_CREATE,
  ACTION_TYPE_REMOVE,
  ACTION_TYPE_REMOVE_ATTRIBUTE,
  ACTION_TYPE_REMOVE_EVENT,
  ACTION_TYPE_SET_ATTRIBUTE,
  ACTION_TYPE_SET_TEXT,
  type CreateAction,
  EventModifierFlags,
  type SetAttributeAction,
  type UniEventListener,
} from '@dcloudio/uni-shared'
import type UniPageNode from '../../../src/service/framework/dom/Page'
import { createPageNode } from '../../../src/service/framework/dom/Page'
import {
  createElement,
  createTextNode,
  withModifiers,
} from '../../../../uni-app-vue/lib/service.runtime.esm'
import {
  ACTION_TYPE_DICT,
  type DictAction,
  setActionMinify,
} from '../../../src/constants'
import { decodeActions } from '../../../src/view/framework/dom/decodeActions'

describe('dom', () => {
  const pageId = 1
  const root = createPageNode(pageId, {
    css: true,
    route: 'pages/index/index',
    version: 1,
    locale: 'zh_CN',
    platform: 'ios',
    pixelRatio: 1,
    windowWidth: 375,
    disableScroll: false,
    onPageScroll: false,
    onPageReachBottom: false,
    onReachBottomDistance: 50,
    statusbarHeight: 24,
    windowTop: 0,
    windowBottom: 0,
  })
  test('minify = false', () => {
    setActionMinify(false)
    const viewElem = createElement('view', { pageNode: root })
    viewElem.setAttribute('id', 'view')
    root.appendChild(viewElem)
    viewElem.setAttribute('hidden', true)
    const { updateActions } = root
    const createElementAction = updateActions[0] as CreateAction
    expect(createElementAction[0]).toBe(ACTION_TYPE_CREATE)
    expect(createElementAction[1]).toBe(1)
    expect(createElementAction[2]).toBe('VIEW')
    expect(createElementAction[3]).toBe(0)
    expect(createElementAction[4]).toBe(-1)
    expect((createElementAction[5]!.a as any).id).toBe('view')
    // const addElementAction = updateActions[1] as InsertAction
    // expect(addElementAction[0]).toBe(ACTION_TYPE_INSERT)
    // expect(addElementAction[1]).toBe(1) // nodeId
    // expect(addElementAction[2]).toBe(0) // parentNodeId
    // expect(addElementAction[3]).toBe(-1) // index

    const setAttributeAction = updateActions[1] as SetAttributeAction
    expect(setAttributeAction[0]).toBe(ACTION_TYPE_SET_ATTRIBUTE)
    expect(setAttributeAction[1]).toBe(1)
    expect(setAttributeAction[2]).toBe('hidden')
    expect(setAttributeAction[3]).toBe(true)

    root.updateActions.length = 0
    viewElem.removeAttribute('hidden')
    const {
      updateActions: [removeAttributeAction],
    } = root
    expect(removeAttributeAction[0]).toBe(ACTION_TYPE_REMOVE_ATTRIBUTE)
    expect(removeAttributeAction[1]).toBe(1)
    expect(removeAttributeAction[2]).toBe('hidden')

    root.updateActions.length = 0
    viewElem.textContent = 'text'
    const {
      updateActions: [setTextAction],
    } = root
    expect(setTextAction[0]).toBe(ACTION_TYPE_SET_TEXT)
    expect(setTextAction[1]).toBe(1)
    expect(setTextAction[2]).toBe('text')

    root.updateActions.length = 0
    root.removeChild(viewElem)
    const {
      updateActions: [removeChildAction],
    } = root
    expect(removeChildAction[0]).toBe(ACTION_TYPE_REMOVE)
    expect(removeChildAction[1]).toBe(1)

    root.updateActions.length = 0
    const textNode = createTextNode('hello', { pageNode: root })
    root.appendChild(textNode)
    const {
      updateActions: [addTextNodeAction],
    } = root
    expect(addTextNodeAction[0]).toBe(ACTION_TYPE_CREATE)
    expect(addTextNodeAction[1]).toBe(2)
    expect(addTextNodeAction[2]).toBe('#text')
    expect(addTextNodeAction[3]).toBe(0)
    expect(addTextNodeAction[4]).toBe(-1)

    root.updateActions.length = 0
    const clickFn = () => {}
    textNode.addEventListener('click', clickFn)
    const {
      updateActions: [addEventListenerAction],
    } = root
    expect(addEventListenerAction[0]).toBe(ACTION_TYPE_ADD_EVENT)
    expect(addEventListenerAction[1]).toBe(2)
    expect(addEventListenerAction[2]).toBe('onClick')
    expect(addEventListenerAction[3]).toBe(0)

    root.updateActions.length = 0
    textNode.removeEventListener('click', clickFn)
    const {
      updateActions: [removeEventListenerAction],
    } = root
    expect(removeEventListenerAction[0]).toBe(ACTION_TYPE_REMOVE_EVENT)
    expect(removeEventListenerAction[1]).toBe(2)
    expect(removeEventListenerAction[2]).toBe('onClick')

    root.updateActions.length = 0
    const clickFn1 = withModifiers(() => {}, [
      'stop',
      'prevent',
    ]) as unknown as UniEventListener
    textNode.addEventListener('click', clickFn1, { capture: true })
    const {
      updateActions: [addEventListenerAction1],
    } = root
    expect(addEventListenerAction1[0]).toBe(ACTION_TYPE_ADD_EVENT)
    expect(addEventListenerAction1[1]).toBe(2)
    expect(addEventListenerAction1[2]).toBe('onClickCapture')
    const flag = addEventListenerAction1[3] as number
    expect(flag & EventModifierFlags.stop).toBeTruthy()
    expect(flag & EventModifierFlags.prevent).toBeTruthy()
    expect(flag & EventModifierFlags.self).toBeFalsy()
  })
  test('minify = true', () => {
    setActionMinify(true)

    const viewElem = createElement('view', { pageNode: root })
    viewElem.setAttribute('id', 'view')
    root.appendChild(viewElem)
    viewElem.setAttribute('hidden', true)
    expectActions(root)

    root.dicts.length = 0
    root.updateActions.length = 0
    viewElem.removeAttribute('hidden')
    expectActions(root)

    root.dicts.length = 0
    root.updateActions.length = 0
    viewElem.textContent = 'text'
    expectActions(root)

    root.dicts.length = 0
    root.updateActions.length = 0
    root.removeChild(viewElem)
    expectActions(root)

    root.dicts.length = 0
    root.updateActions.length = 0
    const textNode = createTextNode('hello', { pageNode: root })
    root.appendChild(textNode)
    expectActions(root)

    root.dicts.length = 0
    root.updateActions.length = 0
    const clickFn = () => {}
    textNode.addEventListener('click', clickFn)
    expectActions(root)

    root.dicts.length = 0
    root.updateActions.length = 0
    textNode.removeEventListener('click', clickFn)
    expectActions(root)

    root.dicts.length = 0
    root.updateActions.length = 0
    const clickFn1 = withModifiers(() => {}, [
      'stop',
      'prevent',
    ]) as unknown as UniEventListener
    textNode.addEventListener('click', clickFn1, { capture: true })
    expectActions(root)
    const flag = root.updateActions[0][3] as number
    expect(flag & EventModifierFlags.stop).toBeTruthy()
    expect(flag & EventModifierFlags.prevent).toBeTruthy()
    expect(flag & EventModifierFlags.self).toBeFalsy()
  })
  test('restore', (done) => {
    root.childNodes = []
    root.clear()
    const viewElem = createElement('view', { pageNode: root })
    viewElem.setAttribute('id', 'view')
    root.appendChild(viewElem)
    viewElem.setAttribute('hidden', true)

    const textNode = createTextNode('hello', { pageNode: root })
    root.appendChild(textNode)
    const clickFn1 = withModifiers(() => {}, [
      'stop',
      'prevent',
    ]) as unknown as UniEventListener
    textNode.addEventListener('click', clickFn1, { capture: true })
    nextTick(() => {
      root.restore()
      nextTick(done)
    })
  })
})

function expectActions(root: UniPageNode) {
  const actions = [
    [ACTION_TYPE_DICT, root.dicts] as DictAction,
    ...root.updateActions,
  ]
  expect(JSON.stringify(actions)).toMatchSnapshot()
  expect(JSON.stringify(decodeActions(actions))).toMatchSnapshot()
}
