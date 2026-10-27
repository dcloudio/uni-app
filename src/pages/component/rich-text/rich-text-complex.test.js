jest.setTimeout(30000)

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isHarmony = platformInfo.startsWith('harmony')
const isIOS = platformInfo.startsWith('ios')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
const isVapor = process.env.UNI_APP_X_DOM2 === "true"

const PAGE_PATH = '/pages/component/rich-text/rich-text-complex'

async function screenshot(name) {
  const image = await program.screenshot({
    fullPage: true
  })
  expect(image).toSaveImageSnapshot({
    customSnapshotIdentifier() {
      return name
    }
  })
}

describe('rich-text-complex', () => {
  if (isMP || isWeb || process.env.UNI_TEST_DEVICES_DIRECTION == 'landscape') {
    it('skip', () => {
      expect(1).toBe(1)
    })
    return
  }

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view');
    await page.waitFor(2000);
    await setPageData({
      autoTest: true
    });
  })

  let page


  async function testItemClickEvent() {
    await setPageData({
      imageClicked: false
    });
    const rect = await page.callMethod("getBoundingClientRectForRichtext")
    const windowInfo = await program.callUniMethod('getWindowInfo');
    const tapOption = {
      x: Math.ceil(rect.left + 30),
      y: Math.ceil(windowInfo.statusBarHeight + 44 + rect.top + 60),
      duration: 100
    }
    await program.tap(tapOption)

    await page.waitFor(500);

    // 关闭弹窗逻辑各平台需要适配不同机型
    if (isIOS) {
      // 关闭弹窗 iPhone Pro 机型
      await program.tap({
        x: 200,
        y: 433,
        duration: 100
      })

      // 关闭弹窗 iPhone ProMax 机型
      await program.tap({
        x: 220,
        y: 476,
        duration: 100
      })

      // 关闭弹窗 iPhone plus 机型
      await program.tap({
        x: 220,
        y: 526,
        duration: 100
      })

      // 关闭弹窗 iPhone mini 机型
      await program.tap({
        x: 186,
        y: 400,
        duration: 100
      })
    }

    const imageClicked = await page.data('data.imageClicked')
    expect(imageClicked).toBe(true)
  }

  async function setPageData(newData) {
    return await page.setData({
      data: newData
    });
  }

  /**
   * 1. mode=web 截图，点击事件
   * 2. mode=native 截图，点击事件
   * 3. 安卓或鸿蒙(vapor) mode=native 切换回 mode=web 截图
   */

  it("rich-text-web-snapshot", async () => {
    await page.waitFor(1000);
    await screenshot('rich-text-mode-web')
  });

  it('itemclick-event-web', async () => {
    await testItemClickEvent()
  })

  if ((isAndroid || (isHarmony && isVapor)) && !isAppWebView) {
    it("rich-text-native", async () => {
      await setPageData({
        mode: 'native'
      });
      await page.waitFor(1000);
      await screenshot('rich-text-mode-native')
    });

    it('itemclick-event-native', async () => {
      await testItemClickEvent()
    })

    it("rich-text-native-change-web", async () => {
      await setPageData({
        mode: 'web'
      });
      await page.waitFor(1000);
      await screenshot('rich-text-mode-native-change-web')
    });
  }

  // TODO: dom1 仅iOS支持rich-text组件响应自身click和父链的click事件，dom2 目前通道有问题，暂时屏蔽
  if (isVapor) {
    return
  }

  it('click-event', async () => {
    const rect = await page.callMethod("getBoundingClientRectForRichtext")
    const windowInfo = await program.callUniMethod('getWindowInfo');
    await program.tap({
      x: Math.ceil(rect.left + rect.width * 0.7),
      y: Math.ceil(windowInfo.statusBarHeight + 44 + rect.top + 100),
      duration: 100
    })

    await page.waitFor(1000);
    const fViewClicked = await page.data('data.fViewClicked')
    const selfClicked = await page.data('data.selfClicked')
    expect(fViewClicked).toBe(true)
    expect(selfClicked).toBe(true)
  })

})
