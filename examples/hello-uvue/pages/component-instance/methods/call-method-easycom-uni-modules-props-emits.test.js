const OPTIONS_PAGE_PATH = "/pages/component-instance/methods/call-method-easycom-uni-modules-options"
const COMPOSITION_PAGE_PATH = "/pages/component-instance/methods/call-method-easycom-uni-modules-composition"

const platformInfo = process.env.uniTestPlatformInfo.toLowerCase()
const isIOS = platformInfo.startsWith('ios')
const isWeb = platformInfo.startsWith('web')
const isMP = platformInfo.startsWith('mp')
const isHarmony = platformInfo.startsWith('harmony')

describe('call method easycom uni modules', () => {
  if (
    isMP ||
    isWeb ||
    isHarmony ||
    (
    isIOS &&
      (
        platformInfo.indexOf('14.') != -1 ||
        platformInfo.indexOf('13.') != -1 ||
        platformInfo.indexOf('12.') != -1
      )
    )
  ) {
    it('not support', async () => {
      expect(1).toBe(1)
    })
    return
  }

  const test = async (pagePath) => {
    page = await program.reLaunch(pagePath)
    await page.waitFor('view')

    await page.callMethod('onButtonClick')
    await page.waitFor(1500)

    const resStr1 = await page.$("#isNumListValid")
    const resStr2 = await page.$("#isObjListValid")
    expect(await resStr1.text()).toBe(`true`)
    expect(await resStr2.text()).toBe(`true`)
  }

  it('选项式 API', async () => {
    await test(OPTIONS_PAGE_PATH)
  });

  it('组合式 API', async () => {
    await test(COMPOSITION_PAGE_PATH)
  })
})
