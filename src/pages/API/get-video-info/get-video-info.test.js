const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isIOS = platformInfo.startsWith('ios')
const isWeb = platformInfo.startsWith('web')
const isMP = platformInfo.startsWith('mp')
const isAndroid = platformInfo.startsWith('android')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

describe('API-getVideoInfo', () => {
  if (isWeb || isMP || isIOS) {
    // web平台在自动化测试场景下API调用失败
    it('pass', async () => {
      expect(1).toBe(1);
    });
    return;
  }

  let page;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/API/get-video-info/get-video-info?is_debug=0');
    await page.waitFor('view');
    await page.waitFor(2000);
  });

  if (!isAppWebView) {
    it('screenshot', async () => {
      const image = await program.screenshot({ fullPage: true });
      expect(image).toSaveImageSnapshot();
    });
  }

  it('test getVideoInfo', async () => {
    await page.callMethod('testGetVideoInfo');
    await page.waitFor(1000);
    if (isWeb) {
      expect(await page.data('testState.videoInfoForTest')).toEqual({
        duration: 10,
        size: 211,
        width: 1280,
        height: 720
      });
      return;
    }
    const infos = process.env.uniTestPlatformInfo.split(' ');
    const version = parseInt(infos[infos.length - 1]);
    if (isAndroid && version > 5) {
      var videoInfo = await page.data('testState.videoInfoForTest')
      expect(videoInfo.orientation).toEqual("up")
      expect(videoInfo.type).toEqual("video/mp4")
      expect(videoInfo.duration).toEqual(10)
      expect(videoInfo.size).toEqual(183.19)
      expect(videoInfo.width).toEqual(1280)
      expect(videoInfo.height).toEqual(720)
      expect(videoInfo.fps == 30 || videoInfo.fps == 31).toEqual(true)
      expect(videoInfo.bitrate).toEqual(149)
    }
  });
});
