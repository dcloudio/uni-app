const OPTIONS_PAGE_PATH = '/pages/render-function/cloneVNode/cloneVNode-options'
const COMPOSITION_PAGE_PATH = '/pages/render-function/cloneVNode/cloneVNode-composition'

describe('cloneVNode', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isWeb = platformInfo.startsWith('web')
  const isIos = platformInfo.startsWith('ios')
  const isMP = platformInfo.startsWith('mp')
  if(isMP) {
    it('not support', async () => {
      expect(1).toBe(1)
    })
    return
  }
  if (isWeb) {
    it("web platform test cannot get render dom", async () => {
      expect(1).toBe(1);
    });
    return
  }

  let page = null
  const test = async (pagePath) => {
    page = await program.reLaunch(pagePath)
    await page.waitFor('view')

    const original = await page.$('.original')
    expect(await original.style('backgroundColor')).toBe('#ff0000')

    if (!isIos) {
      // ios options API 合并属性无效
      const cloned = await page.$('.cloned')
      expect(await cloned.style('backgroundColor')).toBe('#00ff00')
    }
  }

  it('cloneVNode options API', async () => {
    await test(OPTIONS_PAGE_PATH)
  })

  it('cloneVNode composition API', async () => {
    if (!isIos) {
      await test(COMPOSITION_PAGE_PATH)
    } else {
      // TODO: ios 端 defineOptions + render 页面空白
      expect(1).toBe(1);
    }
  })
})