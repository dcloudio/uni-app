import IdentifierGenerator from '../src/identifier'
const ids = new IdentifierGenerator()
describe('identifier', () => {
  test('id', () => {
    expect(ids.next()).toBe('a')
    expect(ids.next()).toBe('b')
    for (let i = 0; i < 50; i++) {
      ids.next()
    }
    expect(ids.next()).toBe('ab')
    expect(ids.next()).toBe('ac')
    // do if in 已被忽略
    for (let i = 0; i < 52 * 52 - 2; i++) {
      ids.next()
    }
    expect(ids.next()).toBe('acf')
    expect(ids.next()).toBe('acg')
  })
})
