import { createUniDOMStringMap } from '@dcloudio/uni-shared'

describe('componentInstance', () => {
  let createNativeEvent: typeof import('../src/view/plugin/componentInstance').createNativeEvent

  beforeAll(async () => {
    global.__PLATFORM__ = 'h5'
    global.__X__ = true
    jest.resetModules()
    createNativeEvent = (await import('../src/view/plugin/componentInstance'))
      .createNativeEvent
  })

  test('createNativeEvent keeps UniElement dataset as UniDOMStringMap in X', () => {
    const root = {
      __isUniElement: true,
      dataset: createUniDOMStringMap({ foo: 'foo' }),
    } as any
    const child = {
      parentElement: root,
    } as any
    const event = {
      type: 'click',
      timeStamp: 1,
      target: child,
      currentTarget: root,
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    } as any

    const normalized = createNativeEvent(event)

    expect(normalized.target).toBe(root)
    expect(normalized.currentTarget).toBe(root)
    expect(normalized.target.dataset.get('foo')).toBe('foo')
    expect(normalized.currentTarget.dataset.get('foo')).toBe('foo')
  })
})
