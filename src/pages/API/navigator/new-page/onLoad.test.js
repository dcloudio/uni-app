jest.setTimeout(20000);
const PAGE_PATH = "/pages/API/navigator/new-page/onLoad";
const INTERMEDIATE_PAGE_PATH = "/pages/API/navigator/new-page/new-page-1";
const TARGET_PAGE_PATH = "/pages/API/navigator/new-page/new-page-3";

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isIos = platformInfo.startsWith('ios')
const isMP = platformInfo.startsWith('mp')
const isAndroid = platformInfo.startsWith('android')
const isHarmony = platformInfo.startsWith('harmony')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
const isDom2 = process.env.UNI_APP_X_DOM2 === "true"
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

  let deviceShotOptions = {}
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
        } else if (platformInfo.startsWith('android 13')) {
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
  })

  it("adjustData", async () => {
    page = await program.reLaunch(INTERMEDIATE_PAGE_PATH);
    await page.waitFor('view');
    await page.callMethod("navigateToOnLoadWithType", "adjustData");
    await page.waitFor(1000);
    const image = await program.screenshot({
      fullPage: true
    });
    expect(image).toSaveImageSnapshot();
  });
  it("navigateTo", async () => {
    page = await program.reLaunch(INTERMEDIATE_PAGE_PATH);
    await page.waitFor('view');
    await page.callMethod("navigateToOnLoadWithType", "navigateTo");
    await page.waitFor(1000);
    page = await program.currentPage();
    expect(page.path).toBe(TARGET_PAGE_PATH.substring(1));
  });
  it("navigateBack", async () => {
    if (isAndroid && !isAppWebView) {
      page = await program.reLaunch(INTERMEDIATE_PAGE_PATH);
      await page.waitFor('view');
      await page.callMethod("navigateToOnLoadWithType", "navigateBack");
      await page.waitFor('view');
      page = await program.currentPage();
      expect(page.path).toBe(INTERMEDIATE_PAGE_PATH.substring(1));
    }
  });
  it("redirectTo", async () => {
    page = await program.reLaunch(INTERMEDIATE_PAGE_PATH);
    await page.waitFor('view');
    await page.callMethod("navigateToOnLoadWithType", "redirectTo");
    await page.waitFor(100);
    page = await program.currentPage();
    expect(page.path).toBe(TARGET_PAGE_PATH.substring(1));
  });
  it("reLaunch", async () => {
    page = await program.reLaunch(INTERMEDIATE_PAGE_PATH);
    await page.waitFor('view');
    await page.callMethod("navigateToOnLoadWithType", "reLaunch");
    await page.waitFor(100);
    page = await program.currentPage();
    expect(page.path).toBe(TARGET_PAGE_PATH.substring(1));
  });
  if (!isDom2) {
  // dom2 目前 tabbar 是页面+组件实现，无法支持 switchTab 测试
  it("switchTab", async () => {
    page = await program.reLaunch(INTERMEDIATE_PAGE_PATH);
    await page.waitFor('view');
    await page.callMethod("navigateToOnLoadWithType", "switchTab");
    await page.waitFor(100);
    page = await program.currentPage();
    expect(page.path).toBe("pages/tabBar/component");
  });
  }
  it("showToast", async () => {
    page = await program.reLaunch(INTERMEDIATE_PAGE_PATH);
    await page.waitFor("view");
    await page.callMethod("navigateToOnLoadWithType", "showToast");
    await page.waitFor(1000);
    const image = await program.screenshot(deviceShotOptions);
    expect(image).toSaveImageSnapshot({
      failureThreshold: 0.05,
      failureThresholdType: "percent",
    });
    await page.waitFor(2000);
  });
  it("showLoading", async () => {
    page = await program.reLaunch(INTERMEDIATE_PAGE_PATH);
    await page.waitFor("view");
    await page.callMethod("navigateToOnLoadWithType", "showLoading");
    await page.waitFor(1000);
    const image = await program.screenshot(deviceShotOptions);
    expect(image).toSaveImageSnapshot({
      failureThreshold: 0.05,
      failureThresholdType: "percent",
    });
    await page.waitFor(2000);
  });
  it("showModal", async () => {
    page = await program.reLaunch(INTERMEDIATE_PAGE_PATH);
    await page.waitFor("view");
    await page.callMethod("navigateToOnLoadWithType", "showModal");
    await page.waitFor(1000);
    const image = await program.screenshot(deviceShotOptions);
    expect(image).toSaveImageSnapshot({
      failureThreshold: 0.05,
      failureThresholdType: "percent",
    });
  });
  it("showActionSheet", async () => {
    page = await program.reLaunch(INTERMEDIATE_PAGE_PATH);
    await page.waitFor("view");
    await page.callMethod("navigateToOnLoadWithType", "showActionSheet");
    await page.waitFor(1000);
    const image = await program.screenshot(deviceShotOptions);
    expect(image).toSaveImageSnapshot({
      failureThreshold: 0.05,
      failureThresholdType: "percent",
    });
    page = await program.currentPage();
    await page.callMethod("hideActionSheet");
    await page.waitFor(1000);
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
