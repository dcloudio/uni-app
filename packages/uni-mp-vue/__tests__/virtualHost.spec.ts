import { parseVirtualHostClass } from '../src/helpers/virtualHost'

describe('virtualHost', () => {
  test('parseVirtualHostClass', () => {
    expect(parseVirtualHostClass('')).toBe('')
    expect(parseVirtualHostClass('a')).toBe('^a')
    expect(parseVirtualHostClass('a b')).toBe('^a ^b')
    expect(parseVirtualHostClass('a b c')).toBe('^a ^b ^c')
    expect(parseVirtualHostClass(['a', 'b', 'c', ''])).toBe('^a ^b ^c')
    expect(parseVirtualHostClass([])).toBe('')
  })
})
