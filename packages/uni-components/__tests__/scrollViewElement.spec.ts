import { initScrollViewElement } from '../src/vue/scroll-view/element-vapor'

jest.mock('../src/vue/web-vapor-elements', () => ({
  UniViewElement: class {},
}))

test('单层宿主仅扩展逻辑名称，保留原生滚动属性和方法', () => {
  const native = {
    scrollLeft: 3,
    scrollTop: 4,
    scrollHeight: 800,
    scrollWidth: 600,
    scrollTo: jest.fn(function (this: unknown) {
      return this
    }),
    scrollBy: jest.fn(function (this: unknown) {
      return this
    }),
  }
  const root = Object.create(native)
  initScrollViewElement(root)
  expect(root.uniTagName).toBe('SCROLL-VIEW')
  Object.defineProperty(root, 'uniTagName', { value: 'LIST-VIEW' })
  expect(root.uniTagName).toBe('LIST-VIEW')
  expect(root.scrollHeight).toBe(800)
  expect(root.scrollWidth).toBe(600)
  expect(root.scrollLeft).toBe(3)
  expect(root.scrollTop).toBe(4)
  root.scrollLeft = 12
  root.scrollTop = 24
  expect(root.scrollLeft).toBe(12)
  expect(root.scrollTop).toBe(24)
  expect(native.scrollLeft).toBe(3)
  expect(native.scrollTop).toBe(4)
  expect(Object.getOwnPropertyDescriptor(root, 'scrollHeight')).toBeUndefined()
  expect(Object.getOwnPropertyDescriptor(root, 'scrollWidth')).toBeUndefined()
  expect(Object.getOwnPropertyDescriptor(root, 'scrollTo')).toBeUndefined()
  expect(Object.getOwnPropertyDescriptor(root, 'scrollBy')).toBeUndefined()
  expect(root.scrollTo).toBe(native.scrollTo)
  expect(root.scrollBy).toBe(native.scrollBy)
  expect(root.scrollTo({ top: 8 })).toBe(root)
  expect(root.scrollBy({ left: 2 })).toBe(root)
})
