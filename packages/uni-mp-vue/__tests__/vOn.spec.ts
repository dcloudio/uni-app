import { patchMPEvent } from '../src/helpers/vOn'

describe('uni-mp-vue: vOn', () => {
  const originalX = global.__X__

  afterEach(() => {
    global.__X__ = originalX
  })

  it('preserves original target dataset in x event', () => {
    global.__X__ = true

    const event = {
      type: 'tap',
      target: {
        dataset: {
          foo: 'target',
        },
      },
      currentTarget: {
        dataset: {
          bar: 'current',
        },
      },
      detail: {
        dataset: {
          foo: 'detail',
        },
        x: 1,
        y: 2,
      },
      touches: [],
    }

    patchMPEvent(event as any)

    expect((event.target as any).dataset.get('foo')).toBe('target')
    expect((event.currentTarget as any).dataset.get('bar')).toBe('current')
  })
})
