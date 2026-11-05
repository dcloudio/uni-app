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

const PAGE_PATH = pagePath('append-file')

const DEMO_ROOT = 'fsm-append-file-demo'
const BASE_CONTENT = '测试appendFile API的写入功能。'

describe('FileSystemManager.appendFile', () => {
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

  it('appends asynchronously', async () => {
    await callMethodAndWait(page, 'prepare')
    await setPageData(page, { filePath: `${DEMO_ROOT}/1.txt`, content: '再说一遍' })
    await callMethodAndWait(page, 'appendFile')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'readRet')).toEqual(`${BASE_CONTENT}再说一遍`)
  })

  it('appends synchronously', async () => {
    await callMethodAndWait(page, 'prepare')
    await setPageData(page, { filePath: `${DEMO_ROOT}/1.txt`, content: '再说一遍' })
    await callMethodAndWait(page, 'appendFileSync')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'readRet')).toEqual(`${BASE_CONTENT}再说一遍`)
  })

  // 转义符与空白字符追加：含 \n、\t、\r\n、反斜杠、引号、全角/不间断空格、Emoji、中英文混排
  it('appends escape and whitespace characters', async () => {
    await callMethodAndWait(page, 'prepare')
    const extra = '测试appendFile API的写入功能。\n\t制表符行\n回车换行：\r\n下一行\n反斜杠：\\ 双引号：" 单引号：\'\n空格：[  ] 全角：[　] 不间断：[\u00A0] Emoji：[🚀] 混合：中文English123!@#'
    await setPageData(page, { filePath: `${DEMO_ROOT}/1.txt`, content: extra })
    await callMethodAndWait(page, 'appendFile')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'readRet')).toEqual(`${BASE_CONTENT}${extra}`)
  })

  it('appends an ArrayBuffer asynchronously', async () => {
    await callMethodAndWait(page, 'prepare')
    await setPageData(page, { filePath: `${DEMO_ROOT}/1.txt` })
    await callMethodAndWait(page, 'appendFileBuffer')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'bufferValue')).toEqual(21)
  })

  it('appends an ArrayBuffer synchronously', async () => {
    await callMethodAndWait(page, 'prepare')
    await setPageData(page, { filePath: `${DEMO_ROOT}/1.txt` })
    await callMethodAndWait(page, 'appendFileBufferSync')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'bufferValue')).toEqual(20)
  })

  it('taps the async button and finishes', async () => {
    await callMethodAndWait(page, 'prepare')
    await setPageData(page, { filePath: `${DEMO_ROOT}/1.txt`, content: '再说一遍' })
    await tapAndWait(page, '#btn-append-file')
    expect(await readData(page, 'lastResult')).toEqual('success')
  })
})
