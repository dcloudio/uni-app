const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isIOS = platformInfo.startsWith('ios')
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isAndroid = platformInfo.startsWith('android')
const isHarmony = platformInfo.startsWith('harmony')

describe('API-saveVideoToPhotosAlbum', () => {
  if (isIOS || isWeb || isMP || isWeb) {
    it('pass', async () => {
      expect(1).toBe(1);
    });
    return;
  }

  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/API/save-video-to-photos-album/save-video-to-photos-album');
    await page.waitFor('view');
  });

  it('test saveVideoToPhotosAlbum', async () => {
    if (isAndroid) {
      const infos = platformInfo.split(' ');
      const version = parseInt(infos[infos.length - 1]);
      if (version < 7) {
        console.log("安卓版本小于7设备 不进行saveVideo测试，模拟器会出现闪退影响后续测试")
        expect(1).toBe(1)
        return
      }
      await program.adbCommand(
        'pm grant io.dcloud.uniappx android.permission.WRITE_EXTERNAL_STORAGE');
    }
    await page.callMethod('saveVideo');
    if (isHarmony) {
      await page.waitFor(2000);
      await program.tap({x: 305, y: 567})
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
});
