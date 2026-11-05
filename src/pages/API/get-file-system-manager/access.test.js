const {
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

const PAGE_PATH = pagePath('access')

const DEMO_ROOT = 'fsm-access-demo'

describe('FileSystemManager.access', () => {
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

  it('reports an existing file', async () => {
    await setPageData(page, { accessPath: `${DEMO_ROOT}/1.txt` })
    await callMethodAndWait(page, 'access')
    expect(await readData(page, 'lastResult')).toEqual('success')
  })

  it('reports a missing file', async () => {
    await setPageData(page, { accessPath: `${DEMO_ROOT}/missing.txt` })
    await callMethodAndWait(page, 'access')
    expect(await readData(page, 'lastResult')).toEqual('fail')
    expect((await readData(page, 'lastFailError')).errCode).toEqual(1300002)
  })

  it('reports an existing directory synchronously', async () => {
    await setPageData(page, { accessPath: DEMO_ROOT })
    await callMethodAndWait(page, 'accessSync')
    expect(await readData(page, 'lastResult')).toEqual('success')
  })

  it('keeps a bundled static asset readable', async () => {
    await callMethodAndWait(page, 'demoStatic')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await pathExists(page, '/static/test-image/logo.ico')).toBe(true)
  })

  it('taps the async button and finishes', async () => {
    await setPageData(page, { accessPath: `${DEMO_ROOT}/1.txt` })
    await tapAndWait(page, '#btn-access')
    expect(await readData(page, 'lastResult')).toEqual('success')
  })
})
