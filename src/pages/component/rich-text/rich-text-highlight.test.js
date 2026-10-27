const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isHarmony = platformInfo.startsWith('harmony')
const isIOS = platformInfo.startsWith('ios')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
const isVapor = process.env.UNI_APP_X_DOM2 === 'true'

const PAGE_PATH = '/pages/component/rich-text/rich-text-highlight'

const CASE_SNAPSHOT_NAMES = [
  'highlight-bg-text-color',
  'highlight-bg-text-background',
  'handle-color-text-color',
  'handle-color-text-background',
  'text-color-text-background',
  'text-highlight-bg-background-handle-color',
  'text-handle-color-background-highlight-bg',
  'text-background-highlight-bg',
  'text-background-handle-color',
  'normal-control'
]

describe('rich-text-highlight', () => {
  if (isMP || process.env.UNI_TEST_DEVICES_DIRECTION == 'landscape') {
    it('skip', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    await page.waitFor(1500)
  })

  async function setPageData(newData) {
    return await page.setData({
      data: newData
    })
  }

  async function setMode(mode) {
    const currentMode = await page.data('data.mode')
    if (currentMode == mode) {
      return
    }
    await setPageData({
      mode
    })
    await page.waitFor(1000)
    expect(await page.data('data.mode')).toBe(mode)
  }

  async function setCase(index) {
    await page.callMethod('setCase', index)
    await page.waitFor(500)
    expect(await page.data('data.currentCaseIndex')).toBe(index)
  }

  async function screenshot(name) {
    const image = await program.screenshot({
      fullPage: true
    })
    expect(image).toSaveImageSnapshot({
      customSnapshotIdentifier() {
        return name
      }
    })
  }

  CASE_SNAPSHOT_NAMES.forEach((name, index) => {
    it(`rich-text-highlight-web-${name}`, async () => {
      await setMode('web')
      await setCase(index)
      await screenshot(`rich-text-highlight-web-${name}`)
    })
  })

  if ((isAndroid || ((isHarmony || isIOS) && isVapor)) && !isAppWebView && !isWeb) {
    CASE_SNAPSHOT_NAMES.forEach((name, index) => {
      it(`rich-text-highlight-native-${name}`, async () => {
        await setMode('native')
        await setCase(index)
        await screenshot(`rich-text-highlight-native-${name}`)
      })
    })
  }
})
