const {
  isUnsupported,
  pagePath,
  launchPage,
  readData,
  unsupportedTest
} = require('./fsm-test-utils')

const PAGE_PATH = pagePath('get-file-system-manager')

describe('FileSystemManager quick demo', () => {
  if (isUnsupported) {
    unsupportedTest()
    return
  }

  let page

  beforeAll(async () => {
    page = await launchPage(PAGE_PATH)
  })

  it('runs the full mkdir/write/read/unlink/rmdir flow', async () => {
    // 快速体验为同步流程，callMethod 返回后即可读取结果
    await page.callMethod('runQuickDemo')
    const ret = await readData(page, 'quickRet')
    expect(ret).toContain('mkdirSync 成功')
    expect(ret).toContain('writeFileSync 成功')
    expect(ret).toContain('readFileSync 成功：测试getFileSystemManager API的写入功能。')
    expect(ret).toContain('unlinkSync/rmdirSync 成功')
  })

  it('reruns the quick demo repeatedly', async () => {
    // 重复执行应自愈（先清理再重建），结果保持一致
    await page.callMethod('runQuickDemo')
    const ret = await readData(page, 'quickRet')
    expect(ret).toContain('mkdirSync 成功')
    expect(ret).toContain('unlinkSync/rmdirSync 成功')
    expect(ret).not.toContain('执行失败')
  })
})
