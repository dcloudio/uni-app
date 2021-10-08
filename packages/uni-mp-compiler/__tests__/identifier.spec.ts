import IdentifierGenerator from '../src/identifier'
const ids = new IdentifierGenerator()
describe('identifier', () => {
  test('id', () => {
    expect(ids.next()).toBe('a')
    expect(ids.next()).toBe('b')
    for (let i = 0; i < 50; i++) {
      ids.next()
    }
    expect(ids.next()).toBe('aa')
    expect(ids.next()).toBe('ab')
    for (let i = 0; i < 52 * 52 - 2; i++) {
      ids.next()
    }
    expect(ids.next()).toBe('aaa')
    expect(ids.next()).toBe('aab')
  })
})
