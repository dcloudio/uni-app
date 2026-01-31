import { parseVirtualHostClass } from '../src/helpers/virtualHost'

describe('virtualHost', () => {
  describe('parseVirtualHostClass with __X_STYLE_ISOLATION__ = false', () => {
    beforeAll(() => {
      global.__X_STYLE_ISOLATION__ = false
    })

    test('should add ^ prefix to class names', () => {
      expect(parseVirtualHostClass('')).toBe('')
      expect(parseVirtualHostClass('a')).toBe('^a')
      expect(parseVirtualHostClass('a b')).toBe('^a ^b')
      expect(parseVirtualHostClass('a b c')).toBe('^a ^b ^c')
      expect(parseVirtualHostClass(['a', 'b', 'c', ''])).toBe('^a ^b ^c')
      expect(parseVirtualHostClass([])).toBe('')
    })
  })

  describe('parseVirtualHostClass with __X_STYLE_ISOLATION__ = true', () => {
    beforeAll(() => {
      global.__X_STYLE_ISOLATION__ = true
    })

    test('should add both original and ^ prefixed class names', () => {
      expect(parseVirtualHostClass('')).toBe('')
      expect(parseVirtualHostClass('a')).toBe('a ^a')
      expect(parseVirtualHostClass('a b')).toBe('a ^a b ^b')
      expect(parseVirtualHostClass('a b c')).toBe('a ^a b ^b c ^c')
      expect(parseVirtualHostClass(['a', 'b', 'c', ''])).toBe('a ^a b ^b c ^c')
      expect(parseVirtualHostClass([])).toBe('')
    })

    test('should handle classes that already have ^ prefix', () => {
      expect(parseVirtualHostClass('^a')).toBe('a ^^a')
      expect(parseVirtualHostClass('^a ^b')).toBe('a ^^a b ^^b')
    })
  })
})
