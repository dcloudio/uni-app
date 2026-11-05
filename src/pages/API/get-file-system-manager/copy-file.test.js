const {
  isUnsupported,
  pagePath,
  launchPage,
  setPageData,
  readData,
  callMethodAndWait,
  tapAndWait,
  pathExists,
  unsupportedTest
} = require('./fsm-test-utils')

const PAGE_PATH = pagePath('copy-file')

const DEMO_ROOT = 'fsm-copy-file-demo'

describe('FileSystemManager.copyFile', () => {
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

  it('copies a file', async () => {
    await setPageData(page, { srcPath: `${DEMO_ROOT}/1.txt`, destPath: `${DEMO_ROOT}/2.txt` })
    await callMethodAndWait(page, 'copyFile')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'readRet')).toEqual('测试copyFile API的写入功能。\n\t制表符缩进行\n回车换行：\r\n下一行\n反斜杠 \\ 双引号 " 单引号 \'\n空格[  ]全角空格[　]不间断空格[ ]\n混合内容：中文English123!@#')
  })

  it('copies a file synchronously', async () => {
    await setPageData(page, { srcPath: `${DEMO_ROOT}/1.txt`, destPath: `${DEMO_ROOT}/3.txt` })
    await callMethodAndWait(page, 'copyFileSync')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await pathExists(page, `${DEMO_ROOT}/3.txt`)).toBe(true)
  })

  it('copies a bundled static file into the sandbox', async () => {
    await callMethodAndWait(page, 'copyStatic')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await pathExists(page, `${DEMO_ROOT}/mock.json`)).toBe(true)
  })

  it('rejects copying a missing source file', async () => {
    await setPageData(page, { srcPath: `${DEMO_ROOT}/missing.txt`, destPath: `${DEMO_ROOT}/2.txt` })
    await callMethodAndWait(page, 'copyFile')
    expect(await readData(page, 'lastResult')).toEqual('fail')
    expect((await readData(page, 'lastFailError')).errCode).toEqual(1300002)
  })

  it('exposes the content control without opening the picker', async () => {
    // content:// 为 App 平台手动体验入口，自动化仅断言按钮存在
    expect(await page.$('#btn-copy-file-content')).not.toBe(null)
  })

  it('taps the async button and finishes', async () => {
    await setPageData(page, { srcPath: `${DEMO_ROOT}/1.txt`, destPath: `${DEMO_ROOT}/2.txt` })
    await tapAndWait(page, '#btn-copy-file')
    expect(await readData(page, 'lastResult')).toEqual('success')
  })
})
