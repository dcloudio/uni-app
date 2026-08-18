const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'

const PAGE_PATH_OPTIONS = '/pages/built-in/component/teleport/teleport-options'
const PAGE_PATH_COMPONSITION = '/pages/built-in/component/teleport/teleport-composition'

describe('teleport', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isIOS = platformInfo.includes('ios')
  const isMP = platformInfo.startsWith('mp')
  if(isMP || isDom2) {
    it('not support', async () => {
      expect(1).toBe(1)
    })
    return
  }

  const test = async (pagePath) => {
    const page = await program.reLaunch(pagePath)
    await page.waitFor('view')
    await page.waitFor(500)
    
    const image = await program.screenshot();
    expect(image).toSaveImageSnapshot();
  }
  it('teleport Options API', async () => {
    await test(PAGE_PATH_OPTIONS)
  })
  it('teleport Composition API', async () => {
    await test(PAGE_PATH_COMPONSITION)
  })
})