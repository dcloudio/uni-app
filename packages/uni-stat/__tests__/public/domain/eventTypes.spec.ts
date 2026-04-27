import { CST, IEY, LT, toIey } from '../../../src/public/domain/eventTypes'

describe('domain/eventTypes', () => {
  test('LT 与文档参数保持一致（无 lt=0）', () => {
    expect(LT.Launch).toBe('1')
    expect(LT.Hide).toBe('3')
    expect(LT.Page).toBe('11')
    expect(LT.Event).toBe('21')
    expect(LT.Error).toBe('31')
    expect(LT.Push).toBe('101')
    // lt=0 已废弃：参数文档无该 lt，新会话信息随 lt=1 上行。
    expect((LT as Record<string, string>).Session).toBeUndefined()
  })

  test('CST 数值与文档对齐', () => {
    expect(CST.ColdLaunch).toBe(1)
    expect(CST.BackgroundTimeout).toBe(2)
    expect(CST.PageInactiveTimeout).toBe(3)
  })

  test('IEY: No=0, Yes=1', () => {
    expect(IEY.No).toBe(0)
    expect(IEY.Yes).toBe(1)
  })

  describe('toIey', () => {
    test.each([
      [true, IEY.Yes],
      [1, IEY.Yes],
      ['1', IEY.Yes],
      [false, IEY.No],
      [0, IEY.No],
      ['0', IEY.No],
      [null, IEY.No],
      [undefined, IEY.No],
      ['', IEY.No],
      ['yes', IEY.No],
    ])('toIey(%p) → %p', (input, expected) => {
      expect(toIey(input)).toBe(expected)
    })
  })
})
