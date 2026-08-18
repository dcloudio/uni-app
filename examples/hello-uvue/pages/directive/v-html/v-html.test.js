const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'

const OPTIONS_PAGE_PATH = '/pages/directive/v-html/v-html-options'
const COMPOSITION_PAGE_PATH = '/pages/directive/v-html/v-html-composition'

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isIOS = platformInfo.includes('ios')
const isMP = platformInfo.startsWith('mp')
const isHarmony = platformInfo.includes('harmony')

describe('v-html', () => {
  if (isIOS || isMP || isHarmony || isDom2) {
    it("not support", async () => {
      expect(1).toBe(1);
    });
    return
  }

  const test = async (pagePath) => {
    const page = await program.reLaunch(pagePath)
    await page.waitFor('view')
    await page.waitFor(500)

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