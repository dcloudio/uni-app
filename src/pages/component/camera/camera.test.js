jest.setTimeout(60000)

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

describe('component-native-camera', () => {
  // 拍照得到的图片路径用例仅 Android 需要
  if (!isAndroid || isAppWebView) {
    it('skip', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/camera/camera')
    await page.waitFor('view')
    await page.waitFor(2000)
  });

  async function waitForData(path, predicate, timeout = 15000) {
    const interval = 200
    const attempts = Math.ceil(timeout / interval)
    let value = null
    for (let i = 0; i < attempts; i++) {
      value = await page.data(path)
      if (predicate(value)) break
      await page.waitFor(interval)
    }
    return value
  }

  it('take photo and display sd card path image', async () => {
    await page.callMethod('handleTakePhoto')

    // 等待拍照完成，拿到本地图片路径
    const path = await waitForData('photoState.path', v => typeof v === 'string' && v.length > 0)
    console.log('take photo path =', path)
    expect(typeof path).toBe('string')
    expect(path.length).toBeGreaterThan(0)
    // 拍照返回的应是 SD 卡路径
    expect(path).toContain('/Android/data/')

    // 预览图加载成功
    const loaded = await waitForData('photoState.loaded', v => v === true)
    expect(loaded).toBe(true)
    expect(await page.data('photoState.error')).toBe('')

    const image = await page.$('#take-photo-image')
    expect(image).not.toBeNull()
    const { width, height } = await image.size()
    expect(width).toBeGreaterThan(0)
    expect(height).toBeGreaterThan(0)
  })
});
