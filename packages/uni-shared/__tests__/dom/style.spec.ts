import { createRpx2Unit } from '../../src/dom/style'

const defaultRpx2Unit = {
  unit: 'rem',
  unitRatio: 10 / 320,
  unitPrecision: 5,
}
const { unit, unitRatio, unitPrecision } = defaultRpx2Unit
describe('Rpx2Unit', () => {
  test('rem', () => {
    const rpx2unit = createRpx2Unit(unit, unitRatio, unitPrecision)
    expect(rpx2unit('10')).toBe('10')
    expect(rpx2unit('10rpx')).toBe('0.3125rem')
    expect(rpx2unit('10upx')).toBe('0.3125rem')
    expect(rpx2unit('color:red;height:10rpx;width:100px')).toBe(
      'color:red;height:0.3125rem;width:100px'
    )
  })
})
