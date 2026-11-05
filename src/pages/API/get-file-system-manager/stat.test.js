const {
  isAndroid,
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

const PAGE_PATH = pagePath('stat')

const DEMO_ROOT = 'fsm-stat-demo'

describe('FileSystemManager.stat', () => {
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

  it('stats a single file', async () => {
    await setPageData(page, { statPath: `${DEMO_ROOT}/1.txt`, recursive: false })
    await callMethodAndWait(page, 'stat')
    expect(await readData(page, 'lastResult')).toEqual('success')
    const stats = await readData(page, 'statsList')
    expect(stats.length).toEqual(1)
    expect(stats[0].path).toEqual('')
    if (!isIOS) expect(stats[0].size).toEqual(197)
  })

  it('recursively stats files including a bundled asset copy', async () => {
    await callMethodAndWait(page, 'setupStatDemo')
    await callMethodAndWait(page, 'stat')
    expect(await readData(page, 'lastResult')).toEqual('success')
    const stats = await readData(page, 'statsList')
    const pathsInResult = stats.map(item => item.path)
    expect(stats.length).toEqual(4)
    expect(pathsInResult).toContain('/')
    expect(pathsInResult).toContain('/m')
    expect(pathsInResult).toContain('/1.txt')
    expect(pathsInResult).toContain('/m/asset.ico')
    if (!isIOS) {
      expect(stats.find(item => item.path === '/1.txt').size).toEqual(197)
      expect(stats.find(item => item.path === '/m/asset.ico').size).toEqual(4286)
    }
  })

  it('stats a single file synchronously', async () => {
    await setPageData(page, { statPath: `${DEMO_ROOT}/1.txt`, recursive: false })
    await callMethodAndWait(page, 'statSync')
    expect(await readData(page, 'lastResult')).toEqual('success')
    const stats = await readData(page, 'statsList')
    expect(stats.length).toEqual(1)
    expect(stats[0].path).toEqual('')
  })

  it('reports a missing path', async () => {
    await setPageData(page, { statPath: `${DEMO_ROOT}/missing.txt`, recursive: false })
    await callMethodAndWait(page, 'stat')
    expect(await readData(page, 'lastResult')).toEqual('fail')
    expect((await readData(page, 'lastFailError')).errCode).toEqual(1300002)
  })

  it('taps the async button and finishes', async () => {
    await setPageData(page, { statPath: `${DEMO_ROOT}/1.txt`, recursive: false })
    await tapAndWait(page, '#btn-stat')
    expect(await readData(page, 'lastResult')).toEqual('success')
  })

  const androidIt = isAndroid ? it : it.skip

  androidIt('reports each stat entry type through isFile and isDirectory', async () => {
    await callMethodAndWait(page, 'setupStatDemo')
    await callMethodAndWait(page, 'stat')
    expect(await readData(page, 'lastResult')).toEqual('success')
    const stats = await readData(page, 'statsList')
    const typeByPath = {}
    stats.forEach(item => {
      typeByPath[item.path] = { isFile: item.isFile, isDirectory: item.isDirectory }
    })
    expect(typeByPath['/1.txt']).toEqual({ isFile: '是', isDirectory: '否' })
    expect(typeByPath['/m']).toEqual({ isFile: '否', isDirectory: '是' })
  })
})
