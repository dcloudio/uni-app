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

const PAGE_PATH = pagePath('rename')

const DEMO_ROOT = 'fsm-rename-demo'

describe('FileSystemManager.rename', () => {
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

  it('renames a file', async () => {
    await setPageData(page, { oldPath: `${DEMO_ROOT}/1.txt`, newPath: `${DEMO_ROOT}/2.txt` })
    await callMethodAndWait(page, 'rename')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'readRet')).toEqual('测试rename API的写入功能。\n\t制表符缩进行\n回车换行：\r\n下一行\n反斜杠 \\ 双引号 " 单引号 \'\n空格[  ]全角空格[　]不间断空格[ ]\n混合内容：中文English123!@#')
  })

  it('renames a file synchronously', async () => {
    await callMethodAndWait(page, 'prepare')
    await setPageData(page, { oldPath: `${DEMO_ROOT}/1.txt`, newPath: `${DEMO_ROOT}/3.txt` })
    await callMethodAndWait(page, 'renameSync')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'readRet')).toEqual('测试rename API的写入功能。\n\t制表符缩进行\n回车换行：\r\n下一行\n反斜杠 \\ 双引号 " 单引号 \'\n空格[  ]全角空格[　]不间断空格[ ]\n混合内容：中文English123!@#')
  })

  it('rejects renaming into a missing directory', async () => {
    await callMethodAndWait(page, 'prepare')
    await setPageData(page, { oldPath: `${DEMO_ROOT}/1.txt`, newPath: `${DEMO_ROOT}/missing/2.txt` })
    await callMethodAndWait(page, 'rename')
    expect(await readData(page, 'lastResult')).toEqual('fail')
    expect((await readData(page, 'lastFailError')).errCode).toEqual(1300002)
  })

  it('taps the async button and finishes', async () => {
    await callMethodAndWait(page, 'prepare')
    await setPageData(page, { oldPath: `${DEMO_ROOT}/1.txt`, newPath: `${DEMO_ROOT}/2.txt` })
    await tapAndWait(page, '#btn-rename')
    expect(await readData(page, 'lastResult')).toEqual('success')
  })
})
