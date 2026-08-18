const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'

const OPTIONS_PAGE_PATH = '/pages/component-instance/circular-reference/circular-reference-options'
const COMPOSITION_PAGE_PATH = '/pages/component-instance/circular-reference/circular-reference-composition'

const platformInfo = process.env.uniTestPlatformInfo.toLowerCase()
const isMP = platformInfo.startsWith('mp')
const isAndroid = platformInfo.includes('android')

describe('', () => {
  if(isMP) {
    // TODO 小程序组件如果想递归自身需要注册为全局组件，后续再调研可行性
    it('not support', async () => {
      expect(1).toBe(1)
    })
    return
  }

  const test = async (pagePath) => {
    const page = await program.reLaunch(pagePath)
    await page.waitFor('view')

    if (isAndroid) {
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

  if (!isDom2) {
    it('circular-reference options API', async () => {
      await test(OPTIONS_PAGE_PATH)
    })
  }

  it('circular-reference composition API', async () => {
      await test(COMPOSITION_PAGE_PATH)
  })
})