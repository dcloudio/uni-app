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

const PAGE_PATH = pagePath('write')

describe('FileSystemManager.write', () => {
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

  it('writes through a descriptor asynchronously', async () => {
    await callMethodAndWait(page, 'prepare')
    await setPageData(page, { writeData: '我是一只小小鸟', positionText: '0' })
    await callMethodAndWait(page, 'write')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'bytesWritten')).toEqual(21)
    expect(await readData(page, 'readRet')).toEqual('我是一只小小鸟')
  })

  it('writes through a descriptor synchronously', async () => {
    await callMethodAndWait(page, 'prepare')
    await setPageData(page, { writeData: '我是', positionText: '0' })
    await callMethodAndWait(page, 'writeSync')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'bytesWritten')).toEqual(6)
    // '我是' 占 6 字节，覆盖 '012345'，保留 '6789'
    expect(await readData(page, 'readRet')).toEqual('我是6789')
  })

  // 转义符与空白字符 round-trip：含 \n、\t、\r\n、反斜杠、引号、全角/不间断空格、Emoji、中英文混排
  it('round-trips escape and whitespace characters', async () => {
    await callMethodAndWait(page, 'prepare')
    const content = '测试write API的写入功能。\n\t制表符行\n回车换行：\r\n下一行\n反斜杠：\\ 双引号：" 单引号：\'\n空格：[  ] 全角：[　] 不间断：[\u00A0] Emoji：[🚀] 混合：中文English123!@#'
    await setPageData(page, { writeData: content, positionText: '0' })
    await callMethodAndWait(page, 'write')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'readRet')).toEqual(content)
  })

  it('reports an invalid descriptor', async () => {
    // harmony 平台对无效 fd 的错误响应会导致自动化通道异常（CI 上表现为 socket TypeError），暂跳过
    if (isHarmony) return
    await callMethodAndWait(page, 'demoFail')
    expect(await readData(page, 'lastResult')).toEqual('fail')
  })

  it('taps the async button and finishes', async () => {
    await callMethodAndWait(page, 'prepare')
    await setPageData(page, { writeData: 'abc', positionText: '0' })
    await tapAndWait(page, '#btn-write')
    expect(await readData(page, 'lastResult')).toEqual('success')
  })
})
