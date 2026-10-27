jest.setTimeout(40000)

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isWeb = platformInfo.startsWith('web')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
const isMP = platformInfo.startsWith('mp')

describe('API-toast', () => {
  if ( isMP) {
    it('skip', async () => {
      expect(1).toBe(1);
    });
    return;
  }

  const PAGE_PATH = '/pages/API/toast/toast?autoTest=true'
  const TOAST_DURATION = 5000
  const TOAST_SHOW_SETTLE_TIME = 1000
  const TOAST_HIDE_SETTLE_TIME = 1000
  let page;
  let deviceShotOptions = {}
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor("view");
    await page.waitFor(1000);
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
    const right = windowInfo.safeArea.right - 10
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

  afterEach(async () => {
    if (page != null) {
      await page.callMethod('hideToast')
      await page.waitFor(TOAST_HIDE_SETTLE_TIME)
    }
  })

  async function screenShot(imgName) {
    const image = await program.screenshot(deviceShotOptions);
    const options = {customSnapshotIdentifier() {
      return imgName
    }
    }
    if (!isAppWebView) {
      expect(image).toMatchImageSnapshot({ ...options,
        failureThresholdType: 'percent',
        failureThreshold: 0.01,
      });
    }
    expect(image).toSaveImageSnapshot(options)
  }

  async function resetToastOptions(options = {}) {
    await page.callMethod('hideToast')
    await page.waitFor(TOAST_HIDE_SETTLE_TIME)
    const expectedData = {
      imageSelect: false,
      maskSelect: false,
      intervalSelect: TOAST_DURATION,
      icon_current: 0,
      position_current: 0,
      ...options,
    }
    await page.setData({
      data: expectedData
    })
    await page.waitFor(async () => {
      const pageData = await page.data('data')
      return pageData.intervalSelect === expectedData.intervalSelect &&
        pageData.icon_current === expectedData.icon_current &&
        pageData.imageSelect === expectedData.imageSelect &&
        pageData.maskSelect === expectedData.maskSelect &&
        pageData.position_current === expectedData.position_current
    })
  }

  async function showToastAndScreenShot(methodName, imgName) {
    await page.callMethod(methodName)
    await page.waitFor(TOAST_SHOW_SETTLE_TIME)
    await screenShot(imgName)
    await page.callMethod('hideToast')
    await page.waitFor(TOAST_HIDE_SETTLE_TIME)
  }

  it("onload-toast-test", async () => {
    await page.waitFor(async () => {
      const pageData = await page.data('data')
      return pageData.onMountedToastShown === true
    })
    await page.waitFor(TOAST_SHOW_SETTLE_TIME)
    await screenShot('toast-onload')
  })

  it("icon-toast-test", async () => {
    await resetToastOptions()
    const icons = await page.$$('.radio-icon')
    for (let i = 0; i < icons.length; i++) {
      await page.setData({ data: { icon_current: i } })
      await page.waitFor(async () => {
        const pageData = await page.data('data')
        return pageData.icon_current === i
      })
      const iconText = await icons[i].text()
      await showToastAndScreenShot('toast1Tap', `${iconText}-toast`)
    }
  })

  it("icon=none-mask=true-toast-test", async () => {
    await resetToastOptions({maskSelect: true})
    await showToastAndScreenShot('toast3Tap', 'icon=none-mask=true-toast-image')
  })

  it("image-toast-test", async () => {
    await resetToastOptions({imageSelect: true})
    await showToastAndScreenShot('toast1Tap', 'toast-image')
  })

  it("duration-toast-test", async () => {
    await resetToastOptions({intervalSelect: 4000})
    await page.callMethod('toast1Tap')
    await page.waitFor(2000);
    await screenShot('toast-duration-2000')
    await page.callMethod('hideToast')
    await page.waitFor(TOAST_HIDE_SETTLE_TIME)
    await screenShot('toast-duration-end')
  })

  it("position-toast-test", async () => {
    if (isIos) {
      const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
      if (
        platformInfo.indexOf('14.5') != -1 ||
        platformInfo.indexOf('13.7') != -1 ||
        platformInfo.indexOf('12.4') != -1
      ) {
        expect(1).toBe(1)
        return
      }
    }

    await resetToastOptions()
    const positions = await page.$$('.radio-position')
    for (let i = 0;i < positions.length;i++) {
      await page.setData({ data: { position_current: i } })
      await page.waitFor(async () => {
        const pageData = await page.data('data')
        return pageData.position_current === i
      })
      const pageData = await page.data('data')
      await showToastAndScreenShot('toast2Tap', `toast-position-${pageData.position_enum[i].value}`)
    }
  })

  if (isHarmony || isWeb) {
    it("system-toast-hide-test", async () => {
      await resetToastOptions()
      await page.callMethod('toast4Tap')
      await page.waitFor(TOAST_SHOW_SETTLE_TIME)

      let pageData = await page.data('data')
      expect(pageData.exeRet).toContain('success:')

      await page.callMethod('hideSystemToast')
      await page.waitFor(TOAST_HIDE_SETTLE_TIME)

      pageData = await page.data('data')
      expect(pageData.exeRet).toContain('complete:')
    })

    it("system-toast-close-race-test", async () => {
      await resetToastOptions()
      await page.callMethod('toast2Tap')
      await page.callMethod('toast2Tap')
      await page.waitFor(TOAST_SHOW_SETTLE_TIME)
      await page.callMethod('hideSystemToast')
      await page.waitFor(TOAST_HIDE_SETTLE_TIME)

      const pageData = await page.data('data')
      expect(pageData.exeRet).toContain('complete:')
    })
  }
});
