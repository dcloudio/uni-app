jest.setTimeout(50000);

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web')
const isMP = platformInfo.startsWith('mp')
const isIOS = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isAndroid = platformInfo.startsWith('android')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

const PAGE_PATH = "/pages/API/request-payment/request-payment";

describe("payment", () => {
  // 下面的测试在鸿蒙平台有弹窗，暂时不支持
  if (
    isWeb ||
    isMP ||
    isHarmony ||
    isIOS ||
    isAndroid ||
    isAppWebView
  ) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(600)
  });
  //支付失败701100
  it("errorcode701100", async () => {
    let orderInfo =
      "service=\"mobile.securitypay.pay\"&partner=\"2088801273866834\"&_input_charset=\"UTF-8\"&out_trade_no=\"20240229115452\"&subject=\"DCloud项目捐赠\"&payment_type=\"1\"&seller_id=\"payservice@dcloud.io\"&total_fee=\"0.01\"&body=\"DCloud致力于打造HTML5最好的移动开发工具，包括终端的Runtime、云端的服务和IDE，同时提供各项配套的开发者服务。\"&it_b_pay=\"1d\"&notify_url=\"http%3A%2F%2Fdemo.dcloud.net.cn%2Fpayment%2Falipay%2Fnotify.php\"&show_url=\"http%3A%2F%2Fwww.dcloud.io%2Fhelloh5%2F\"&sign=\"diZdkTX2iIP1oZh25UCGqx%2BpkViqAN8xdvMNSJF79aq0JiunX2mtr%2BbNlDsP0YL5x85KjULsqx%2Fq%2B5wij6eMoBVeJ%2BHhyjkwt0PYuwntroJ2Ho8bdUVEybBgOjy240NbCUtKmZzNRQAGsmLztKWzsg1srsQ8Se3Qi8KGDaOhqBs%3D\"&sign_type=\"RSA\"";
    await page.setData({
      data:{orderInfo: orderInfo,}
    })
    await page.callMethod('jest_pay')

    let complete = await page.data('data.complete')
    let fail = await page.data('data.fail')
    let errorCode = await page.data('data.errorCode')
    if (complete && fail) {
      expect(errorCode).toEqual(701100)
    } else {
      expect(errorCode).toEqual(0)
    }
  });
});
