import { fixBorderStyle } from '../../../../src/x/framework/app/tabBar'

describe('test tabBar', () => {
  it('test fixBorderStyle', () => {
    expect(fixBorderStyle).toBeDefined()

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

    const tabBarConfig5 = new Map([
      ['borderStyle', 'red'],
      ['borderColor', undefined],
    ])
    fixBorderStyle(tabBarConfig5)
    expect(tabBarConfig5.get('borderStyle')).toBe('rgba(0, 0, 0, 0.33)')
  })
})
