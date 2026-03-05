const OPTIONS_PAGE_PATH = '/pages/directive/v-on/v-on-options'
const COMPOSITION_PAGE_PATH = '/pages/directive/v-on/v-on-composition'

describe('v-on', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLowerCase()
  const isAndroid = platformInfo.startsWith('android')
  const isIOS = platformInfo.startsWith('ios')
  const isMP = platformInfo.startsWith('mp')
  const isHarmony = platformInfo.includes('harmony')
  let page

  const test = async (pagePath) => {
    page = await program.reLaunch(pagePath)
    await page.waitFor('view')

    const count = await page.$('#count')
    expect(await count.text()).toBe('0')

    const btnList = await page.$$('.btn')
    for (let i = 0; i < btnList.length; i++) {
      await btnList[i].tap()
      await page.waitFor(500)
    }
    
    const supportedCount = (isIOS || isHarmony) ? '7' : isMP ? '5' : '8'
    
    expect(await count.text()).toBe(supportedCount)

    if (!isIOS && !isMP && !isHarmony) {
      const onceBtn = await page.$('#btn-once')
      await onceBtn.tap()
      expect(await count.text()).toBe(supportedCount)
    }
    if (isAndroid || isIOS) {
      const btnPreventRect = (await page.data('btnPreventRect')).value
      const x = Math.ceil(btnPreventRect.x + btnPreventRect.width / 2)
      const y = Math.ceil(btnPreventRect.y + btnPreventRect.height / 2.0)
      await program.tap({
        x: x,
        y: y,
        duration: 100
      })
      expect(await count.text()).toBe(supportedCount)
    }
  }

  it('v-on options API', async () => {
    await test(OPTIONS_PAGE_PATH)
  })

  it('v-on composition API', async () => {
    await test(COMPOSITION_PAGE_PATH)
  })
})