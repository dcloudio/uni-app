const {
  isUnsupported,
  pagePath,
  launchPage,
  setPageData,
  readData,
  callMethodAndWait,
  tapAndWait,
  unsupportedTest
} = require('./fsm-test-utils')

const PAGE_PATH = pagePath('readdir')

const DEMO_ROOT = 'fsm-readdir-demo'

describe('FileSystemManager.readdir', () => {
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

  it('lists files and subdirectories', async () => {
    await setPageData(page, { dirPath: DEMO_ROOT })
    await callMethodAndWait(page, 'readdir')
    expect(await readData(page, 'lastResult')).toEqual('success')
    const list = await readData(page, 'fileList')
    expect(list.sort()).toEqual(['1.txt', '2.txt', 'sub'])
  })

  it('lists an empty directory synchronously', async () => {
    await setPageData(page, { dirPath: `${DEMO_ROOT}/sub` })
    await callMethodAndWait(page, 'readdirSync')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'fileList')).toEqual([])
  })

  it('reports a missing directory', async () => {
    await setPageData(page, { dirPath: `${DEMO_ROOT}/missing` })
    await callMethodAndWait(page, 'readdir')
    expect(await readData(page, 'lastResult')).toEqual('fail')
    expect((await readData(page, 'lastFailError')).errCode).toEqual(1300002)
  })

  it('taps the async button and finishes', async () => {
    await setPageData(page, { dirPath: DEMO_ROOT })
    await tapAndWait(page, '#btn-readdir')
    expect(await readData(page, 'lastResult')).toEqual('success')
  })
})
