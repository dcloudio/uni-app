const OPTIONS_PAGE_PATH = '/pages/directive/v-html/v-html-options'
const COMPOSITION_PAGE_PATH = '/pages/directive/v-html/v-html-composition'

// TODO: ios 暂不支持

describe('v-html', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isIOS = platformInfo.includes('ios')
  const isMP = platformInfo.startsWith('mp')
  const isHarmony = platformInfo.includes('harmony')
  if (isIOS || isMP || isHarmony) {
    it("not support", async () => {
      expect(1).toBe(1);
    });
    return
  }
  let page
  
  const test = async (pagePath) => {
    page = await program.reLaunch(pagePath)
    await page.waitFor(700)

    const image = await program.screenshot()
    expect(image).toSaveImageSnapshot()
  }
  
  it('v-html options API', async () => {
    await test(OPTIONS_PAGE_PATH)
  })
  
  it('v-html composition API', async () => {
    await test(COMPOSITION_PAGE_PATH)
  })
})