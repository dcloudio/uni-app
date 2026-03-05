const OPTIONS_PAGE_PATH = '/pages/component-instance/circular-reference/circular-reference-options'
const COMPOSITION_PAGE_PATH = '/pages/component-instance/circular-reference/circular-reference-composition'

const platformInfo = process.env.uniTestPlatformInfo.toLowerCase()
const isIOS = platformInfo.startsWith('ios')
const isWeb = platformInfo.startsWith('web')
const isMP = platformInfo.startsWith('mp')

describe('', () => {
  if(isMP) {
    // TODO 小程序组件如果想递归自身需要注册为全局组件，后续再调研可行性
    it('not support', async () => {
      expect(1).toBe(1)
    })
    return
  }
  let page

  const test = async (page) => {
    if (process.env.uniTestPlatformInfo.toLowerCase().includes('android')) {
      // cross reference
      const childA = await page.$$('.child-a')
      expect(childA.length).toBe(3)

      const childB = await page.$$('.child-b')
      expect(childB.length).toBe(2)
    }

    // reference self
    const childC = await page.$$('.child-c')
    expect(childC.length).toBe(5)
  }

  it('circular-reference options API', async () => {
    page = await program.reLaunch(OPTIONS_PAGE_PATH)
    await page.waitFor('view')

    await test(page)
  })

  it('circular-reference composition API', async () => {
    page = await program.reLaunch(COMPOSITION_PAGE_PATH)
    await page.waitFor('view')

    await test(page)
  })
})