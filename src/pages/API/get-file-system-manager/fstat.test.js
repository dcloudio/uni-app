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

const PAGE_PATH = pagePath('fstat')

// 专用文本（含 \n、\t、\r\n、反斜杠、引号、全角/不间断空格等符号）的 UTF-8 字节数
const BASE_SIZE = 198

describe('FileSystemManager.fstat', () => {
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

  it('reads stats through a descriptor asynchronously', async () => {
    await callMethodAndWait(page, 'fstat')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'fstatSize')).toEqual(BASE_SIZE)
  })

  it('reads stats through a descriptor synchronously', async () => {
    await callMethodAndWait(page, 'fstatSync')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'fstatSize')).toEqual(BASE_SIZE)
  })

  it('reports an invalid descriptor', async () => {
    // harmony 平台对无效 fd 的错误响应会导致自动化通道异常（CI 上表现为 socket TypeError），暂跳过
    if (isHarmony) return
    await callMethodAndWait(page, 'demoFail')
    expect(await readData(page, 'lastResult')).toEqual('fail')
  })

  it('taps the async button and finishes', async () => {
    await tapAndWait(page, '#btn-fstat')
    expect(await readData(page, 'lastResult')).toEqual('success')
  })
})
