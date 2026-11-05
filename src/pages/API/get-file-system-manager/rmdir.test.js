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

const PAGE_PATH = pagePath('rmdir')

const DEMO_ROOT = 'fsm-rmdir-demo'

describe('FileSystemManager.rmdir', () => {
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

  it('recursively removes a non-empty child directory', async () => {
    await setPageData(page, { dirPath: `${DEMO_ROOT}/target`, recursive: true })
    await callMethodAndWait(page, 'rmdir')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await pathExists(page, `${DEMO_ROOT}/target`)).toBe(false)
  })

  it('rejects removing a non-empty directory without recursive', async () => {
    // prepare 重新生成演示数据
    await callMethodAndWait(page, 'prepare')
    await setPageData(page, { dirPath: `${DEMO_ROOT}/target`, recursive: false })
    await callMethodAndWait(page, 'rmdir')
    expect(await readData(page, 'lastResult')).toEqual('fail')
    expect((await readData(page, 'lastFailError')).errCode).toEqual(1300066)
  })

  it('recursively removes a non-empty child directory synchronously', async () => {
    // prepare 重新生成演示数据
    await callMethodAndWait(page, 'prepare')
    await setPageData(page, { dirPath: `${DEMO_ROOT}/target`, recursive: true })
    await callMethodAndWait(page, 'rmdirSync')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await pathExists(page, `${DEMO_ROOT}/target`)).toBe(false)
  })

  it('recreates the target before removing when missing', async () => {
    // 自愈语义：目标目录不存在时自动重建再删除，保证按钮可重复点击
    await setPageData(page, { dirPath: `${DEMO_ROOT}/missing`, recursive: true })
    await callMethodAndWait(page, 'rmdir')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await pathExists(page, `${DEMO_ROOT}/missing`)).toBe(false)
  })

  it('taps the async button and finishes', async () => {
    await callMethodAndWait(page, 'prepare')
    await setPageData(page, { dirPath: `${DEMO_ROOT}/target`, recursive: true })
    await tapAndWait(page, '#btn-rmdir')
    expect(await readData(page, 'lastResult')).toEqual('success')
  })
})
