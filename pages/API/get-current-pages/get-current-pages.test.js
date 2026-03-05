jest.setTimeout(60000)

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isApp = isAndroid || isIos || isHarmony
const isWeb = platformInfo.startsWith('web')
const isMP = platformInfo.startsWith('mp')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
const isDom2 = process.env.UNI_APP_X_DOM2 === "true"

const HOME_PAGE_PATH = isDom2 ? '/pages/tabBar/tab-bar' : '/pages/tabBar/component'
const PAGE_PATH = '/pages/API/get-current-pages/get-current-pages?test=123'

describe('getCurrentPages', () => {
  if (isAppWebView) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page
  const deviceScreenshotParams = {
    deviceShot: true,
    area: {
      x: 0,
      y: 0,
    }
  }
  it('getCurrentPages', async () => {
    // web 端等待应用首页加载完成
    if (isWeb) {
      const waitTime = process.env.uniTestPlatformInfo.includes('safari') ?
        5000 :
        3000
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, waitTime)
      })
    }
    page = isDom2 ? await program.redirectTo(HOME_PAGE_PATH) : await program.switchTab(HOME_PAGE_PATH)
    await page.waitFor(1000)
    page = await program.navigateTo(PAGE_PATH)
    await page.waitFor(1000)
    await page.callMethod('_getCurrentPages')
    await page.waitFor(200)
    const data = await page.data('data')
    expect(data.checked).toBe(true)
  })

  it('$page', async () => {
    await page.setData({data:{testing: true}})
    const pageRes = await page.callMethod('check$page')
    expect(pageRes).toBe(true)

    expect(await page.callMethod('componentCheck$page')).toBe(true)
  })

  if (isMP) {
    return
  }
  it('page-style', async () => {
    const windowInfo = await program.callUniMethod('getWindowInfo');
    deviceScreenshotParams.area.y = windowInfo.safeAreaInsets.top + 44;

    await page.callMethod('getPageStyle')
    await page.waitFor(200)
    const isEnablePullDownRefresh1 = await page.data('data.currentPageStyle.enablePullDownRefresh')
    expect(isEnablePullDownRefresh1).toBe(true)

    // setPageStyle
    await page.callMethod('setPageStyle', {
      enablePullDownRefresh: false
    })
    await page.waitFor(200)

    await page.callMethod('getPageStyle')
    await page.waitFor(200)
    const isEnablePullDownRefresh2 = await page.data('data.currentPageStyle.enablePullDownRefresh')
    expect(isEnablePullDownRefresh2).toBe(false)

    await page.callMethod('startPullDownRefresh')
    await page.waitFor(500)
    const image2 = await program.screenshot({fullPage: true});
    expect(image2).toSaveImageSnapshot({customSnapshotIdentifier() {
      return 'get-current-pages-test-js-get-current-pages-page-style-before-set-page-style'
    }});

    await page.waitFor(3500)
    await page.callMethod('setPageStyle', {
      enablePullDownRefresh: true
    })
    await page.waitFor(200)
    await page.callMethod('startPullDownRefresh')
    await page.waitFor(500)
    const image3 = await program.screenshot({fullPage: true});
    expect(image3).toSaveImageSnapshot({customSnapshotIdentifier() {
      return 'get-current-pages-test-js-get-current-pages-page-style-after-set-page-style'
    }});
    await page.waitFor(3500)

    // setPageStyle
    await page.callMethod('setPageStyle', {
      androidThreeButtonNavigationBackgroundColor: 'aqua'
    });
    await page.waitFor(2000);
    const image4 = await program.screenshot(deviceScreenshotParams);
    expect(image4).toSaveImageSnapshot({customSnapshotIdentifier() {
      return 'get-current-pages-test-androidThreeButtonNavigationBackgroundColor'
    }});

    await page.callMethod('setPageStyle', {
      androidThreeButtonNavigationStyle: 'black'
    });
    await page.waitFor(2000);
    const image5 = await program.screenshot(deviceScreenshotParams);
    expect(image5).toSaveImageSnapshot({customSnapshotIdentifier() {
      return 'get-current-pages-test-androidThreeButtonNavigationStyle'
    }});

    await page.callMethod('setPageStyle', {
      androidThreeButtonNavigationTranslucent: true
    });
    await page.waitFor(2000);
    const image6 = await program.screenshot(deviceScreenshotParams);
    expect(image6).toSaveImageSnapshot({customSnapshotIdentifier() {
      return 'get-current-pages-test-androidThreeButtonNavigationTranslucent'
    }});

    await program.adbCommand('settings put secure immersive_mode_confirmations confirmed');
    await page.callMethod('setPageStyle', {
      hideBottomNavigationIndicator: true,
      hideStatusBar: true
    })
    await page.waitFor(2000);
    const image7 = await program.screenshot(deviceScreenshotParams);
    expect(image7).toSaveImageSnapshot({customSnapshotIdentifier() {
      return 'get-current-pages-test-hideStatusBar-hideBottomNavigationIndicator'
    }});
  })
  it('getParentPage', async () => {
    const res = await page.callMethod('checkGetParentPage')
    expect(res).toBe(true)
  })
  it('getDialogPages', async () => {
    const res = await page.callMethod('checkGetDialogPages')
    expect(res).toBe(true)
  })
  it('getElementById', async () => {
    const res = await page.callMethod('checkGetElementById')
    expect(res).toBe(true)
  })
  it('getAndroidView', async () => {
    const res = await page.callMethod('checkGetAndroidView')
    expect(res).toBe(isAndroid)
  })
  it('getIOSView', async () => {
    const res = await page.callMethod('checkGetIOSView')
    expect(res).toBe(false)
  })
  it('getHTMLElement', async () => {
    const res = await page.callMethod('checkGetHTMLElement')
    expect(res).toBe(isWeb)
  })
  it('querySelector', async () => {
    const res = await page.callMethod('checkQuerySelector')
    expect(res).toBe(true)
  })
  it('querySelectorAll', async () => {
    const res = await page.callMethod('checkQuerySelectorAll')
    expect(res).toBe(true)
  })

  if(isAndroid) {
    it('getAndroidActivity', async () => {
      const res = await page.callMethod('checkGetAndroidActivity')
      expect(res).toBe(true)
    })
  }

  if(isApp) {
    it('takeSnapshot', async () => {
      await page.callMethod('checkTakeSnapshot')
      await page.waitFor(2000)
      expect(await page.data('data.checkSnapshotResult')).toBe(true)
    })
  }
})
