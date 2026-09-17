import { ref } from 'vue'
import { initRefs } from '../../src/runtime/util'

describe('runtime refs', () => {
  const originalX = global.__X__

  afterEach(() => {
    global.__X__ = originalX
  })

  test('keeps UniElement refs in internal refs for uni-app x', () => {
    global.__X__ = true

    const component = { id: 'component' }
    const item1 = { id: 'item-1' }
    const item2 = { id: 'item-2' }
    const box = { id: 'box' }
    const setupRef = { id: 'setup-ref' }
    const mpInstance = {
      selectAllComponents(selector: string) {
        if (selector === '.r') {
          return [{ properties: { uR: 'component' }, $vm: component }]
        }
        if (selector === '.r-i-f') {
          return [
            { properties: { uR: 'items' }, $vm: item1 },
            { properties: { uR: 'items' }, $vm: item2 },
          ]
        }
        return []
      },
    }
    const instance = {
      $templateUniElementRefs: [
        { i: 'box', r: 'box', v: box },
        { i: 'setup-ref', r: ref(null), k: 'setupRef', v: setupRef },
        { i: 'function-ref', r: () => {}, v: {} },
      ],
    }

    initRefs(instance as any, mpInstance as any)

    expect((instance as any).refs).toEqual({
      component,
      items: [item1, item2],
      box,
      setupRef,
    })
  })
})
