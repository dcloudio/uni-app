/// <reference path="../node_modules/mini-types/types/index.d.ts" />

jest.mock('vue', () => {
  const vue = jest.requireActual('vue')
  return {
    ...vue,
    EMPTY_OBJ: {},
    setTemplateRef: (
      { r }: { r: string | ReturnType<typeof vue.ref> },
      refValue: unknown,
      setupState: Record<string, unknown>
    ) => {
      if (typeof r === 'string' && r in setupState) {
        setupState[r] = refValue
      } else if (vue.isRef(r)) {
        r.value = refValue
      }
    },
  }
})

jest.mock('@dcloudio/uni-mp-weixin', () => ({
  handleLink: jest.fn(),
}))

import { type ComponentInternalInstance, ref } from 'vue'

// @ts-expect-error EMPTY_OBJ 需要从 vue 导入，以确保与运行时使用同一个对象
import { EMPTY_OBJ } from 'vue'
import { initRefs } from '../src/runtime/refs'

global.my = {
  ...global.my,
  canIUse: jest.fn(),
}

const { handleRef } =
  require('../src/runtime/util') as typeof import('../src/runtime/util')

function createInstance(setupState: Record<string, unknown> = {}) {
  const instance = {
    refs: EMPTY_OBJ,
    setupState,
    $templateUniElementRefs: [],
  } as unknown as ComponentInternalInstance
  initRefs(instance)
  return instance
}

function setComponentRef(
  instance: ComponentInternalInstance,
  props: Record<string, () => Record<string, unknown>>,
  component: Record<string, unknown>
) {
  handleRef.call(
    { $vm: { $: instance } } as any,
    { props, $vm: component } as any
  )
}

describe('mp-alipay: runtime refs', () => {
  test('merges component and UniElement refs dynamically', () => {
    const component = { id: 'component' }
    const componentBox = { id: 'component-box' }
    const box = { id: 'box' }
    const items = [{ id: 'item-1' }, { id: 'item-2' }]
    const setupRef = { id: 'setup-ref' }
    const instance = {
      refs: { component },
      $templateUniElementRefs: [
        { i: 'box', r: 'box', v: box },
        { i: 'items', r: 'items', f: true, v: items },
        { i: 'setup-ref', r: ref(null), k: 'setupRef', v: setupRef },
        { i: 'function-ref', r: () => {}, v: {} },
      ],
    } as unknown as ComponentInternalInstance

    initRefs(instance)

    const refs = instance.refs
    expect(refs).toEqual({ component, box, items, setupRef })
    expect(instance.refs).toBe(refs)

    refs.box = componentBox
    expect(refs.box).toBe(box)

    instance.$templateUniElementRefs = []
    expect(refs).toEqual({ component, box: componentBox })
  })

  test('does not share empty refs between component instances', () => {
    // 生产模式下 EMPTY_OBJ 是可扩展对象。
    const isExtensible = jest
      .spyOn(Object, 'isExtensible')
      .mockReturnValue(true)
    const first = {
      refs: EMPTY_OBJ,
      $templateUniElementRefs: [],
    } as unknown as ComponentInternalInstance
    const second = {
      refs: EMPTY_OBJ,
      $templateUniElementRefs: [],
    } as unknown as ComponentInternalInstance

    try {
      initRefs(first)
      initRefs(second)

      expect(first.refs).not.toBe(second.refs)
      first.refs.first = { id: 'first' }
      expect(second.refs).not.toHaveProperty('first')
    } finally {
      isExtensible.mockRestore()
    }
  })

  test('exposes an inline string ref for a custom component', () => {
    const component = { id: 'ref-box' }
    const instance = createInstance()

    setComponentRef(instance, { uR: () => ({ r: 'refBox' }) }, component)

    expect(instance.refs.refBox).toBe(component)
  })

  test('keeps exposing a setup ref for a custom component', () => {
    const component = { id: 'setup-ref-box' }
    const setupRef = ref(null)
    const instance = createInstance({ refBox: setupRef })

    setComponentRef(
      instance,
      { uR: () => ({ r: setupRef, k: 'refBox' }) },
      component
    )

    expect(instance.refs.refBox).toBe(component)
    expect(setupRef.value).toEqual(component)
  })

  test('does not treat a string-valued setup binding as a static ref', () => {
    const component = { id: 'string-binding-ref-box' }
    const instance = createInstance({ refBox: 'dynamicRef' })

    setComponentRef(
      instance,
      { uR: () => ({ r: 'dynamicRef', k: 'refBox' }) },
      component
    )

    expect(instance.refs).not.toHaveProperty('dynamicRef')
    expect(instance.refs).not.toHaveProperty('refBox')
  })

  test('collects inline string refs used in v-for', () => {
    const components = [{ id: 'ref-box-1' }, { id: 'ref-box-2' }]
    const instance = createInstance()

    components.forEach((component) => {
      setComponentRef(
        instance,
        { uRIF: () => ({ r: 'refBox', f: 1 }) },
        component
      )
    })

    expect(instance.refs.refBox).toEqual(components)
  })
})
