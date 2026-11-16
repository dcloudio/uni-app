const { canAssertMedia, readMediaState, saveMediaScreenshots } = require('./test-utils.js')
const platformInfo = (process.env.uniTestPlatformInfo || '').toLowerCase()
const conditionIds = [
  'pointer-none', 'pointer-coarse', 'pointer-fine', 'hover-none', 'hover-hover',
  'any-pointer-none', 'any-pointer-coarse', 'any-pointer-fine', 'any-hover-none', 'any-hover-hover',
  'pointer-boolean', 'hover-boolean', 'any-pointer-boolean', 'any-hover-boolean', 'not-fine', 'mixed-pointer',
]

jest.setTimeout(60000)

describe('css-media-pointer-hover', () => {
  // 页面目前仅在 App、Web 和微信小程序注册。
  if (platformInfo.startsWith('mp-') && !platformInfo.startsWith('mp-weixin')) {
    it.skip('当前小程序尚未开放输入设备示例', () => {})
    return
  }

  it('输入条件保持一致，并保存当前设备状态截图', async () => {
    const page = await program.reLaunch('/pages/CSS/media-query/pointer-hover')
    await page.waitFor('scroll-view')
    if (canAssertMedia) {
      let state
      await page.waitFor(async () => {
        state = await readMediaState(page, conditionIds, 'pointer-hover-component')
        return state != null &&
          ['pointer-none', 'pointer-coarse', 'pointer-fine'].filter(id => state[id]).length === 1 &&
          ['hover-none', 'hover-hover'].filter(id => state[id]).length === 1 &&
          ['any-hover-none', 'any-hover-hover'].filter(id => state[id]).length === 1
      }, 5000)
      // 不假定已连接哪些外设，也不把原生 App 的主要设备策略套用到浏览器或小程序。
      expect(state['pointer-boolean']).toBe(!state['pointer-none'])
      expect(state['hover-boolean']).toBe(state['hover-hover'])
      expect(state['any-pointer-none']).toBe(!state['any-pointer-coarse'] && !state['any-pointer-fine'])
      expect(state['any-pointer-boolean']).toBe(!state['any-pointer-none'])
      expect(state['any-hover-boolean']).toBe(state['any-hover-hover'])
      expect(state['not-fine']).toBe(!state['pointer-fine'])
      expect(state['mixed-pointer']).toBe(state['any-pointer-coarse'] && state['any-pointer-fine'])
    }
    await saveMediaScreenshots(page, 'pointer-hover')
  })
})
