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

const PAGE_PATH = pagePath('close')

describe('FileSystemManager.close', () => {
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

  it('closes a descriptor asynchronously', async () => {
    await callMethodAndWait(page, 'close')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'closeRet')).toEqual('close:ok')
  })

  it('closes a descriptor synchronously', async () => {
    await callMethodAndWait(page, 'closeSync')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'closeRet')).toEqual('close:ok')
  })

  it('reports an invalid descriptor', async () => {
    // harmony 平台对无效 fd 的错误响应会导致自动化通道异常（CI 上表现为 socket TypeError），暂跳过
    if (isHarmony) return
    await callMethodAndWait(page, 'demoFail')
    expect(await readData(page, 'lastResult')).toEqual('fail')
  })

  it('taps the async button and finishes', async () => {
    await tapAndWait(page, '#btn-close')
    expect(await readData(page, 'lastResult')).toEqual('success')
  })
})
