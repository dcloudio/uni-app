jest.setTimeout(30000)

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isHarmony = platformInfo.startsWith('harmony')
const isIos = platformInfo.startsWith('ios')
const isAndroid = platformInfo.startsWith('android')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

const PAGE_PATH = '/pages/API/modal/modal'

describe('modal', () => {
  if(isMP) {
    // 微信小程序截图无法截到弹框
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }

  if (
    isIos &&
    (
      platformInfo.indexOf('15.5') != -1 ||
      platformInfo.indexOf('14.5') != -1 ||
      platformInfo.indexOf('13.7') != -1 ||
      platformInfo.indexOf('12.4') != -1
    )
  ) {
    // TODO: 排查 ios 不兼容版本 测试异常原因
    it('ios 15.5 14.5 13.7 12.4 测试异常', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page;
  let deviceShotOptions = {}

  // 测试辅助函数
  async function setPageData(newData) {
    return await page.setData({ data: newData });
  }

  async function screenshot(isEditable) {
    const image = await program.screenshot(deviceShotOptions);
    if (!isEditable && !isAppWebView) {
      expect(image).toMatchImageSnapshot({
        failureThresholdType: 'percent',
        failureThreshold: 0.1,
      });
    }
    if (isEditable && isAppWebView) return;
    
    expect(image).toSaveImageSnapshot();
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
    await page.waitFor(1000);
  });

  it("onload-modal-test", async () => {
    await screenshot()
  })

  it("modal-test-current-0", async () => {
    page = await program.reLaunch(PAGE_PATH+ '?onLoadShowModal=false')
    await page.waitFor('view');
    /**
     * 延迟3s 关闭
     */
    const btnModalButtonHideAll = await page.$('#btn-modal-hide-all')
    await btnModalButtonHideAll.tap()
    await page.waitFor(500);

    await setPageData({
      current: 0,
      showCancelSelect: false,
      cancelTextSelect: false,
      confirmTextSelect: false,
      editableSelect: false,
      placeholderTextSelect: false,
    })


    const btnModalButton = await page.$('#btn-modal-show')
    await btnModalButton.tap()
    await page.waitFor(800);

    await screenshot()

    await page.waitFor(2000);

  })

  it("modal-test-current-1", async () => {
    page = await program.reLaunch(PAGE_PATH+ '?onLoadShowModal=false')
    await page.waitFor('view');

    await setPageData({
      current: 1,
      showCancelSelect: false,
      cancelTextSelect: false,
      confirmTextSelect: false,
      editableSelect: false,
      placeholderTextSelect: false,
    })

    /**
     * 延迟3s 关闭
     */
    const btnModalButtonHideLast = await page.$('#btn-modal-hide-last')
    await btnModalButtonHideLast.tap()
    await page.waitFor(500);

    const btnModalButton = await page.$('#btn-modal-show')
    await btnModalButton.tap()
    await page.waitFor(800);

    await screenshot()
    await page.waitFor(2000);
  })

  it("modal-test-current-2", async () => {
    page = await program.reLaunch(PAGE_PATH+ '?onLoadShowModal=false')
    await page.waitFor('view');

    /**
     * 延迟3s 关闭
     */
    const btnModalButtonHideLast = await page.$('#btn-modal-hide-last')
    await btnModalButtonHideLast.tap()
    await page.waitFor(500);

    await setPageData({
      current: 2,
      showCancelSelect: false,
      cancelTextSelect: false,
      confirmTextSelect: false,
      editableSelect: false,
      placeholderTextSelect: false,
    })

    const btnModalButton = await page.$('#btn-modal-show')
    await btnModalButton.tap()
    await page.waitFor(800);

    await screenshot()

    await page.waitFor(2000);
  })

  it("modal-test-current-2-showCancel", async () => {
    page = await program.reLaunch(PAGE_PATH+ '?onLoadShowModal=false')
    await page.waitFor('view');

    /**
     * 延迟3s 关闭
     */
    const btnModalButtonHideLast = await page.$('#btn-modal-hide-last')
    await btnModalButtonHideLast.tap()
    await page.waitFor(500);

    await setPageData({
      current: 2,
      showCancelSelect: true,
      cancelTextSelect: false,
      confirmTextSelect: false,
      editableSelect: false,
      placeholderTextSelect: false,
    })

    const btnModalButton = await page.$('#btn-modal-show')
    await btnModalButton.tap()
    await page.waitFor(800);

    await screenshot()

    await page.waitFor(2000);
  })

  it("modal-test-current-2-showCancel-cancelText", async () => {
    page = await program.reLaunch(PAGE_PATH+ '?onLoadShowModal=false')
    await page.waitFor('view');

    await setPageData({
      current: 2,
      showCancelSelect: true,
      cancelTextSelect: true,
      confirmTextSelect: false,
      editableSelect: false,
      placeholderTextSelect: false,
    })

    /**
     * 延迟3s 关闭
     */
    const btnModalButtonHideLast = await page.$('#btn-modal-hide-last')
    await btnModalButtonHideLast.tap()
    await page.waitFor(500);

    const btnModalButton = await page.$('#btn-modal-show')
    await btnModalButton.tap()
    await page.waitFor(800);

    await screenshot()

    await page.waitFor(2000);
  })

  it("modal-test-current-2-showCancel-cancelText-confirmText", async () => {
    page = await program.reLaunch(PAGE_PATH+ '?onLoadShowModal=false')
    await page.waitFor('view');

    await setPageData({
      current: 2,
      showCancelSelect: true,
      cancelTextSelect: true,
      confirmTextSelect: true,
      editableSelect: false,
      placeholderTextSelect: false,
    })

    /**
     * 延迟3s 关闭
     */
    const btnModalButtonHideLast = await page.$('#btn-modal-hide-last')
    await btnModalButtonHideLast.tap()
    await page.waitFor(500);

    const btnModalButton = await page.$('#btn-modal-show')
    await btnModalButton.tap()
    await page.waitFor(800);

    await screenshot()

    await page.waitFor(2000);
  })

  it("modal-test-current-2-showCancel-cancelText-confirmText-editable-placeholder", async () => {
    page = await program.reLaunch(PAGE_PATH+ '?onLoadShowModal=false')
    await page.waitFor('view');

    /**
     * 延迟3s 关闭
     */
    const btnModalButtonHideLast = await page.$('#btn-modal-hide-last')
    await btnModalButtonHideLast.tap()
    await page.waitFor(500);

    await setPageData({
      current: 2,
      showCancelSelect: true,
      cancelTextSelect: true,
      confirmTextSelect: true,
      editableSelect: true,
      placeholderTextSelect: true,
    })

    const btnModalButton = await page.$('#btn-modal-show')
    await btnModalButton.tap()
    await page.waitFor(800);

    await screenshot(true)

    await page.waitFor(2000);
  })


  it("modal-test-current-2-showCancel-confirmText-editable-placeholder", async () => {
    page = await program.reLaunch(PAGE_PATH+ '?onLoadShowModal=false')
    await page.waitFor('view');

    /**
     * 延迟3s 关闭
     */
    const btnModalButtonHideLast = await page.$('#btn-modal-hide-last')
    await btnModalButtonHideLast.tap()
    await page.waitFor(500);

    await setPageData({
      current: 2,
      showCancelSelect: true,
      cancelTextSelect: false,
      confirmTextSelect: true,
      editableSelect: true,
      placeholderTextSelect: true,
    })

    const btnModalButton = await page.$('#btn-modal-show')
    await btnModalButton.tap()
    await page.waitFor(800);

    await screenshot(true)

    await page.waitFor(2000);
  })

  it("modal-test-current-2-showCancel-editable-placeholder", async () => {
    page = await program.reLaunch(PAGE_PATH+ '?onLoadShowModal=false')
    await page.waitFor('view');

    /**
     * 延迟3s 关闭
     */
    const btnModalButtonHideLast = await page.$('#btn-modal-hide-last')
    await btnModalButtonHideLast.tap()
    await page.waitFor(500);

    await setPageData({
      current: 2,
      showCancelSelect: true,
      cancelTextSelect: false,
      confirmTextSelect: false,
      editableSelect: true,
      placeholderTextSelect: true,
    })

    const btnModalButton = await page.$('#btn-modal-show')
    await btnModalButton.tap()
    await page.waitFor(800);

    await screenshot(true)

    await page.waitFor(2000);
  })

  it("modal-test-current-2-showCancel-placeholder", async () => {
    page = await program.reLaunch(PAGE_PATH+ '?onLoadShowModal=false')
    await page.waitFor('view');

    /**
     * 延迟3s 关闭
     */
    const btnModalButtonHideLast = await page.$('#btn-modal-hide-last')
    await btnModalButtonHideLast.tap()
    await page.waitFor(500);

    await setPageData({
      current: 2,
      showCancelSelect: true,
      cancelTextSelect: false,
      confirmTextSelect: false,
      editableSelect: false,
      placeholderTextSelect: true,
    })

    const btnModalButton = await page.$('#btn-modal-show')
    await btnModalButton.tap()
    await page.waitFor(800);

    await screenshot()

    await page.waitFor(2000);
  })

  it("modal-test-current-2-showCancel-cancelText-editable-placeholder", async () => {
    page = await program.reLaunch(PAGE_PATH+ '?onLoadShowModal=false')
    await page.waitFor('view');

    /**
     * 延迟3s 关闭
     */
    const btnModalButtonHideLast = await page.$('#btn-modal-hide-last')
    await btnModalButtonHideLast.tap()
    await page.waitFor(500);

    await setPageData({
      current: 2,
      showCancelSelect: true,
      cancelTextSelect: true,
      confirmTextSelect: false,
      editableSelect: true,
      placeholderTextSelect: true,
    })

    const btnModalButton = await page.$('#btn-modal-show')
    await btnModalButton.tap()
    await page.waitFor(800);

    await screenshot(true)

    await page.waitFor(2000);
  })

  it("modal-test-current-2-showCancel-cancelText-placeholder", async () => {
    page = await program.reLaunch(PAGE_PATH+ '?onLoadShowModal=false')
    await page.waitFor('view');

    /**
     * 延迟3s 关闭
     */
    const btnModalButtonHideLast = await page.$('#btn-modal-hide-last')
    await btnModalButtonHideLast.tap()
    await page.waitFor(500);

    await setPageData({
      current: 2,
      showCancelSelect: true,
      cancelTextSelect: true,
      confirmTextSelect: false,
      editableSelect: false,
      placeholderTextSelect: true,
    })

    const btnModalButton = await page.$('#btn-modal-show')
    await btnModalButton.tap()
    await page.waitFor(800);

    await screenshot()

    await page.waitFor(2000);

  })

  it("modal-test-current-2-showCancel-cancelText-confirmText-placeholder", async () => {
    page = await program.reLaunch(PAGE_PATH+ '?onLoadShowModal=false')
    await page.waitFor('view');

    /**
     * 延迟3s 关闭
     */
    const btnModalButtonHideLast = await page.$('#btn-modal-hide-last')
    await btnModalButtonHideLast.tap()
    await page.waitFor(500);

    await setPageData({
      current: 2,
      showCancelSelect: true,
      cancelTextSelect: true,
      confirmTextSelect: true,
      editableSelect: false,
      placeholderTextSelect: true,
    })

    const btnModalButton = await page.$('#btn-modal-show')
    await btnModalButton.tap()
    await page.waitFor(800);

    await screenshot()

    await page.waitFor(2000);
  })

  it("modal-test-current-2-showCancel-cancelText-confirmText-editable", async () => {
    page = await program.reLaunch(PAGE_PATH+ '?onLoadShowModal=false')
    await page.waitFor('view');

    /**
     * 延迟3s 关闭
     */
    const btnModalButtonHideLast = await page.$('#btn-modal-hide-last')
    await btnModalButtonHideLast.tap()
    await page.waitFor(500);

    await setPageData({
      current: 2,
      showCancelSelect: true,
      cancelTextSelect: true,
      confirmTextSelect: true,
      editableSelect: true,
      placeholderTextSelect: false,
    })

    const btnModalButton = await page.$('#btn-modal-show')
    await btnModalButton.tap()
    await page.waitFor(800);

    await screenshot(true);

    await page.waitFor(2000);
  })

  it("modal-test-current-0-multi-time-show-hide-all", async () => {
    page = await program.reLaunch(PAGE_PATH+ '?onLoadShowModal=false')
    await page.waitFor('view');

    await setPageData({
      current: 0,
    })
    /**
     * 延迟3s 关闭
     */
    const btnModalButtonHideAll = await page.$('#btn-modal-hide-all')
    await btnModalButtonHideAll.tap()
    await page.waitFor(500);
    /**
     * 等待1s 出现三个截图
     */
    const btnModalButtonMultiTime = await page.$('#btn-modal-show-multitime')
    await btnModalButtonMultiTime.tap()
    await page.waitFor(1000);

    await screenshot('modal-test-current-0-multi-time-show');
    /**
     * 等待2s 全部关闭全部
     */
    await page.waitFor(2000);
    await screenshot('modal-test-current-0-multi-time-show-hide-all');
  })

  it("modal-test-current-1-multi-time-show-hide-last", async () => {
    page = await program.reLaunch(PAGE_PATH+ '?onLoadShowModal=false')
    await page.waitFor('view');

    await setPageData({
      current: 1,
    })
    /**
     * 延迟3s 关闭最后一个
     */
    const btnModalButtonHideLast = await page.$('#btn-modal-hide-last')
    await btnModalButtonHideLast.tap()
    await page.waitFor(500);
    /**
     * 等待1s 出现三个截图
     */
    const btnModalButtonMultiTime = await page.$('#btn-modal-show-multitime')
    await btnModalButtonMultiTime.tap()
    await page.waitFor(1000);

    await screenshot('modal-test-current-1-multi-time-show');
    /**
     * 等待2s 还剩下两个
     */
    await page.waitFor(2000);

    await screenshot('modal-test-current-1-multi-time-show-hide-last');
  })
  it("placeholderText-no_content-editable", async () => {
    page = await program.reLaunch(PAGE_PATH+ '?onLoadShowModal=false')
    await setPageData({
      showCancelSelect: true,
      emptyContent: true,
      editableSelect: true,
      placeholderTextSelect: true,
    })
    await page.waitFor(1000);

    await page.callMethod('modalTap')
    await page.waitFor(800);
    await screenshot(true);

    await page.callMethod('closeAllModal')
    await page.waitFor(500);
  })

  it("no_placeholderText-no_content-editable", async () => {
    await setPageData({
      placeholderTextSelect: false,
    })
    await page.waitFor(1000);

    await page.callMethod('modalTap')
    await page.waitFor(800);
    await screenshot(true);

    await page.callMethod('closeAllModal')
    await page.waitFor(500);
  })
});
