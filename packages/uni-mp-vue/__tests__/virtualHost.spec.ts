import { parseVirtualHostClass } from '../src/helpers/virtualHost'

describe('virtualHost', () => {
  describe('parseVirtualHostClass', () => {
    test('should append original and ^ prefixed class names', () => {
      expect(parseVirtualHostClass('')).toBe('')
      expect(parseVirtualHostClass('a')).toBe('a ^a')
      expect(parseVirtualHostClass('a b')).toBe('a ^a b ^b')
      expect(parseVirtualHostClass('a b c')).toBe('a ^a b ^b c ^c')
      expect(parseVirtualHostClass(['a', 'b', 'c', ''])).toBe('a ^a b ^b c ^c')
      expect(parseVirtualHostClass([])).toBe('')
    })

    test('should de-duplicate repeated class names', () => {
      expect(parseVirtualHostClass('a a b a')).toBe('a ^a b ^b')
      expect(parseVirtualHostClass(['a', 'a', 'b', 'a'])).toBe('a ^a b ^b')
    })

    test('should ignore extra whitespace and empty class names', () => {
      expect(parseVirtualHostClass('  a   b  ')).toBe('a ^a b ^b')
      expect(parseVirtualHostClass([' a ', '', 'b', '  '])).toBe('a ^a b ^b')
    })

    test('should handle classes that already have ^ prefix', () => {
      expect(parseVirtualHostClass('^a')).toBe('a ^^a')
      expect(parseVirtualHostClass('^a ^b')).toBe('a ^^a b ^^b')
      expect(parseVirtualHostClass(['a', '^a'])).toBe('a ^a ^^a')
    })
  })
})
