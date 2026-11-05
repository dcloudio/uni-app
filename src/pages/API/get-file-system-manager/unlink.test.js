const {
  isIOS,
  isUnsupported,
  pagePath,
  launchPage,
  setPageData,
  readData,
  callMethodAndWait,
  tapAndWait,
  pathExists,
  unsupportedTest
} = require('./fsm-test-utils')

const PAGE_PATH = pagePath('unlink')

const DEMO_ROOT = 'fsm-unlink-demo'

describe('FileSystemManager.unlink', () => {
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

  it('unlinks a file without removing its directory', async () => {
    await callMethodAndWait(page, 'prepare')
    await setPageData(page, { filePath: `${DEMO_ROOT}/1.txt` })
    await callMethodAndWait(page, 'unlink')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await pathExists(page, `${DEMO_ROOT}/1.txt`)).toBe(false)
  })

  it('unlinks a file synchronously', async () => {
    await callMethodAndWait(page, 'prepare')
    await setPageData(page, { filePath: `${DEMO_ROOT}/1.txt` })
    await callMethodAndWait(page, 'unlinkSync')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await pathExists(page, `${DEMO_ROOT}/1.txt`)).toBe(false)
  })

  it('reports a missing file', async () => {
    await setPageData(page, { filePath: `${DEMO_ROOT}/missing.txt` })
    await callMethodAndWait(page, 'unlink')
    expect(await readData(page, 'lastResult')).toEqual('fail')
    expect((await readData(page, 'lastFailError')).errCode).toEqual(1300002)
  })

  it('keeps a bundled static asset read-only', async () => {
    if (!isIOS) {
      await callMethodAndWait(page, 'demoStatic')
      // iOS 与部分平台对包内资源的 unlink 行为不同，但资源必须仍然存在
      expect(await pathExists(page, '/static/test-image/logo.ico')).toBe(true)
    }
  })

  it('taps the async button and finishes', async () => {
    await callMethodAndWait(page, 'prepare')
    await setPageData(page, { filePath: `${DEMO_ROOT}/1.txt` })
    await tapAndWait(page, '#btn-unlink')
    expect(await readData(page, 'lastResult')).toEqual('success')
  })
})
