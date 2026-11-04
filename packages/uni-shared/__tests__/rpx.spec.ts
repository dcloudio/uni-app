import { normalizeRpx } from '../src/rpx'
import { createRpx2Unit, defaultRpx2Unit } from '../src/dom/style'

describe('Web rpx 样式转换', () => {
  test.each([
    ['100rpx', '3.125rem'],
    ['32upx', '1rem'],
    ['-10rpx .5upx 0rpx', '-0.3125rem 0.01563rem 0'],
    ['calc(100% - 12.345rpx)', 'calc(100% - 0.38578rem)'],
    ['20px 50% auto', '20px 50% auto'],
    ['"100rpx" url(/100rpx.png) 32rpx', '"100rpx" url(/100rpx.png) 1rem'],
    ["'32upx' 64upx", "'32upx' 2rem"],
  ])('%s => %s', (input, expected) => {
    expect(normalizeRpx(input)).toBe(expected)
    const { unit, unitRatio, unitPrecision } = defaultRpx2Unit
    expect(normalizeRpx(input)).toBe(
      createRpx2Unit(unit, unitRatio, unitPrecision)(input)
    )
  })

  test('重复调用不保留正则状态', () => {
    const inputs = ['32rpx', '32rpx', '16px', '32upx', '32upx', 'flex']
    const expected = ['1rem', '1rem', '16px', '1rem', '1rem', 'flex']
    for (let i = 0; i < 3; i++) {
      expect(inputs.map(normalizeRpx)).toEqual(expected)
    }
  })

  test.each([
    '--gap32rpx',
    '--32rpx',
    '--gap-32upx',
    '--间距32rpx',
    String.raw`--gap\:32rpx`,
    String.raw`--\33 2rpx`,
  ])('保留自定义属性名和引用：%s', (name) => {
    const value = `var(${name}, -32rpx)`
    const expected = `var(${name}, -1rem)`
    expect(normalizeRpx(value)).toBe(expected)
    expect(normalizeRpx(`${name}:32rpx;width:${value}`)).toBe(
      `${name}:1rem;width:${expected}`
    )
  })

  test('保留重复声明、字符串和 URL', () => {
    const style =
      '--gap32rpx:32rpx;width:32rpx;width:var(--gap32rpx);content:"a;32rpx:b";background:url(/32rpx.png)'
    expect(normalizeRpx(style)).toBe(
      '--gap32rpx:1rem;width:1rem;width:var(--gap32rpx);content:"a;32rpx:b";background:url(/32rpx.png)'
    )
    const quoted = 'content:"32rpx";background:url(/64upx.png)'
    expect(normalizeRpx(quoted)).toBe(quoted)
  })
})
