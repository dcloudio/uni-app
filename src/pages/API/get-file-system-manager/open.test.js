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

const PAGE_PATH = pagePath('open')

const DEMO_ROOT = 'fsm-open-demo'

describe('FileSystemManager.open', () => {
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

  it('opens a file asynchronously', async () => {
    await setPageData(page, { filePath: `${DEMO_ROOT}/1.txt`, flag: 'r' })
    await callMethodAndWait(page, 'open')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'fd')).not.toEqual('')
  })

  it('opens a file synchronously', async () => {
    await setPageData(page, { filePath: `${DEMO_ROOT}/1.txt`, flag: 'r' })
    await callMethodAndWait(page, 'openSync')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'fd')).not.toEqual('')
  })

  it('opens the file with every supported flag', async () => {
    // 页面提供 r/r+/w/w+/a/a+ 六种 flag 单选，逐一验证打开成功
    const flags = ['r', 'r+', 'w', 'w+', 'a', 'a+']
    for (const flag of flags) {
      await setPageData(page, { filePath: `${DEMO_ROOT}/1.txt`, flag })
      await callMethodAndWait(page, 'openSync')
      expect(await readData(page, 'lastResult')).toEqual('success')
      expect(await readData(page, 'fd')).not.toEqual('')
    }
  })

  it('writes at the a+ flag boundary', async () => {
    await callMethodAndWait(page, 'prepare')
    await callMethodAndWait(page, 'flagWriteDemo')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'flagWriteRet')).toBe(true)
  })

  it('writes a long string at the a+ flag boundary', async () => {
    await callMethodAndWait(page, 'prepare')
    await callMethodAndWait(page, 'flagWriteLongDemo')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'flagWriteRet')).toBe(true)
  })

  it('reports opening a missing file with flag r', async () => {
    await setPageData(page, { filePath: `${DEMO_ROOT}/missing.txt`, flag: 'r' })
    await callMethodAndWait(page, 'open')
    expect(await readData(page, 'lastResult')).toEqual('fail')
    expect((await readData(page, 'lastFailError')).errCode).toEqual(1300002)
  })

  it('taps the async button and finishes', async () => {
    await setPageData(page, { filePath: `${DEMO_ROOT}/1.txt`, flag: 'r' })
    await tapAndWait(page, '#btn-open')
    expect(await readData(page, 'lastResult')).toEqual('success')
  })
})
