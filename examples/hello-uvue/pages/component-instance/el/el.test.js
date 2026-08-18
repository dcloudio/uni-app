const platformInfo = process.env.uniTestPlatformInfo.toLowerCase()
const isAndroid = platformInfo.includes('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isApp = isAndroid || isIos || isHarmony

const isMP = platformInfo.startsWith('mp')

const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'

const OPTIONS_PAGE_PATH = '/pages/component-instance/el/el-options'
const COMPOSITION_PAGE_PATH = '/pages/component-instance/el/el-composition'

describe('$el', () => {
  if(isMP) {
    it('not support', async () => {
      expect(1).toBe(1)
    })
    return
  }
  const test = async (pagePath) => {
    const page = await program.reLaunch(pagePath)
    await page.waitFor('view')

    const el = await page.$('.tag-name')
    // TODO: dom2 为了实现页面默认可滚动，会在页面根节点不是 scroll-view 的情况下，在页面增加一个 scroll-view 作为根节点，导致 $el 获取到的元素是 scroll-view
    expect(await el.text()).toBe(isDom2 && isApp? 'PAGE' : 'VIEW')
  }
  if (!isDom2) {
    it('$el 选项式 API', async () => {
      await test(OPTIONS_PAGE_PATH)
    });
  }

  it('$el 组合式 API', async () => {
    await test(COMPOSITION_PAGE_PATH)
  })
})
