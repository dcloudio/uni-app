jest.mock('vue', () => ({
  getCurrentInstance: jest.fn(),
  guardReactiveProps: jest.fn((props) => props),
}))

import { getCurrentInstance } from 'vue'
import {
  findComponentPropsData,
  pruneComponentPropsCache,
  renderProps,
} from '../src/helpers/renderProps'

const EXTERNAL_CLASSES_SOURCE_PAGE = Symbol.for(
  'uni.externalClasses.sourcePage'
)
const originalX = (global as any).__X__
const originalStyleIsolation = (global as any).__X_STYLE_ISOLATION__
const originalStyleIsolationUpArrow = (global as any)
  .__X_STYLE_ISOLATION_UP_ARROW__

describe('uni-mp-vue: renderProps', () => {
  beforeAll(() => {
    ;(global as any).__X__ = true
    ;(global as any).__X_STYLE_ISOLATION__ = true
    ;(global as any).__X_STYLE_ISOLATION_UP_ARROW__ = true
  })

  afterEach(() => {
    pruneComponentPropsCache(1)
    pruneComponentPropsCache(2)
    jest.clearAllMocks()
  })

  afterAll(() => {
    ;(global as any).__X__ = originalX
    ;(global as any).__X_STYLE_ISOLATION__ = originalStyleIsolation
    ;(global as any).__X_STYLE_ISOLATION_UP_ARROW__ =
      originalStyleIsolationUpArrow
  })

  test('记录 page 来源且不参与 props 枚举', () => {
    mockCurrentInstance(1, 'page')
    const up = renderProps({ foo: 'bar' })
    const props = findComponentPropsData(up)!

    expect((props as any)[EXTERNAL_CLASSES_SOURCE_PAGE]).toBe(true)
    expect(Object.keys(props)).toEqual(['foo'])
  })

  test('记录 component 来源', () => {
    mockCurrentInstance(2, 'component')
    const up = renderProps({ foo: 'bar' })
    const props = findComponentPropsData(up)!

    expect((props as any)[EXTERNAL_CLASSES_SOURCE_PAGE]).toBe(false)
  })
})

function mockCurrentInstance(uid: number, renderer: 'page' | 'component') {
  ;(getCurrentInstance as jest.Mock).mockReturnValue({
    uid,
    __counter: 0,
    renderer,
  })
}
