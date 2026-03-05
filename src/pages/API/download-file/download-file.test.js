const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isAndroid = platformInfo.startsWith('android')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

const PAGE_PATH = '/pages/API/download-file/download-file'

describe('ExtApi-DownloadFile', () => {
  let page;
  let res;
  let timeout = 15000
  let waitForStartTime
  async function waitCallbackTriggredOrTimeout(){
    waitForStartTime = Date.now()
    await page.waitFor(async () => {
      const callbackTriggred = await page.data('data.jest_callback_triggred')
      return callbackTriggred || (Date.now() - waitForStartTime > timeout)
    })
  }

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view');
  });

  beforeEach(async () => {
    await page.setData({
      data:{
        jest_result: false,
        jest_callback_triggred: false
      }
    })
  });

  it('Check ', async () => {
    await page.callMethod('jest_downloadFile');
    await waitCallbackTriggredOrTimeout()
    res = await page.data('data.jest_result');
    expect(res).toBe(true);
  });

  it('Check Special characters Url download file', async () => {
    res = await page.callMethod('jest_special_characters_download')
    await waitCallbackTriggredOrTimeout()
    res = await page.data('data.jest_result');
    expect(res).toBe(true)
  });

  it('Check download call timeout', async () => {
    res = await page.callMethod('jest_download_call_timeout')
    await page.waitFor(5000);
    res = await page.data('data.jest_result');
    expect(res).toBe(true)
  })

  if (!(isMP || isWeb)) {
    it('Check uni.env', async () => {
      await page.callMethod('jest_downloadFile_with_uni_env');
      await waitCallbackTriggredOrTimeout()
      res = await page.data('data.jest_result');
      expect(res).toBe(true);
    });

    // 15以下的模拟器所对应的xcode不能编译自定义插件，大于15是因为某台设备，会用xcode14.1跑15.5的设备
    let version = process.env.uniTestPlatformInfo
    let split = version.split(" ")
    version = parseInt(split[split.length - 1])
    if (!process.env.uniTestPlatformInfo.toLocaleLowerCase().startsWith('ios') || version > 15) {
      it('Check Download File In UTS Module', async () => {
        res = await page.callMethod('jest_uts_module_invoked')
        await waitCallbackTriggredOrTimeout()
        res = await page.data('data.jest_result');
        expect(res).toBe(true)
      })
    }
  }


  let shouldTestCookie = false
  if (isAndroid && isAppWebView) {
    let version = process.env.uniTestPlatformInfo
    version = parseInt(version.split(" ")[1])
    shouldTestCookie = version > 9
  } else if (isWeb) {
    // TODO 测试网址调整后放开此测试
    shouldTestCookie = false
  }
  if (!shouldTestCookie) {
    return
  }

  it('Check Set Cookie', async () => {
    res = await page.callMethod('jest_set_cookie')
    await waitCallbackTriggredOrTimeout()
    res = await page.data('data.jest_result');
    expect(res).toBe(true)
  });
  it('Check Delete Cookie', async () => {
    res = await page.callMethod('jest_delete_cookie')
    await waitCallbackTriggredOrTimeout()
    res = await page.data('data.jest_result');
    expect(res).toBe(true)
  });
});
