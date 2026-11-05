const {
  isIOS,
  isUnsupported,
  pagePath,
  launchPage,
  setPageData,
  readData,
  callMethodAndWait,
  tapAndWait,
  unsupportedTest
} = require('./fsm-test-utils')

const PAGE_PATH = pagePath('truncate')

const DEMO_ROOT = 'fsm-truncate-demo'
const BASE_CONTENT = '测试truncate API的写入功能。\n\t制表符缩进行\n回车换行：\r\n下一行\n反斜杠 \\ 双引号 " 单引号 \'\n空格[  ]全角空格[　]不间断空格[ ]\n混合内容：中文English123!@#'

describe('FileSystemManager.truncate', () => {
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

  it('truncates a file asynchronously', async () => {
    await callMethodAndWait(page, 'prepare')
    await setPageData(page, { filePath: `${DEMO_ROOT}/1.txt`, lengthText: '6' })
    await callMethodAndWait(page, 'truncate')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'readRet')).toEqual('测试')
    if (!isIOS) expect(await readData(page, 'fileSize')).toEqual(6)
  })

  it('truncates a file synchronously', async () => {
    await callMethodAndWait(page, 'prepare')
    await setPageData(page, { filePath: `${DEMO_ROOT}/1.txt` })
    await callMethodAndWait(page, 'truncateSync')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'readRet')).toEqual('测')
    if (!isIOS) expect(await readData(page, 'fileSize')).toEqual(3)
  })

  it('reports a missing file', async () => {
    await setPageData(page, { filePath: `${DEMO_ROOT}/missing.txt`, lengthText: '6' })
    await callMethodAndWait(page, 'truncate')
    expect(await readData(page, 'lastResult')).toEqual('fail')
    expect((await readData(page, 'lastFailError')).errCode).toEqual(1300002)
  })

  it('taps the async button and finishes', async () => {
    await callMethodAndWait(page, 'prepare')
    await setPageData(page, { filePath: `${DEMO_ROOT}/1.txt`, lengthText: '6' })
    await tapAndWait(page, '#btn-truncate')
    expect(await readData(page, 'lastResult')).toEqual('success')
  })
})
