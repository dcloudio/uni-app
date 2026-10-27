const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isApp = isAndroid || isIos || isHarmony
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

describe('css-prefers-color-scheme', () => {
  let page
  let originalTheme = 'light'
  let deviceShotOptions = {}

  if (!isApp || isAppWebView) {
    it('skip-current-platform', () => {
      expect(1).toBe(1)
    })
    return
  }

  async function setAppThemeAndWait(theme) {
    await program.callUniMethod('setAppTheme', {
      theme,
    })
    await page.waitFor(600)
  }

  async function takeSnapshot(name) {
    const image = await program.screenshot(deviceShotOptions)
    expect(image).toSaveImageSnapshot({
      customSnapshotIdentifier() {
        return `pages-CSS-prefers-color-scheme-${name}`
      }
    })
  }

  beforeAll(async () => {
    page = await program.reLaunch('/pages/CSS/prefers-color-scheme/prefers-color-scheme')
    await page.waitFor('view')
    await page.waitFor(500)

    const systemInfo = await program.systemInfo()
    originalTheme = systemInfo.appTheme ?? 'light'

    const windowInfo = await program.callUniMethod('getWindowInfo')
    deviceShotOptions = {
      deviceShot: true,
      area: {
        x: 0,
        y: windowInfo.safeAreaInsets.top + 44,
        width: windowInfo.safeArea.width - 8,
        height: windowInfo.safeArea.height - 40,
      },
    }
  })

  it('screenshot-light-theme', async () => {
    await setAppThemeAndWait('light')
    await takeSnapshot('light')
  })

  it('screenshot-dark-theme', async () => {
    await setAppThemeAndWait('dark')
    await takeSnapshot('dark')
  })

  afterAll(async () => {
    await setAppThemeAndWait(originalTheme)
  })
})
