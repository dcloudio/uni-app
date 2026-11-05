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

const PAGE_PATH = pagePath('save-file')

const DEMO_ROOT = 'fsm-save-file-demo'

// 与 save-file.uvue 演示临时文件内容一致的多行专用文本（含转义符与空白字符，不间断空格为 U+00A0）
const SAVE_FILE_CONTENT = '测试saveFile API的写入功能。\n\t制表符缩进行\n回车换行：\r\n下一行\n反斜杠 \\ 双引号 " 单引号 \'\n空格[  ]全角空格[　]不间断空格[\u00A0]\n混合内容：中文English123!@#'

describe('FileSystemManager.saveFile', () => {
  if (isUnsupported) {
    unsupportedTest()
    return
  }

  let page

  beforeAll(async () => {
    page = await launchPage(PAGE_PATH)
    await callMethodAndWait(page, 'prepare')
  })

  afterEach(async () => {
    // 每条用例后清理已保存文件，避免 unifile:// 缓存累积影响后续断言
    await page.callMethod('cleanup')
    await callMethodAndWait(page, 'prepare')
  })

  afterAll(async () => {
    await page.callMethod('cleanup')
  })

  it('saves a temporary file to the default cache path', async () => {
    await setPageData(page, { targetPath: 'local/1.txt' })
    await callMethodAndWait(page, 'saveFile')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'saveFileRet')).toEqual('unifile://cache/uni-store/temp.txt')
  })

  it('saves to an explicit local file path', async () => {
    await setPageData(page, { targetPath: 'local/1.txt' })
    await callMethodAndWait(page, 'saveFileWithTarget')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'saveFileRet')).toEqual('unifile://usr/local/1.txt')
  })

  it('saves to an explicit local path without extension', async () => {
    await setPageData(page, { targetPath: 'local' })
    await callMethodAndWait(page, 'saveFileWithTarget')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'saveFileRet')).toEqual('unifile://usr/local')
  })

  it('normalizes a trailing slash in an explicit local path', async () => {
    await setPageData(page, { targetPath: 'local/' })
    await callMethodAndWait(page, 'saveFileWithTarget')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'saveFileRet')).toEqual('unifile://usr/local')
  })

  it('reads a file after saveFile succeeds', async () => {
    await callMethodAndWait(page, 'saveFileAndRead')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'saveReadRet')).toEqual(`ok：${SAVE_FILE_CONTENT}`)
  })

  it('saves synchronously and returns the saved path', async () => {
    await callMethodAndWait(page, 'saveFileSync')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect((await readData(page, 'saveFileRet')).length).toBeGreaterThan(0)
  })

  it('lists and removes a saved file', async () => {
    await callMethodAndWait(page, 'saveFile')
    const savedPath = await readData(page, 'saveFileRet')
    expect(savedPath.length).toBeGreaterThan(0)
    await callMethodAndWait(page, 'getSavedFileList')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'savedFileListJson')).toContain(savedPath)
    await callMethodAndWait(page, 'removeSavedFile')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'removeSavedFileRet')).toEqual('removeSavedFile:ok')
    await callMethodAndWait(page, 'getSavedFileList')
    expect(await readData(page, 'savedFileListJson')).not.toContain(savedPath)
  })

  it('auto-saves before removing when no saved file exists', async () => {
    // removeSavedFile 可独立演示：无保存结果时自动先保存再删除
    await setPageData(page, { saveFileRet: '' })
    await callMethodAndWait(page, 'removeSavedFile')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await readData(page, 'removeSavedFileRet')).toEqual('removeSavedFile:ok')
  })

  it('taps the async button and finishes', async () => {
    await tapAndWait(page, '#btn-save-file')
    expect(await readData(page, 'lastResult')).toEqual('success')
  })
})
