const {
  isUnsupported,
  pagePath,
  platformInfo,
  launchPage,
  setPageData,
  readData,
  callMethodAndWait,
  tapAndWait,
  pathExists,
  unsupportedTest
} = require('./fsm-test-utils')

const PAGE_PATH = pagePath('mkdir')

const DEMO_ROOT = 'fsm-mkdir-demo'

describe('FileSystemManager.mkdir', () => {
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

  it('creates a deep path containing Unicode and symbols', async () => {
    const version = parseInt(platformInfo.split(' ')[1])
    const segment = version < 6
      ? '我们经历了一场兵荒马乱的战争'
      : '我们经历了一场兵荒马乱的战争.1@2#3$4%5^6&7*8(9)0+-qwerty'
    await setPageData(page, { dirPath: `${DEMO_ROOT}/${segment}/中文路径/张三/name`, recursive: true })
    await callMethodAndWait(page, 'mkdir')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await pathExists(page, `${DEMO_ROOT}/${segment}`)).toBe(true)
  })

  it('rejects a nested directory when recursive is false', async () => {
    await setPageData(page, { dirPath: `${DEMO_ROOT}/missing/child`, recursive: false })
    await callMethodAndWait(page, 'mkdir')
    expect(await readData(page, 'lastResult')).toEqual('fail')
    const error = await readData(page, 'lastFailError')
    expect(error.errCode).toEqual(1300002)
    expect(error.errMsg).toContain('No such file or directory')
  })

  it('creates a child directory non-recursively with mkdirSync', async () => {
    await setPageData(page, { dirPath: DEMO_ROOT, recursive: true })
    await callMethodAndWait(page, 'mkdir')
    await setPageData(page, { dirPath: `${DEMO_ROOT}/sync-child`, recursive: false })
    await callMethodAndWait(page, 'mkdirSync')
    expect(await readData(page, 'lastResult')).toEqual('success')
    expect(await pathExists(page, `${DEMO_ROOT}/sync-child`)).toBe(true)
  })

  it('reports failure through the demo fail button path', async () => {
    await callMethodAndWait(page, 'demoFail')
    expect(await readData(page, 'lastResult')).toEqual('fail')
    expect((await readData(page, 'lastFailError')).errCode).toEqual(1300002)
  })

  it('taps the async button and finishes', async () => {
    await setPageData(page, { dirPath: `${DEMO_ROOT}/tap-smoke`, recursive: true })
    await tapAndWait(page, '#btn-mkdir')
    expect(await readData(page, 'lastResult')).toEqual('success')
  })
})
