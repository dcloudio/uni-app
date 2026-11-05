const {
  isAndroid,
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

const PAGE_PATH = pagePath('read-file')

const DEMO_ROOT = 'fsm-read-file-demo'

describe('FileSystemManager.readFile', () => {
  if (isUnsupported) {
    unsupportedTest()
    return
  }

  let page
  let initialRoot

  beforeAll(async () => {
    page = await launchPage(PAGE_PATH)
    await callMethodAndWait(page, 'prepare')
    initialRoot = await readData(page, 'rootPath')
  })

  afterAll(async () => {
    await page.callMethod('cleanup')
  })

  it('reads a UTF-8 file', async () => {
    await setPageData(page, { rootPath: initialRoot, filePath: `${DEMO_ROOT}/1.txt`, encoding: 'utf-8' })
    await callMethodAndWait(page, 'readFile')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'readRet')).toEqual('测试readFile API的写入功能。\n\t制表符缩进行\n回车换行：\r\n下一行\n反斜杠 \\ 双引号 " 单引号 \'\n空格[  ]全角空格[　]不间断空格[ ]\n混合内容：中文English123!@#')
  })

  it('reads UTF-8 content as base64', async () => {
    await setPageData(page, { rootPath: initialRoot, filePath: `${DEMO_ROOT}/1.txt`, encoding: 'base64' })
    await callMethodAndWait(page, 'readFile')
    expect(await readData(page, 'readRet')).toEqual('5rWL6K+VcmVhZEZpbGUgQVBJ55qE5YaZ5YWl5Yqf6IO944CCCgnliLbooajnrKbnvKnov5vooYwK5Zue6L2m5o2i6KGM77yaDQrkuIvkuIDooYwK5Y+N5pac5p2gIFwg5Y+M5byV5Y+3ICIg5Y2V5byV5Y+3ICcK56m65qC8WyAgXeWFqOinkuepuuagvFvjgIBd5LiN6Ze05pat56m65qC8W8KgXQrmt7flkIjlhoXlrrnvvJrkuK3mlodFbmdsaXNoMTIzIUAj')
  })

  it('round-trips a bundled binary resource through base64', async () => {
    await setPageData(page, { rootPath: '/', filePath: 'static/test-image/logo.ico', encoding: 'base64' })
    await callMethodAndWait(page, 'readFile')
    const base64 = await readData(page, 'readRet')
    expect(base64.length).toEqual(5716)
    expect(base64.substring(base64.length - 10)).toEqual('AA///AA/8=')
    await setPageData(page, { rootPath: initialRoot })
  })

  it('reads an Android asset synchronously', async () => {
    if (!isAndroid) return
    await setPageData(page, { rootPath: 'file:///android_asset/uni-app-x', filePath: '/hxversion.data', encoding: 'utf-8' })
    await callMethodAndWait(page, 'readFileSync')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect((await readData(page, 'readRet')).length).toBeGreaterThan(0)
    await setPageData(page, { rootPath: initialRoot })
  })

  it('reports a missing file', async () => {
    await setPageData(page, { rootPath: initialRoot, filePath: `${DEMO_ROOT}/missing.txt`, encoding: 'utf-8' })
    await callMethodAndWait(page, 'readFile')
    expect(await readData(page, 'lastResult')).toEqual('fail')
    // harmony 平台对不存在的文件返回 1300022（invalid argument），其余平台返回 1300002（file not found）
    const expectedCodes = isHarmony ? [1300002, 1300022] : [1300002]
    expect(expectedCodes).toContain((await readData(page, 'lastFailError')).errCode)
  })

  it('reads an ArrayBuffer file', async () => {
    await callMethodAndWait(page, 'readFileBuffer')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'byteLength')).toEqual(16)
    expect(await readData(page, 'bufferValue')).toEqual(1.2222222)
  })

  it('exposes the content control without opening the picker', async () => {
    // content:// 为 App 平台手动体验入口，自动化仅断言按钮存在
    expect(await page.$('#btn-read-file-content')).not.toBe(null)
  })

  it('taps the async button and finishes', async () => {
    await setPageData(page, { rootPath: initialRoot, filePath: `${DEMO_ROOT}/1.txt`, encoding: 'utf-8' })
    await tapAndWait(page, '#btn-read-file')
    expect(await readData(page, 'lastResult')).toEqual('success')
  })
})
