const uniView = require('../lib/filters/uniView.cjs.js')

export {}

describe('uniView styleIsolation class helper', () => {
  test('按 mask 展开 class 并处理空白', () => {
    expect(uniView.c(' foo\tbar\nbaz\rqux\f ', 3)).toBe(
      'foo -a-foo -p-foo bar -a-bar -p-bar baz -a-baz -p-baz qux -a-qux -p-qux'
    )
    expect(uniView.c('', 7)).toBe('')
    expect(uniView.c(null, 7)).toBe('')
  })

  test('已带隔离前缀的 class 保持幂等', () => {
    expect(uniView.c('-a-foo -p-bar -c-baz', 7)).toBe('-a-foo -p-bar -c-baz')
    const expanded = uniView.c('foo', 7)
    expect(uniView.c(expanded, 7)).toBe(expanded)
  })

  test('组件 mask 只补组件前缀', () => {
    expect(uniView.c('foo', 4)).toBe('foo -c-foo')
  })
})
