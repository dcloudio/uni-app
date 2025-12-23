import { splitValues } from '../src/utils'

// 主要验证 css 包含括号方法， css() env()

describe('splitValues', () => {
  test('basic space separation', () => {
    expect(splitValues('10px 20px')).toEqual(['10px', '20px'])
    expect(splitValues('10px 20px 30px 40px')).toEqual([
      '10px',
      '20px',
      '30px',
      '40px',
    ])
  })

  test('multiple spaces', () => {
    expect(splitValues('10px   20px')).toEqual(['10px', '20px'])
  })

  test('ignore spaces in parentheses', () => {
    expect(splitValues('10px var(--color,   red) 20px')).toEqual([
      '10px',
      'var(--color, red)',
      '20px',
    ])
    expect(splitValues('calc(100% -   20px) 10px')).toEqual([
      'calc(100% - 20px)',
      '10px',
    ])
  })

  test('nested parentheses', () => {
    expect(splitValues('var(--a, var(--b, 10px)) 20px')).toEqual([
      'var(--a, var(--b, 10px))',
      '20px',
    ])
  })

  test('complex mixed', () => {
    expect(splitValues('10px calc(50% + 10px) var(--c, blue) 2em')).toEqual([
      '10px',
      'calc(50% + 10px)',
      'var(--c, blue)',
      '2em',
    ])
    expect(
      splitValues('10px calc(var(--c, 10px) + 10px) var(--c, blue) 2em')
    ).toEqual(['10px', 'calc(var(--c, 10px) + 10px)', 'var(--c, blue)', '2em'])
  })

  test('quotes and normalization', () => {
    expect(splitValues('rgb(1,   2, 3)')).toEqual(['rgb(1, 2, 3)'])
    expect(splitValues('calc(10px  +  20px)')).toEqual(['calc(10px + 20px)'])
  })
})
