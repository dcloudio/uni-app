jest.setTimeout(30000)

const PAGE_PATH = "/pages/API/pull-down-refresh/pull-down-refresh"
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isIos = platformInfo.startsWith('ios')
const isWeb = platformInfo.startsWith('web')
const isMP = platformInfo.startsWith('mp')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

describe("pull-down-refresh", () => {
  if (isAppWebView || isMP) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }

  if (process.env.UNI_TEST_DEVICES_DIRECTION == 'landscape') {
    it('跳过横屏模式', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page;

  async function setPageData(newData) {
    return await page.setData({ data: newData });
  }

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
  });

  if (!isWeb) {
    it("trigger pulldown refresh by swipe", async () => {
      await page.waitFor('view')
      await page.waitFor(4000)
      await setPageData({
        pulldownRefreshTriggered: false
      })

      if (isIos) {
        // 暂时通过点击关闭授权弹框，避免影响 swipe 测试
        await program.tap({
          x: 100,
          y: 500
        })
      }
      expect(await page.data('data.startPullDownRefreshStaus')).toBe(true)

      await program.swipe({
        startPoint: {
          x: 100,
          y: 400
        },
        endPoint: {
          x: 100,
          y: 900
        },
        duration: 1000
      })
      await page.waitFor(1500)
      expect(await page.data('data.pulldownRefreshTriggered')).toBe(true)
    });
  }

  it("start and stop pulldown refresh after showLoading and hideLoading", async () => {
    const button = await page.$('#btn-pull-down-refresh-after-hide-loading')
    await button.tap()
    await page.waitFor(async () => {
      return await page.data('data.stopPullDownRefreshCalled') === true
    })

    expect(await page.data('data.startPullDownRefreshStaus')).toBe(true)
    expect(await page.data('data.pulldownRefreshTriggered')).toBe(true)
    expect(await page.data('data.showLoadingSuccess')).toBe(true)
    expect(await page.data('data.hideLoadingSuccess')).toBe(true)
    expect(await page.data('data.stopPullDownRefreshCalled')).toBe(true)
    expect(await page.data('data.loadingAndPullDownRefreshEvents')).toEqual([
      'showLoading',
      'hideLoading',
      'startPullDownRefresh',
      'stopPullDownRefresh'
    ])

    await page.waitFor(500)
    const image = await program.screenshot({ fullPage: true })
    expect(image).toSaveImageSnapshot({
      customSnapshotIdentifier() {
        return 'pull-down-refresh-start-stop-after-hide-loading'
      }
    })
  });
});
