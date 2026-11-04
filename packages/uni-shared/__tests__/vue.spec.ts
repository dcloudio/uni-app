import { normalizeClass } from '@vue/shared'
import { normalizeStyle } from '../src/vue'
import { normalizeVaporProps, normalizeVaporStyle } from '../src/dom2/vue'
import { UTSJSONObject } from '../src/uts'

describe('Vapor normalization compatibility', () => {
  test('props class follows standard Vue semantics', () => {
    const inherited = Object.create({ inherited: true })
    inherited.own = true
    const values = [
      undefined,
      null,
      false,
      true,
      0,
      1,
      '',
      ' foo  bar ',
      { foo: true, bar: false },
      inherited,
      new Map([
        ['foo', true],
        ['bar', false],
      ]),
      new UTSJSONObject({ foo: true, bar: false }),
    ]
    for (const value of [...values, values, [values, [' baz ']]]) {
      expect(normalizeVaporProps({ class: value })!.class).toBe(
        value && typeof value !== 'string' ? normalizeClass(value) : value
      )
    }
  })

  test('style preserves parsing, identity and merge precedence', () => {
    const object = { color: 'red' }
    const values = [
      undefined,
      null,
      false,
      true,
      0,
      1,
      '',
      'color: red; background: url(a;b); /* ignored */ width: 1px',
      object,
      new Map([['color', 'blue']]),
      new UTSJSONObject({ color: 'green', width: '2px' }),
    ]
    for (const value of [...values, values, [values, { color: 'black' }]]) {
      expect(normalizeVaporStyle(value)).toEqual(normalizeStyle(value))
    }
    expect(normalizeVaporStyle(object)).toBe(object)
    const utsStyle = new UTSJSONObject({ color: 'green' })
    expect(normalizeVaporStyle(utsStyle)).toBe(utsStyle)
    expect(normalizeVaporStyle([values, { color: 'black' }])!.color).toBe(
      'black'
    )
  })

  test('props preserves mutation and truthy guards', () => {
    expect(normalizeVaporProps(null)).toBeNull()
    for (const style of ['', 'color: red', new Map([['color', 'blue']])]) {
      const props = { class: [new Map([['foo', true]]), 'bar'], style }
      const expected = {
        class: 'bar',
        style: style ? normalizeStyle(style) : style,
      }
      expect(normalizeVaporProps(props)).toBe(props)
      expect(props).toEqual(expected)
    }
  })
})
