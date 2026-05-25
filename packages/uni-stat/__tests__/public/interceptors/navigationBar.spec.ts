import { __resetTitle, getCurrentTitle } from '../../../src/public/domain/title'
import { interceptor } from '../../../src/public/infra/interceptor'
import { registerNavigationBarInterceptor } from '../../../src/public/interceptors/navigationBar'
import { installMockUni, restoreMockUni } from '../helpers/mockUni'

interface NavUniMock {
  addInterceptor: jest.Mock
  removeInterceptor: jest.Mock
  __handlers: Record<string, { invoke?: (args: unknown) => void }>
}

function navUniMock(): NavUniMock {
  const handlers: NavUniMock['__handlers'] = {}
  return {
    addInterceptor: jest.fn(
      (api: string, h: { invoke?: (args: unknown) => void }) => {
        handlers[api] = h
      }
    ),
    removeInterceptor: jest.fn((api: string) => {
      delete handlers[api]
    }),
    __handlers: handlers,
  }
}

describe('interceptors/navigationBar', () => {
  let uniMock: NavUniMock

  beforeEach(() => {
    uniMock = navUniMock()
    installMockUni({ patch: uniMock as unknown as Record<string, unknown> })
    interceptor.__reset()
    __resetTitle()
  })

  afterEach(() => {
    interceptor.__reset()
    __resetTitle()
    restoreMockUni()
  })

  test('invoke → 写入 title.page', () => {
    registerNavigationBarInterceptor()
    uniMock.__handlers['setNavigationBarTitle']!.invoke!({ title: 'hello' })
    expect(getCurrentTitle().ttn).toBe('hello')
  })

  test('args 缺失 title 字段 → 不污染 title', () => {
    registerNavigationBarInterceptor()
    uniMock.__handlers['setNavigationBarTitle']!.invoke!({})
    expect(getCurrentTitle().ttn).toBe('')
  })

  test('args 为 undefined → 不抛错', () => {
    registerNavigationBarInterceptor()
    expect(() =>
      uniMock.__handlers['setNavigationBarTitle']!.invoke!(undefined)
    ).not.toThrow()
  })

  test('解绑后 → 不再写 title', () => {
    const off = registerNavigationBarInterceptor()
    off()
    if (uniMock.__handlers['setNavigationBarTitle']) {
      uniMock.__handlers['setNavigationBarTitle']!.invoke?.({ title: 'after' })
    }
    expect(getCurrentTitle().ttn).toBe('')
  })
})
