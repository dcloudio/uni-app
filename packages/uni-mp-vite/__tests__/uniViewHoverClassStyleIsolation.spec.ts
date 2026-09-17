const uniView = require('../lib/filters/uniView.cjs.js')

export {}

describe('uniView styleIsolation hover-class helper', () => {
  test('保留 none 并复用普通 class 的展开和幂等规则', () => {
    expect(uniView.h('none', 3)).toBe('none')
    expect(uniView.h('', 3)).toBe('')
    expect(uniView.h(null, 3)).toBe('')
    expect(uniView.h('is-parent-hover active', 3)).toBe(
      'is-parent-hover -a-is-parent-hover -p-is-parent-hover active -a-active -p-active'
    )
    expect(uniView.h('active', 4)).toBe('active -c-active')
    expect(uniView.h('none active', 1)).toBe('none -a-none active -a-active')
    expect(uniView.h('-p-is-parent-hover', 3)).toBe('-p-is-parent-hover')
  })
})
