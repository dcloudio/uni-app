import { type ComponentInternalInstance, ref } from 'vue'

// @ts-expect-error EMPTY_OBJ 需要从 vue 导入，以确保与运行时使用同一个对象
import { EMPTY_OBJ } from 'vue'
import { initRefs } from '../src/runtime/refs'

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
})
