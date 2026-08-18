const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
  
const PAGE_PATH = '/pages/component-instance/slots/slots-options'
const PAGE_COMPOSITION_PATH = '/pages/component-instance/slots/slots-composition'

describe('$slots', () => {
  if(isMP) {
    it('not support mp', async () => {
      expect(1).toBe(1)
    })
    return
  }

  const test = async (pagePath) => {
    const page = await program.reLaunch(pagePath)
    await page.waitFor('view')
    // mp 无法获取组件实例
    const slotComp = await page.$('#slot-comp')
    const hasSlots = await slotComp.callMethod('hasSlots')
    expect(hasSlots).toBe(true)
  }

  if (!isDom2) {
    it('$slots Options API', async () => {
      await test(PAGE_PATH)
    })
  }

  it('$slots Composition API', async () => {
    await test(PAGE_COMPOSITION_PATH)
  })
})
