const { format } = require('../lib/lang')

describe('format', () => {
  it('env.lang', () => {
    expect(format('zh_CN.UTF_8')).toBe('zh_CN')
  })
})
