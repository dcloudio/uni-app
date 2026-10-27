const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isVapor = process.env.UNI_APP_X_DOM2 === 'true'

describe('long-rich-text', () => {
  if (!isAndroid || !isVapor) {
    it('skip non-android or non-vapor platform', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page

  beforeAll(async () => {
    page = await program.reLaunch('/pages/template/long-rich-text/long-rich-text')
    await page.setData({ autoData: { showFps: false } });
  })

  // 页面启动后立即截图，验证 rich-text 内 image 的首屏加载中状态。
  it('initial-image-loading-state', async () => {
    const image = await program.screenshot()
    expect(image).toSaveImageSnapshot()
  })
})
