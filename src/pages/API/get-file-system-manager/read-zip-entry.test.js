const {
  isUnsupported,
  pagePath,
  launchPage,
  readData,
  callMethodAndWait,
  tapAndWait,
  unsupportedTest
} = require('./fsm-test-utils')

const PAGE_PATH = pagePath('read-zip-entry')

describe('FileSystemManager.readZipEntry', () => {
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

  it('reads entries from a bundled zip file', async () => {
    await callMethodAndWait(page, 'readZipEntry')
    expect(await readData(page, 'lastResult')).toEqual('success')
    const entries = await readData(page, 'zipEntryNames')
    expect(entries).toContain('1.txt')
    expect(entries).toContain('2.txt')
  })

  it('taps the async button and finishes', async () => {
    await tapAndWait(page, '#btn-readzip-entry')
    expect(await readData(page, 'lastResult')).toEqual('success')
  })
})
