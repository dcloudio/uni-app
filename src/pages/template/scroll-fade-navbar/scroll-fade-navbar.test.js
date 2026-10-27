const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMpAlipay = platformInfo === 'mp-alipay'
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

const PAGE_PATH = '/pages/template/scroll-fade-navbar/scroll-fade-navbar'

describe('scroll-fade-navbar', () => {
  let page
  let deviceShotOptions = {
    deviceShot: true,
    area: {
      x: 0,
      y: 0,
    },
  }

  beforeAll(async () => {
    if (isAppWebView) {
      it('该示例因 app 与 webview 时顶部状态栏存在差异，暂不做截图对比', () => {
        expect(1).toBe(1)
      })
      return
    }

    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view')
    await page.waitFor(800)

    const windowInfo = await program.callUniMethod('getWindowInfo')
    if (isMpAlipay) {
      // 支付宝透明导航页的 windowHeight 包含原生区域，页面下边界需扣除 screenTop。
      const top = windowInfo.statusBarHeight
      const bottom = windowInfo.screenHeight - windowInfo.screenTop
      deviceShotOptions.area = {
        x: 0,
        y: top,
        width: windowInfo.windowWidth,
        height: bottom - top,
      }
    } else {
      deviceShotOptions.area.y = windowInfo.safeAreaInsets.top
    }
  })

  async function scrollTo(scrollTop) {
    const scrollView = await page.$('.list-container')
    if (scrollView != null && typeof scrollView.scrollTo == 'function') {
      await scrollView.scrollTo(0, scrollTop)
    }
    else {
      await program.pageScrollTo(scrollTop)
    }
    await page.waitFor(500)
  }

  async function expectNavbarSnapshot() {
    const image = await program.screenshot(deviceShotOptions)
    expect(image).toSaveImageSnapshot()
  }

  it('screenshot at top transparent state', async () => {
    const title = await page.$('.content-inner-text')
    expect((await title.text()).trim()).toBe('标题')
    await expectNavbarSnapshot()
  })

  it('screenshot at scroll 50 half-faded state', async () => {
    await scrollTo(50)
    await expectNavbarSnapshot()
  })

  it('screenshot at scroll 100 fully-visible state', async () => {
    await scrollTo(100)
    await expectNavbarSnapshot()
  })

  it('screenshot after back-to-top restored state', async () => {
    await scrollTo(120)
    await scrollTo(0)
    await expectNavbarSnapshot()
  })
})
