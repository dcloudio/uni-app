import { syncScopeIdsToBody } from '../src/helpers/scope'

function createSource(...names: string[]) {
  return {
    attributes: names.map((name) => ({ name })),
  } as unknown as Element
}

function createTarget() {
  const attributes = new Set<string>()
  return {
    attributes,
    setAttribute(name: string) {
      attributes.add(name)
    },
    removeAttribute(name: string) {
      attributes.delete(name)
    },
  }
}

describe('syncScopeIdsToBody', () => {
  test('copies scoped ids from the uni-app element', () => {
    const target = createTarget()

    syncScopeIdsToBody(
      createSource('data-v-app1234', 'class', 'data-v-inspector'),
      target
    )

    expect(target.attributes).toEqual(new Set(['data-v-app1234']))
  })

  test('removes stale ids when the source scope changes', () => {
    const target = createTarget()

    syncScopeIdsToBody(createSource('data-v-old1234'), target)
    syncScopeIdsToBody(createSource('data-v-new5678'), target)

    expect(target.attributes).toEqual(new Set(['data-v-new5678']))
  })

  test('supports Vue slotted scope ids', () => {
    const target = createTarget()

    syncScopeIdsToBody(createSource('data-v-app1234-s'), target)

    expect(target.attributes).toEqual(new Set(['data-v-app1234-s']))
  })
})
