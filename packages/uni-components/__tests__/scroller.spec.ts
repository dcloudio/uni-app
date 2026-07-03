import { calculateSnapIndex } from '../src/helpers/scroller/Scroller'

describe('Scroller 小数点像素使用四舍五入', () => {
  test('exact multiple position', () => {
    expect(calculateSnapIndex(-200, 40)).toBe(5)
    expect(calculateSnapIndex(-6399.8, 40)).toBe(160)
    expect(calculateSnapIndex(-6479.7, 40.5)).toBe(160)
    expect(calculateSnapIndex(-0.3, 40)).toBe(0)
    expect(calculateSnapIndex(-199.4, 40)).toBe(5)
    expect(calculateSnapIndex(-200.6, 40)).toBe(5)
    const extent = 160 * 40
    expect(calculateSnapIndex(-(extent - 0.2), 40)).toBe(160)
    expect(calculateSnapIndex(-199.5, 40)).toBe(5)
  })
})
