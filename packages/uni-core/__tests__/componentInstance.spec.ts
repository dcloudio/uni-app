import { createUniDOMStringMap } from '@dcloudio/uni-shared'

describe('componentInstance', () => {
  let createNativeEvent: typeof import('../src/view/plugin/componentInstance').createNativeEvent
  let getOpenerEventChannel: typeof import('../src/service/plugin/componentInstance').getOpenerEventChannel

  beforeAll(async () => {
    global.__PLATFORM__ = 'h5'
    global.__X__ = true
    jest.resetModules()
    createNativeEvent = (await import('../src/view/plugin/componentInstance'))
      .createNativeEvent
    getOpenerEventChannel = (
      await import('../src/service/plugin/componentInstance')
    ).getOpenerEventChannel
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

  test('getOpenerEventChannel 固定使用页面初始化时的 route meta', () => {
    const routeMetaA: Record<string, any> = {}
    const routeMetaB: Record<string, any> = {}
    let currentMeta = routeMetaA
    const route = {
      get meta() {
        return currentMeta
      },
    }
    const page = { id: 1, meta: {} } as Page.PageInstance['$page']
    const routeMeta = route.meta
    Object.defineProperty(page, 'eventChannel', {
      configurable: true,
      enumerable: true,
      get: () => routeMeta.eventChannel,
      set: (eventChannel) => (routeMeta.eventChannel = eventChannel),
    })
    const vm = {
      $basePage: page,
      get $route() {
        throw new Error('不应读取 $route')
      },
    } as any

    currentMeta = routeMetaB
    const eventChannel = getOpenerEventChannel.call(vm)

    expect(eventChannel).toBe(page.eventChannel)
    expect(routeMetaA.eventChannel).toBe(eventChannel)
    expect(routeMetaB.eventChannel).toBeUndefined()
    expect(getOpenerEventChannel.call(vm)).toBe(eventChannel)
  })
})
