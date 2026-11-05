jest.setTimeout(30000)

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isIOS = platformInfo.startsWith('ios')
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isAndroid = platformInfo.startsWith('android')
const isHarmony = platformInfo.startsWith('harmony')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

describe('API-saveImageToPhotosAlbum', () => {
  if (isIOS || isWeb || isMP || isAppWebView) {
    it('pass', async () => {
      expect(1).toBe(1);
    });
    return;
  }

  // 系统弹窗「允许」按钮坐标（像素=逻辑坐标，与 getWindowInfo 返回值的坐标系一致）
  const allowSaveButton = { x: 455, y: 710 }

  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/API/save-image-to-photos-album/save-image-to-photos-album');
    await page.waitFor('view');
  });

  async function prepareAndroidSavePermission() {
    if (!isAndroid) {
      return true
    }
    const infos = platformInfo.split(' ');
    const version = parseInt(infos[infos.length - 1]);
    if (version < 7) {
      console.log("安卓版本小于7设备 不进行saveImage测试，模拟器会出现闪退影响后续测试")
      return false
    }
    await program.adbCommand(
      'pm grant io.dcloud.uniappx android.permission.WRITE_EXTERNAL_STORAGE');
    return true
  }

  it('test saveImageToPhotosAlbum', async () => {
    if (!(await prepareAndroidSavePermission())) {
      expect(1).toBe(1)
      return
    }
    await page.callMethod('saveImage');
    if (isHarmony) {
      await page.waitFor(2000);
      await program.tap(allowSaveButton)
    }
    await page.waitFor(1000);

    const windowInfo = await program.callUniMethod('getWindowInfo');
    const image = await program.screenshot({
      deviceShot: true,
      area: {
        x: 0,
        y: windowInfo.safeAreaInsets.top + 44
      }
    });
    expect(image).toSaveImageSnapshot();

    expect(await page.data('testState.success')).toBe(true);
    await page.waitFor(2000);
  });

  it('test saveImageToPhotosAlbum with file written to CACHE_PATH', async () => {
    if (!(await prepareAndroidSavePermission())) {
      expect(1).toBe(1)
      return
    }
    await page.callMethod('saveImageFromCachePath');
    if (isHarmony) {
      await page.waitFor(2000);
      await program.tap(allowSaveButton)
    }
    await page.waitFor(1000);

    console.log('cacheFilePath:', await page.data('testState.cacheFilePath'));
    console.log('cacheSaveError:', await page.data('testState.cacheSaveError'));
    expect(await page.data('testState.cacheSaveSuccess')).toBe(true);
    await page.waitFor(2000);
  });
});
