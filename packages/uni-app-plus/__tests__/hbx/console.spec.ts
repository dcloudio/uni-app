import { normalizeLog } from '../../src/service/api/plugin/log'
const filename = 'foo.vue'
describe('console', () => {
  test('console.log format', () => {
    expect(
      normalizeLog('log', 'at ' + filename + ':1', ['a', 'b', { a: 1 }])
    ).toBe(
      `a---COMMA---b---COMMA------BEGIN:JSON---{"a":1}---END:JSON--- at foo.vue:1`
    )
  })
})
