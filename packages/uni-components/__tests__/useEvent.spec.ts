import { createUniDOMStringMap } from '@dcloudio/uni-shared'

describe('useEvent', () => {
  let useCustomEvent: typeof import('../src/helpers/useEvent').useCustomEvent

  beforeAll(async () => {
    global.__PLATFORM__ = 'h5'
    global.__X__ = true
    global.__NODE_JS__ = false
    jest.resetModules()
    useCustomEvent = (await import('../src/helpers/useEvent')).useCustomEvent
  })

  test('useCustomEvent keeps UniElement dataset as UniDOMStringMap in X', () => {
    const element = {
      __isUniElement: true,
      dataset: createUniDOMStringMap({ foo: 'foo' }),
    } as any
    const emit = jest.fn()
    const trigger = useCustomEvent({ value: element } as any, emit)

    trigger('change', { timeStamp: 1 } as Event, { value: 'value' })

    const normalized = emit.mock.calls[0][1]
    expect(emit).toHaveBeenCalledWith('change', normalized)
    expect(normalized.target).toBe(element)
    expect(normalized.currentTarget).toBe(element)
    expect(normalized.target.dataset.get('foo')).toBe('foo')
    expect(normalized.currentTarget.dataset.get('foo')).toBe('foo')
  })
})
