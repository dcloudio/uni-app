const PAGE_PATH_OPTIONS = '/pages/built-in/component/teleport/teleport-options'
const PAGE_PATH_COMPONSITION = '/pages/built-in/component/teleport/teleport-composition'

describe('teleport', () => {
  const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
  const isIOS = platformInfo.includes('ios')
  const isMP = platformInfo.startsWith('mp')
  if(isMP || isIOS) {
    it('not support', async () => {
      expect(1).toBe(1)
    })
    return
  }

  let page = null
  const test = async () => {
    await page.waitFor('view')
    await page.waitFor(500)
    const image = await program.screenshot();
    expect(image).toSaveImageSnapshot();
  }
  it('teleport Options API', async () => {
    page = await program.reLaunch(PAGE_PATH_OPTIONS)
    await test()
  })
  it('teleport Composition API', async () => {
    page = await program.reLaunch(PAGE_PATH_COMPONSITION)
    await test()
  })
})