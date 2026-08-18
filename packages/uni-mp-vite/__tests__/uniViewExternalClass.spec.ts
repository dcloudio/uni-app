const uniView = require('../lib/filters/uniView.cjs.js')

export {}

describe('uniView externalClass helper', () => {
  test('不保留 externalClass 原名并处理多 class 和空值', () => {
    expect(uniView.c(' foo\tbar ', 3, 0)).toBe('-a-foo -p-foo -a-bar -p-bar')
    expect(uniView.c('', 3, 0)).toBe('')
    expect(uniView.c(null, 3, 0)).toBe('')
  })

  test('转发已展开 externalClass 时保持幂等', () => {
    expect(uniView.c('-a-foo -p-foo', 4, 0)).toBe('-a-foo -p-foo')
    expect(uniView.c('-a-foo -p-foo', 4)).toBe('-a-foo -p-foo')
  })
})
