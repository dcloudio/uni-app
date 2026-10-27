jest.setTimeout(50000)

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isApp = isAndroid || isIos || isHarmony
const isWeb = platformInfo.startsWith('web')
const isMP = platformInfo.startsWith('mp')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

const PAGE_PATH = '/pages/API/action-sheet/action-sheet'
const ACTION_SHEET_SETTLE_TIME = 1000

describe('showActionSheet', () => {
  if (isMP) {
    it('skip', () => {
      expect(1).toBe(1)
    })
    return
  }

  let screenShotOptions = { fullPage: true };
  let page;
  let topSafeArea = 0
  
  // 测试辅助函数
  async function setPageData(newData) {
    return await page.setData({ data: newData });
  }

  async function hideActionSheet(page) {
    await page.callMethod('hideActionSheet')
    await page.waitFor(ACTION_SHEET_SETTLE_TIME)
  }

  async function showActionSheet(page) {
    await hideActionSheet(page)
    const btn = await page.$('#btn-action-sheet-show')
    await btn.tap()
    await page.waitFor(ACTION_SHEET_SETTLE_TIME)
  }

  async function screenshot(fileName) {
    const image = isWeb ? await program.screenshot(screenShotOptions) : await program.device.screenshot(screenShotOptions);
    const options = fileName ? {
      customSnapshotIdentifier() {
        return fileName
      }
    } : {}
    if (!isAppWebView) {
      expect(image).toMatchImageSnapshot({ ...options,
        failureThresholdType: 'percent',
        failureThreshold: 0.1,
      });
    }
    expect(image).toSaveImageSnapshot(options);
  }

  beforeAll(async () => {
    const windowInfo = await program.callUniMethod('getWindowInfo');
    topSafeArea = windowInfo.safeAreaInsets.top;
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

		page = await program.reLaunch('/pages/tabBar/API');
    await page.waitFor('view');

    page = await program.navigateTo(PAGE_PATH)
    await page.waitFor('view');
    if (isApp) {
      if((isAndroid || isIos) && !isAppWebView){
        await page.callMethod('setThemeAuto')
      }
      const top = topSafeArea + 44
      // actionSheet overlays the page window and can extend below its content area.
      const bottom = windowInfo.safeArea.bottom
      const left = windowInfo.safeArea.left
      const right = windowInfo.safeArea.right - 10
      screenShotOptions = {
        deviceShot: true,
        area: {
          x: left,
          y: top,
          width: right - left,
          height: bottom - top
        },
      }
    }
  });

  it("onload showActionSheet", async () => {
    await page.waitFor(async () => {
      const pageData = await page.data('data')
      return pageData.onReadyActionSheetCalled === true
    })
    await page.waitFor(isWeb ? 3000 : ACTION_SHEET_SETTLE_TIME);
    await screenshot();
    // 非交互关闭应触发 fail 回调
    if (!isMP) {
      const originLifeCycleNum = await page.callMethod('getLifeCycleNum');
      await program.navigateBack();
      await page.waitFor(1000);
      page = await program.navigateTo(PAGE_PATH)
      await page.waitFor('view');
      const newLifeCycleNum = await page.callMethod('getLifeCycleNum');
      expect(newLifeCycleNum).toBe(originLifeCycleNum + 2);
    }
  })

  it("有标题", async () => {
    await setPageData({
      showErrorToast:false,
      current: 0,
    })
    await showActionSheet(page);
    await screenshot();
  })

  it("有标题 长内容", async () => {
    await setPageData({
      itemContentLarge:true,
    })
    await showActionSheet(page);
    await screenshot();
  })

  it("有标题 超过6个item", async () => {
    await setPageData({
      itemContentLarge:false,
      itemNumLargeSelect:true,
    })
    await showActionSheet(page);
    await screenshot();
  })

  it("有标题 长内容 自定义 itemColor", async () => {
    await setPageData({
      itemContentLarge: true,
      itemNumLargeSelect: false,
      itemColorCustom: true,
    })
    await showActionSheet(page);
    await screenshot();
  })

  it("无标题", async () => {
    await setPageData({
      current: 1,
      itemContentLarge:false,
      itemColorCustom:false,
    })
    await showActionSheet(page);
    await screenshot();
  })

  it("长标题", async () => {
    await setPageData({
      current: 2,
    })
    await showActionSheet(page);
    await screenshot();
  })
  if (!isMP) {
    it("custom titleColor cancelText cancelColor backgroundColor", async () => {
      await setPageData({
        titleColorCustom: true,
        cancelTextCustom: true,
        cancelColorCustom: true,
        backgroundColorCustom: true,
      })
      await showActionSheet(page);
      await page.waitFor(1000)
      await screenshot();
    })
  }
  it("showActionSheet 并在回调中再次 showActionSheet", async () => {
    await hideActionSheet(page)
    await page.callMethod('showActionSheetAndShowAgainInCallback')
    await page.waitFor(1000);
    await screenshot('showActionSheetAndShowAgainInCallback1');
    if (isApp) {
      await program.device.tap(200, 700)
    } else if (isWeb) {
      await page.callMethod('closeWebActionSheet')
    }
    await page.waitFor(1000);
    await screenshot('showActionSheetAndShowAgainInCallback2');
  })
  if (!isMP) {
    it("hideActionSheet", async () => {
      await page.callMethod('hideActionSheet')
      await page.waitFor(1000);

      await screenshot();
    })
  }
  // 针对 https://issues.dcloud.net.cn/pages/issues/detail?id=19068 的补充测试，故仅测试 Android 一台设备
  if (platformInfo.startsWith('android 13')) {
    it('navigateBack in action-sheet success callback', async () => {
      const originLifeCycleNum = await page.callMethod('getLifeCycleNum');
      await page.callMethod('showActionSheetAndNavigateBackInSuccessCallback');
      await page.waitFor(1000);
      await program.device.tap(100, 700 + topSafeArea);
      // success callback + 1
      // 等待 back 完成
      await page.waitFor(1000);
      page = await program.navigateTo(PAGE_PATH)
      // 等待页面跳转完成
      await page.waitFor('view');
      const newLifeCycleNum = await page.callMethod('getLifeCycleNum');
      expect(newLifeCycleNum).toBe(originLifeCycleNum + 1);
    });
  }
  afterAll(async () => {
    if (!isMP) {
      await page.callMethod('hideActionSheet')
      await page.waitFor(1000);
    }
    await page.callMethod('setLifeCycleNumFunc', 1100);
    if(isApp && !isAppWebView){
      await page.callMethod('resetTheme')
    }
  });
});
