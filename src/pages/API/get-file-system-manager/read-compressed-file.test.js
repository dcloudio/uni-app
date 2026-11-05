const {
  isHarmony,
  isUnsupported,
  pagePath,
  launchPage,
  readData,
  callMethodAndWait,
  tapAndWait,
  unsupportedTest
} = require('./fsm-test-utils')

const PAGE_PATH = pagePath('read-compressed-file')

describe('FileSystemManager.readCompressedFile', () => {
  if (isUnsupported) {
    unsupportedTest()
    return
  }
  if (isHarmony) {
    // 鸿蒙暂不支持这两个 API
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

  it('reads a Brotli-compressed file asynchronously', async () => {
    await callMethodAndWait(page, 'readCompressedFile')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'compressedFileRet')).toEqual('fdsafds')
  })

  it('reads a Brotli-compressed file synchronously', async () => {
    await callMethodAndWait(page, 'readCompressedFileSync')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'compressedFileRet')).toEqual('fdsafds')
  })

  it('taps the async button and finishes', async () => {
    await tapAndWait(page, '#btn-compressed-file')
    expect(await readData(page, 'lastResult')).toEqual('success')
  })
})
