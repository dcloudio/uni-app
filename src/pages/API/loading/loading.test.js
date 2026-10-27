const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')

describe('API-loading', () => {
  if ( isMP) {
    it('skip', async () => {
      expect(1).toBe(1);
    });
    return;
  }

  const isAndroid = platformInfo.startsWith('android')
  const isIos = platformInfo.startsWith('ios')
  const isHarmony = platformInfo.startsWith('harmony')
  const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
  const PAGE_PATH = '/pages/API/loading/loading'
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

  async function toScreenshot(imgName) {
    const image = await program.screenshot(deviceShotOptions);
    expect(image).toSaveImageSnapshot({customSnapshotIdentifier() {
      return imgName
    }})
    await page.waitFor(500);
  }

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view');
    const windowInfo = await program.callUniMethod('getWindowInfo');
    let topSafeArea = windowInfo.safeAreaInsets.top;
    if (isAppWebView) {
      if (isIos) {
        topSafeArea = 59
        if (platformInfo.includes('26')) {
          topSafeArea = 62
        }
      } else if (isAndroid) {
        topSafeArea = 24
        windowInfo.safeArea.bottom = 867
        if (platformInfo.startsWith('android 5')) {
          topSafeArea = 25
        }if (platformInfo.startsWith('android 6')) {
          windowInfo.safeArea.bottom = 592
        }if (platformInfo.startsWith('android 8')) {
          windowInfo.safeArea.bottom = 534
        } else if (platformInfo.startsWith('android 11')) {
          topSafeArea = 52
        } else if (platformInfo.startsWith('android 12')) {
          topSafeArea = 24
          windowInfo.safeArea.bottom = 716
        } else if (platformInfo.startsWith('android 13') || platformInfo.startsWith('android 14') || platformInfo.startsWith('android 15')) {
          topSafeArea = 49
          windowInfo.safeArea.bottom = 891
        }
      } else if (isHarmony) {
        topSafeArea = 39
        if (platformInfo.includes('nova_12')) {
          topSafeArea = 35
        }
      }
    }
    const top = topSafeArea + 44
    const bottom = Math.min(top + windowInfo.windowHeight, windowInfo.safeArea.bottom)
    const left = windowInfo.safeArea.left
    const right = windowInfo.safeArea.right
    deviceShotOptions = {
      deviceShot: true,
      area: {
        x: left,
        y: top,
        width: right - left,
        height: bottom - top
      },
    }
  });

  it('onLoad showLoading', async () => {
    await toScreenshot('loading-onload')
    // 等待 loading 关闭
    await page.waitFor(2000)
  })

  async function showLoadingWithTitle(index) {
    const items = await getData('items')
    await page.callMethod('selectTitle', index)
    await page.waitFor(100)
    await page.callMethod('showLoading')
    await page.waitFor(300)
    await toScreenshot(`loading-title-${items[index].name}`)
    // 等待 loading 关闭
    await page.waitFor(3000)
  }

  it('showLoading with empty title', async () => {
    await showLoadingWithTitle(0)
  })

  it('showLoading with normal title', async () => {
    await showLoadingWithTitle(1)
  })

  it('showLoading with long title', async () => {
    await showLoadingWithTitle(2)
  })

  it('hideLoading', async () => {
    await page.callMethod('showLoading')
    await page.waitFor(300)
    await toScreenshot('loading-show')
    await page.callMethod('hideLoading')
    await page.waitFor(300)
    await toScreenshot('loading-hide')
  })

  it('hideLoading with loadingPage', async () => {
    await page.callMethod('closeSomeLoading')
    await page.waitFor(300)
    await toScreenshot('show-loading')
    await page.waitFor(1200)
    await toScreenshot('closed-loading-2')
    await page.waitFor(2100)
    await toScreenshot('closed-loading-1')
    const dataRet = await getData('callbackText')
    const callbackTextRet = JSON.stringify(dataRet)
    expect(callbackTextRet)
      .toEqual('["showLoading 1 success","showLoading 1 complete","showLoading 2 success","showLoading 2 complete","hideLoading 2 success","hideLoading 2 complete","hideLoading 1 success","hideLoading 1 complete"]')
    await setPageData({callbackText: []})
  })

  it('showLoading noParam', async () => {
    await page.callMethod('noParamLoading')
    await page.waitFor(300)
    await toScreenshot('indicated-loading')
    await page.waitFor(2100)
    await toScreenshot('hided-loading')
    const dataRet = await getData('callbackText')
    const callbackTextRet = JSON.stringify(dataRet)
    expect(callbackTextRet)
    .toEqual('["noParamLoading 1 success","noParamLoading 1 complete","noParamLoading 2 success","noParamLoading 2 complete","hide loading success"]')
  })
});
