const {
  isVapor,
  isHarmony,
  isUnsupported,
  pagePath,
  launchPage,
  readData,
  callMethodAndWait,
  tapAndWait,
  unsupportedTest
} = require('./fsm-test-utils')

const PAGE_PATH = pagePath('unzip')

describe('FileSystemManager.unzip', () => {
  if (isUnsupported) {
    unsupportedTest()
    return
  }

  let page

  beforeAll(async () => {
    page = await launchPage(PAGE_PATH)
    await callMethodAndWait(page, 'prepare')
  })

  afterAll(async () => {
    await page.callMethod('cleanup')
  })

  it('unzips a bundled archive asynchronously', async () => {
    await callMethodAndWait(page, 'unzip')
    expect(await readData(page, 'lastResult')).toEqual('success')
    const entries = await readData(page, 'fileList')
    expect(entries).toContain('1.txt')
    expect(entries).toContain('2.txt')
  })

  if (isVapor) {
    it('unzips a bundled archive synchronously', async () => {
      if (isHarmony) {
        const systemInfo = await program.systemInfo()
        const osHarmonySDKAPIVersion = systemInfo.osHarmonySDKAPIVersion
        if (osHarmonySDKAPIVersion < 26) {
          return
        }
      }
      await callMethodAndWait(page, 'unzipSync')
      expect(await readData(page, 'lastResult')).toEqual('success')
      expect(await readData(page, 'unzipSyncRet')).toEqual('unzip:ok')
    })
  }

  it('taps the async button and finishes', async () => {
    await callMethodAndWait(page, 'prepare')
    await tapAndWait(page, '#btn-unzip')
    expect(await readData(page, 'lastResult')).toEqual('success')
  })
})
