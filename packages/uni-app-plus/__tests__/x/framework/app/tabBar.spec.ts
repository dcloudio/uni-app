import { fixBorderStyle } from '../../../../src/x/framework/app/utils'

describe('test tabBar', () => {
  it('定义存在', () => {
    expect(fixBorderStyle).toBeDefined()
  })

  it('设置 borderStyle', () => {
    const tabBarConfig = new Map([
      ['borderStyle', 'white'],
      ['borderColor', undefined],
    ])
    fixBorderStyle(tabBarConfig)
    expect(tabBarConfig.get('borderStyle')).toBe('rgba(255, 255, 255, 0.33)')

    const tabBarConfig2 = new Map([
      ['borderStyle', 'black'],
      ['borderColor', undefined],
    ])
    fixBorderStyle(tabBarConfig2)
    expect(tabBarConfig2.get('borderStyle')).toBe('rgba(0, 0, 0, 0.33)')

    const tabBarConfig5 = new Map([
      ['borderStyle', 'red'],
      ['borderColor', undefined],
    ])
    fixBorderStyle(tabBarConfig5)
    expect(tabBarConfig5.get('borderStyle')).toBe('rgba(0, 0, 0, 0.33)')
  })

  it('borderColor 优先级高', () => {
    const tabBarConfig3 = new Map([
      ['borderStyle', 'black'],
      ['borderColor', 'red'],
    ])
    fixBorderStyle(tabBarConfig3)
    expect(tabBarConfig3.get('borderStyle')).toBe('red')

    const tabBarConfig4 = new Map([
      ['borderStyle', undefined],
      ['borderColor', 'blue'],
    ])
    fixBorderStyle(tabBarConfig4)
    expect(tabBarConfig4.get('borderStyle')).toBe('blue')
  })

  it('都不设置 回退半透明黑', () => {
    const tabBarConfig6 = new Map([
      ['borderStyle', undefined],
      ['borderColor', undefined],
    ])
    fixBorderStyle(tabBarConfig6)
    expect(tabBarConfig6.get('borderStyle')).toBe('rgba(0, 0, 0, 0.33)')
  })
})
