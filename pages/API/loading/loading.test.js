// @Author-APP-ANDROID:DCloud_Android_DQQ
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isApp = isAndroid || isIos || isHarmony
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

const PAGE_PATH = '/pages/API/loading/loading'

describe('API-loading', () => {
  let deviceShotOptions = {}
  let page;
  // 测试辅助函数
  async function setPageData(newData) {
    return await page.setData({ data: newData });
  }

  function getData (key = '') {
    return new Promise(async (resolve, reject) => {
      const data = await page.data('data')
      resolve(key ? data[key] : data)
    })
  }

  beforeAll(async () => {
    const windowInfo = await program.callUniMethod('getWindowInfo');
    let topSafeArea = windowInfo.safeAreaInsets.top;
    if (isAppWebView) {
      if (isIos) {
        topSafeArea = 59
      } else if (isAndroid) {
        topSafeArea = 24
        if (platformInfo.startsWith('android 5')) {
          topSafeArea = 25
        } else if (platformInfo.startsWith('android 11')) {
          topSafeArea = 52
        } else if (platformInfo.startsWith('android 13') || platformInfo.startsWith('android 15')) {
          topSafeArea = 49
        }
      } else if (isHarmony) {
        // mate 60
        // topSafeArea = 33
        // mate 60 pro
        topSafeArea = 38
      }
    }
    deviceShotOptions = {
      deviceShot: true,
      area: {
        x: 0,
        y: topSafeArea + 44,
      },
    };

    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view');
  });

  async function toScreenshot(imgName) {
    const image = await program.screenshot(deviceShotOptions);
    expect(image).toSaveImageSnapshot({customSnapshotIdentifier() {
      return imgName
    }})
    await page.waitFor(500);
  }

  it('onload-loading-test', async () => {
    await toScreenshot('loading-onload')
  })

  it('show-loading-with-different-titles', async () => {
    const radios = await page.$$('.radio')
    for (let i = 0; i < radios.length; i++) {
      await radios[i].tap()
      await page.waitFor(100)
      await page.callMethod('showLoading')
      await page.waitFor(300)
      const radioText = await radios[i].text()
      await toScreenshot(`loading-title-${radioText}`)
    }
  })

  it('manual-hide-loading', async () => {
    await page.callMethod('showLoading')
    await page.waitFor(100)
    await toScreenshot('loading-manual-show')
    await page.callMethod('hideLoading')
    await page.waitFor(300)
    await toScreenshot('loading-manual-hide')
  })


  it('close-loading-test', async () => {
    await page.callMethod('closeSomeLoading')
    await page.waitFor(1500)
    await toScreenshot('close-loading-test-1')
    await page.callMethod('hideLoading')
    await page.waitFor(3500)
    await toScreenshot('close-loading-test-2')
    const dataRet = await getData('callbackText')
    const callbackTextRet = JSON.stringify(dataRet)
    expect(callbackTextRet)
    .toEqual('["showLoading 1 success","showLoading 1 complete","showLoading 2 success","showLoading 2 complete","hideLoading 2 success","hideLoading 2 complete","hideLoading 1 success","hideLoading 1 complete"]')

  })

  it('no-param-loading-test', async () => {
    await page.callMethod('noParamLoading')
    await toScreenshot('no-param-loading-test-1')
    await page.waitFor(2500)
    await toScreenshot('no-param-loading-test-2')
    const dataRet = await getData('callbackText')
    const callbackTextRet = JSON.stringify(dataRet)
    expect(callbackTextRet)
    .toEqual('["showLoading 1 success","showLoading 1 complete","showLoading 2 success","showLoading 2 complete","hideLoading 2 success","hideLoading 2 complete","hideLoading 1 success","hideLoading 1 complete","noParamLoading 1 success","noParamLoading 2 complete","hide loading success"]')

  })
});
