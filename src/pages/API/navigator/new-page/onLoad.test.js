const PAGE_PATH = "/pages/API/navigator/new-page/onLoad";
const INTERMEDIATE_PAGE_PATH = "/pages/API/navigator/new-page/new-page-1";
const TARGET_PAGE_PATH = "/pages/API/navigator/new-page/new-page-3";

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isIos = platformInfo.startsWith('ios')
const isMP = platformInfo.startsWith('mp')
const isAndroid = platformInfo.startsWith('android')
const isHarmony = platformInfo.startsWith('harmony')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
const isVapor = process.env.UNI_APP_X_DOM2 === "true"
let page;

describe("onLoad", () => {
  if (isMP) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }
  if (
    isIos &&
    (platformInfo.indexOf('15.5') != -1 ||
    platformInfo.indexOf('14.5') != -1 ||
    platformInfo.indexOf('13.7') != -1 ||
    platformInfo.indexOf('12.4') != -1)
  ) {
    // TODO: 排查 ios 不兼容版本 测试异常原因
    it('ios 15.5 14.5 13.7 12.4 测试异常', () => {
      expect(1).toBe(1)
    })
    return
  }

  const OVERLAY_SHOW_SETTLE_TIME = 1000
  const OVERLAY_HIDE_SETTLE_TIME = 1000
  let deviceShotOptions = {}
  beforeAll(async () => {
    page = await program.reLaunch(INTERMEDIATE_PAGE_PATH);
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
  })

  async function navigateToOnLoadScreenshotCase(type) {
    page = await program.reLaunch(INTERMEDIATE_PAGE_PATH)
    await page.waitFor('view')
    await page.callMethod('navigateToOnLoadWithType', type, true)
    await page.waitFor(OVERLAY_SHOW_SETTLE_TIME)
    page = await program.currentPage()
    expect(page.path).toBe(PAGE_PATH.substring(1))
  }

  async function saveScreenshot() {
    const image = await program.screenshot(deviceShotOptions)
    expect(image).toSaveImageSnapshot()
  }

  it("adjustData", async () => {
    await page.callMethod("navigateToOnLoadWithType", "adjustData", false);
    await page.waitFor(1000);
    const image = await program.screenshot(deviceShotOptions);
    expect(image).toSaveImageSnapshot();
  });
  it("navigateTo", async () => {
    page = await program.reLaunch(INTERMEDIATE_PAGE_PATH);
    await page.waitFor('view');
    await page.callMethod("navigateToOnLoadWithType", "navigateTo", false);
    await page.waitFor(1000);
    page = await program.currentPage();
    expect(page.path).toBe(TARGET_PAGE_PATH.substring(1));
  });
  if (!isAppWebView) {
    it("navigateBack", async () => {
        // harmony vapor 存在 https://issues.dcloud.net.cn/pages/issues/detail?id=31190 问题，导致这里测试失败
        page = await program.reLaunch(INTERMEDIATE_PAGE_PATH);
        await page.waitFor('view');
        await page.callMethod("navigateToOnLoadWithType", "navigateBack", false);
        await page.waitFor(1000);
        page = await program.currentPage();
        expect(page.path).toBe(INTERMEDIATE_PAGE_PATH.substring(1));
    });
  }
  it("redirectTo", async () => {
    page = await program.reLaunch(INTERMEDIATE_PAGE_PATH);
    await page.waitFor('view');
    await page.callMethod("navigateToOnLoadWithType", "redirectTo", false);
    await page.waitFor(100);
    page = await program.currentPage();
    expect(page.path).toBe(TARGET_PAGE_PATH.substring(1));
  });
  it("reLaunch", async () => {
    page = await program.reLaunch(INTERMEDIATE_PAGE_PATH);
    await page.waitFor('view');
    await page.callMethod("navigateToOnLoadWithType", "reLaunch", false);
    await page.waitFor(100);
    page = await program.currentPage();
    expect(page.path).toBe(TARGET_PAGE_PATH.substring(1));
  });
  if (!isVapor) {
  // dom2 目前 tabbar 是页面+组件实现，无法支持 switchTab 测试
  it("switchTab", async () => {
    page = await program.reLaunch(INTERMEDIATE_PAGE_PATH);
    await page.waitFor('view');
    await page.callMethod("navigateToOnLoadWithType", "switchTab", false);
    await page.waitFor(100);
    page = await program.currentPage();
    expect(page.path).toBe("pages/tabBar/component");
  });
  }
  it("showToast", async () => {
    await navigateToOnLoadScreenshotCase('showToast')
    try {
      await saveScreenshot()
    } finally {
      await page.callMethod('hideToast')
      await page.waitFor(OVERLAY_HIDE_SETTLE_TIME)
    }
  });
  it("showLoading", async () => {
    await navigateToOnLoadScreenshotCase('showLoading')
    await saveScreenshot()
    await page.callMethod('hideLoading')
    await page.waitFor(OVERLAY_HIDE_SETTLE_TIME)
  });
  it("showModal", async () => {
    await navigateToOnLoadScreenshotCase('showModal')
    await saveScreenshot()
  });
  it("showActionSheet", async () => {
    await navigateToOnLoadScreenshotCase('showActionSheet')
    await saveScreenshot()
    await page.callMethod('hideActionSheet')
    await page.waitFor(OVERLAY_HIDE_SETTLE_TIME)
  });
  it('onLoad 参数 decode', async () => {
    page = await program.reLaunch(PAGE_PATH);
    await page.waitFor("view");
    const TEXT = '中文测试'
    uni.navigateTo({
      url: INTERMEDIATE_PAGE_PATH + '?data=' + encodeURIComponent(TEXT),
      success() {

      }
    })
    await page.waitFor(1000);
    page = await program.currentPage();
    const pageData = await page.data('data');
    expect(pageData.data).toBe(TEXT);
  })
});
