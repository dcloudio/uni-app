const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isHarmony = platformInfo.startsWith('harmony')
const isWeb = platformInfo.startsWith('web')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
const isDom2 = process.env.UNI_APP_X_DOM2 === "true"

describe('component-native-sticky-section', () => {
  if (isMP || isDom2 && isHarmony) {
  	it('skip', () => {
  		expect(1).toBe(1)
  	})
  	return
  }

  let page
  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/sticky-section/sticky-section')
    await page.waitFor('sticky-section')
    await page.waitFor(2000); // 等待页面加载完成
  })

  it('check_delete_and_refresher', async () => {
    await page.callMethod('deleteSection')
    await page.waitFor(400)
    await page.setData({
      pageData:{refresherTriggered: true}
    })
    await page.waitFor(500)
    await page.setData({
      pageData:{refresherTriggered: false}
    })
    await page.waitFor(2000)
    const image = await program.screenshot({fullPage: true});
    expect(image).toSaveImageSnapshot();
  })

  //检测吸顶上推效果
  it('check_sticky_section', async () => {
    await page.waitFor(async () => {
      return await page.data('pageData.isReady') === true;
    });
    page.waitFor(600)
    await page.callMethod('listViewScrollByY', 1000)
    const image = await program.screenshot({fullPage: true});
    expect(image).toSaveImageSnapshot();
  })

  if (isWeb || isAppWebView) {
    return
  }

  it('check_goto_sticky_header', async () => {
    //滚动回顶部
    await page.callMethod('toTop')
    page.waitFor(100)
    await page.setData({
      pageData:{scrolling: true}
    })
    if (!isAppWebView) {
      //跳转到id为C的StickyHeader位置
      await page.callMethod('gotoStickyHeader', 'C')
    }
    await page.waitFor(async () => {
      return await page.data('pageData.scrolling') === false;
    });
    const image = await program.screenshot({fullPage: true});
    expect(image).toSaveImageSnapshot();
  })
})
