const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isIOS = platformInfo.startsWith('ios')
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
const isAndroid = platformInfo.startsWith('android')

const PAGE_PATH = '/pages/API/upload-file/upload-file'

describe('ExtApi-UploadFile', () => {
  let page;
  let res;
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
  });

  if (isWeb || isMP) {
    it('not support', async () => {
      expect(1).toBe(1)
    })
    return
  }

  beforeEach(async () => {
    await page.setData({
      data:{jest_result: false}
    })
  });

  if(!isMP) {
    it('Check ', async () => {
      await page.waitFor(600);
      await page.callMethod('jest_uploadFile');
      await page.waitFor(2000);
      res = await page.data('data.jest_result');
      expect(res).toBe(true);
    });

    it('Check files upload', async () => {
      res = await page.callMethod('jest_files_upload')
      await page.waitFor(2000);
      res = await page.data('data.jest_result');
      expect(res).toBe(true)
    });
  }

  it('Check uni.env', async () => {
    await page.callMethod('jest_uploadFile_with_uni_env');
    await page.waitFor(3000);
    res = await page.data('data.jest_result');
    expect(res).toBe(true);
  });

  // 15以下的模拟器所对应的xcode不能编译自定义插件，大于15是因为某台设备，会用xcode14.1跑15.5的设备
  let version = process.env.uniTestPlatformInfo
  let split = version.split(" ")
  version = parseInt(split[split.length - 1])
  if(!isIOS || version > 15) {
    it('Check Upload File In UTS Module', async () => {
      res = await page.callMethod('jest_uts_module_invoked')
      await page.waitFor(2000);
      res = await page.data('data.jest_result');
      expect(res).toBe(true)
    })
  }

  let shouldTestCookie = false
  if (isAndroid && !isAppWebView) {
    let version = process.env.uniTestPlatformInfo
    version = parseInt(version.split(" ")[1])
    shouldTestCookie = version > 9
  }

  if (!shouldTestCookie) {
    return
  }

  it('Check Set Cookie', async () => {
    res = await page.callMethod('jest_set_cookie')
    await page.waitFor(2000);
    res = await page.data('data.jest_result');
    expect(res).toBe(true)
  });
  it('Check Delete Cookie', async () => {
    res = await page.callMethod('jest_delete_cookie')
    await page.waitFor(2000);
    res = await page.data('data.jest_result');
    expect(res).toBe(true)
  });
  it('Check without file or files', async () => {
    res = await page.callMethod('jest_uploadFileWithoutFile')
    await page.waitFor(2000);
    res = await page.data('data.jest_result');
    expect(res).toBe(true)
  })
  it('Check verify useragent count', async () => {
    res = await page.callMethod('jest_uploadFileVerifyUA')
    await page.waitFor(2000);
    res = await page.data('data.jest_result');
    expect(res).toBe(true)
  })
});
