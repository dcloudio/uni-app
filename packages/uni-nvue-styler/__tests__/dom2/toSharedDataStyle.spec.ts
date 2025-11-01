import { toSharedDataStyle } from '../../src/dom2/esm'

describe('toSharedDataStyle', () => {
  test('basic', () => {
    const style = new Map<string, unknown>()
    style.set('width', '100px')
    style.set('height', '100px')
    style.set('display', 'flex')
    style.set('justify-content', 'center')
    style.set('flex-grow', '2')
    style.set('color', 'red')
    const result = toSharedDataStyle(style)
    expect(result).toMatchSnapshot()
  })
})
