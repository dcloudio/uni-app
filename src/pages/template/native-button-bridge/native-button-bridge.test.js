const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isVapor = process.env.UNI_APP_X_DOM2 === 'true'

const PAGE_PATH = '/pages/template/native-button-bridge/native-button-bridge'

describe('template-native-button-bridge', () => {
  if (isMP || isVapor || (!isAndroid && !isIos)) {
    it('only supports non-vapor android and ios app', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    await page.waitFor(300)
  })

  it('renders uts button bridge component', async () => {
    const utsButton = await page.$('uts-button')
    expect(utsButton).not.toBeNull()
    expect(await utsButton.text()).toBe('uts button')
    const size = await utsButton.size()
    expect(size.width).toBeGreaterThan(0)
    expect(size.height).toBeGreaterThan(0)
  })
})
