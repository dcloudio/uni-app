const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isMP = platformInfo.startsWith('mp')
const isHarmony = platformInfo.startsWith('harmony')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

describe('component-native-scroll-view-refresher', () => {
  if (isAppWebView) {
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

  let page;

  async function setPageData(newData) {
    return await page.setData({ data: newData });
  }

  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/scroll-view/scroll-view-refresher');
    await page.waitFor(300);
  });

  it('scroll-view-refresher-screenshot', async () => {
    //禁止滚动条
    await setPageData({
        showScrollbar: false
    })
    await page.waitFor(300);
    const image = await program.screenshot({fullPage: true});
    expect(image).toSaveImageSnapshot();
  })

  it('check_refresher_refresh_event', async () => {
    await setPageData({
      refresherTriggered: true
    })
    await page.waitFor(2000);
    expect(await page.data('data.refresherrefreshTimes')).toBe(1)
    // 手动设置下拉刷新状态refresher-triggered为true时，在web和iOS不触发@refresherpulling事件
    if(isAndroid){
      expect(await page.data('data.onRefresherpullingTest')).toBe('refresherpulling:Success')
      expect(await page.data('data.refresherrefreshTest')).toBe('refresherrefresh:Success')
    }
    await page.waitFor(2000);
    expect(await page.data('data.onRefresherrestoreTest')).toBe('refresherrestore:Success')
  });

  // 仅App端支持手势下拉刷新,在不同设备上位置有差异可能导致不触发中止事件
  // 安卓端仅测'android 11.0.0'、'android 10.0.0_x86_64'、'android 10.0.0_x86'
  if(isAndroid || isIos || isHarmony){
    it('check_refresherabort', async () => {
      if(isIos || isHarmony){
        await program.swipe({
          startPoint: {x: 100,y: 500},
          endPoint: {x: 100,y: 630},
          duration: 100
        })
      }else if(isAndroid){
        await program.swipe({
          startPoint: {x: 100,y: 400},
          endPoint: {x: 100,y: 450},
          duration: 1000
        })
      }
      await page.waitFor(1500)
      if(isIos || platformInfo.startsWith('android 10') || platformInfo.startsWith('android 11')){
        expect(await page.data('data.onRefresherabortTest')).toBe('refresherabort:Success')
      }
    });
  }

  it('check_refresher_snapshot', async () => {
    await setPageData({
      refresherTriggered: true
    })
    await page.waitFor(300);
    const image = await program.screenshot({fullPage: true});
    expect(image).toSaveImageSnapshot();
    await page.waitFor(1500);
  });

  //验证issues 16020bug问题
  it('check_page_orientation_snapshot', async () => {
    // if(isAndroid || isIos) {
    if(isAndroid || isHarmony) {
      await page.callMethod('setPageStyle', {pageOrientation: "landscape"})
      await page.waitFor(800);
      const image = await program.screenshot({fullPage: true});
      expect(image).toSaveImageSnapshot();
      await page.callMethod('setPageStyle', {pageOrientation: "portrait"})
      await page.waitFor(800);
    } else {
      expect(1).toBe(1)
    }
  });
});
