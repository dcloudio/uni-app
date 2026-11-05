const {
  isHarmony,
  isUnsupported,
  pagePath,
  launchPage,
  setPageData,
  readData,
  callMethodAndWait,
  tapAndWait,
  unsupportedTest
} = require('./fsm-test-utils')

const PAGE_PATH = pagePath('read')

describe('FileSystemManager.read', () => {
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

  it('reads through a descriptor asynchronously', async () => {
    await setPageData(page, { positionText: '10', lengthText: '8' })
    await callMethodAndWait(page, 'read')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'bytesRead')).toEqual(8)
    expect(await readData(page, 'bufferValue')).toEqual(1.24)
  })

  it('reads through a descriptor synchronously', async () => {
    await setPageData(page, { positionText: '10', lengthText: '8' })
    await callMethodAndWait(page, 'readSync')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'bufferValue')).toEqual(1.24)
  })

  it('round-trips an ArrayBuffer through a descriptor asynchronously', async () => {
    await callMethodAndWait(page, 'writeReadBuffer')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'bufferValue')).toEqual(1.24)
  })

  it('round-trips an ArrayBuffer through a descriptor synchronously', async () => {
    await callMethodAndWait(page, 'writeReadBufferSync')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'bufferValue')).toEqual(1.11)
  })

  it('reports an invalid descriptor', async () => {
    // harmony 平台对无效 fd 的错误响应会导致自动化通道异常（CI 上表现为 socket TypeError），暂跳过
    if (isHarmony) return
    await callMethodAndWait(page, 'demoFail')
    expect(await readData(page, 'lastResult')).toEqual('fail')
  })

  it('taps the async button and finishes', async () => {
    await setPageData(page, { positionText: '10', lengthText: '8' })
    await tapAndWait(page, '#btn-read')
    expect(await readData(page, 'lastResult')).toEqual('success')
  })
})
