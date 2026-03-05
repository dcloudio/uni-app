const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isHarmony = platformInfo.startsWith('harmony')
const isIOS = platformInfo.startsWith('ios')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

const PAGE_PATH = '/pages/component/rich-text/rich-text-complex'

describe('rich-text-test', () => {

  // 先屏蔽 android 及 web 平台
  if (isWeb || isMP || isHarmony) {
    it('other platform', () => {
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

  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor('view');
    await page.waitFor(2000);
  })

  // 不进行 app-webview 截图对比
  if (!isAppWebView) {
    it('screenshot', async () => {
      const image = await program.screenshot({
       fullPage: true,
      });
      expect(image).toSaveImageSnapshot();
    });
  }

  let page

  async function setPageData(newData) {
    return await page.setData({ data: newData });
  }

  if (isAndroid && !isAppWebView) {
    it("test attr mode", async () => {
      await setPageData({
        mode: 'native'
      });
      await page.waitFor(1000);
      const image = await program.screenshot({ fullPage: true });
      expect(image).toSaveImageSnapshot();
    });
    return;
  }

  it('click-event', async () => {
    await program.tap({
      x: 210,
      y: 280,
      duration: 100
    })

    await page.waitFor(1000);
    const fViewClicked = await page.data('data.fViewClicked')
    const selfClicked = await page.data('data.selfClicked')
    expect(fViewClicked).toBe(true)
    expect(selfClicked).toBe(true)
  })


  it('itemclick-event', async () => {
    await program.tap({
      x: 66,
      y: 266,
      duration: 100
    })

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
  })

})
