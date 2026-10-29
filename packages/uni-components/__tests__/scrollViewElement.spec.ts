import { initScrollViewElement } from '../src/vue/scroll-view/element-vapor'

jest.mock('../src/vue/web-vapor-elements', () => ({
  UniViewElement: class {},
}))

test('ListView/Waterflow 覆盖宿主身份时保留 ScrollView 的滚动绑定', () => {
  const main = {
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
  const root: any = { firstElementChild: { firstElementChild: main } }
  const left = jest.fn()
  const top = jest.fn()
  initScrollViewElement(root, left, top)
  expect(root.uniTagName).toBe('SCROLL-VIEW')
  Object.defineProperty(root, 'uniTagName', { value: 'LIST-VIEW' })
  expect(root.uniTagName).toBe('LIST-VIEW')
  expect(root.scrollHeight).toBe(800)
  expect(root.scrollWidth).toBe(600)
  expect(root.scrollLeft).toBe(3)
  expect(root.scrollTop).toBe(4)
  root.scrollLeft = 12
  root.scrollTop = 24
  expect(left).toHaveBeenCalledWith(12)
  expect(top).toHaveBeenCalledWith(24)
  const { scrollTo, scrollBy } = root
  expect(scrollTo({ top: 8 })).toBe(main)
  expect(scrollBy({ left: 2 })).toBe(main)
})
