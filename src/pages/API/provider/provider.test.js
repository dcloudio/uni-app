const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isHarmony = platformInfo.startsWith('harmony')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
const isIOS = platformInfo.startsWith('ios')

const PAGE_PATH = "/pages/API/provider/provider";

describe("provider", () => {
  if (isMP || isWeb || isAppWebView) {
  	it('not support', () => {
  		expect(1).toBe(1)
  	})
  	return
  }

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(600)
  });
  it("test getprovider", async () => {
    await page.callMethod('getProvider');
    await page.waitFor(1000);
    let providerIds = await page.data('data.providerIds')

    expect(providerIds).toEqual(expect.arrayContaining(['wxpay', 'alipay', 'system', 'weixin']))
    if (!isHarmony) {
      expect(providerIds).toEqual(expect.arrayContaining(['tencent']))
    } else {
      expect(providerIds).toEqual(expect.arrayContaining(['huawei']))
    }

    if (isIOS) {
      expect(providerIds).toEqual(expect.arrayContaining(['apple']))
      expect(providerIds).toHaveLength(7)
    } else {
      expect(providerIds).toHaveLength(6)
    }

    let providerObjects = await page.data('data.providerObjects')

    expect(providerObjects).toEqual(expect.arrayContaining(['微信支付', '支付宝', '系统定位', '微信登录', '微信分享']))
    if (!isHarmony) {
      expect(providerObjects).toEqual(expect.arrayContaining(['腾讯定位']))
    } else {
      expect(providerObjects).toEqual(expect.arrayContaining(['华为登录']))
    }

    if (isIOS) {
      expect(providerObjects).toEqual(expect.arrayContaining(['苹果登录']))
      expect(providerObjects).toHaveLength(7)
    } else {
      expect(providerObjects).toHaveLength(6)
    }
  });
});
