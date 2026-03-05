const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isIOS = platformInfo.startsWith('ios')
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')
const isHarmony = platformInfo.startsWith('harmony')
const isAndroid = platformInfo.startsWith('android')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'



describe('component-native-web-view', () => {
  if (isWeb || isAppWebView) {
    it('web', async () => {
      expect(1).toBe(1)
    })
    return
  }
  let page;
  let start = 0;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/web-view/web-view');
    await page.waitFor(3000);
  });

  // 测试辅助函数
  async function setPageData(newData) {
    return await page.setData({ data: newData });
  }

  it('check_load_url', async () => {
    expect(await page.data('data.loadError')).toBe(false)
  });

  it('test attr webview-styles', async () => {
    await setPageData({
        webview_progress_color: '#FF0'
    });
    await page.waitFor(100);
    await page.callMethod('reload');
    await page.waitFor(100);
    await setPageData({
        webview_progress_color: 'yellow'
    });
    await page.waitFor(100);
    await page.callMethod('reload');
  });

  if (isMP) {
    return
  }
  it('set auto test', async () => {
    await setPageData({
      autoTest: true
    });
    expect(1).toBe(1)
  });
  it('test touch event', async () => {
    const windowInfo = await program.callUniMethod('getWindowInfo');
    await program.tap({
      x: 10,
      y: windowInfo.safeAreaInsets.top + 44 + 10
    });
    await page.waitFor(500);
    if (!isIOS && !isAndroid) {
      expect(await page.data('data.isTouchEnable')).toBe(true);
    }

    await setPageData({
      pointerEvents: 'none',
      isTouchEnable: false
    });
    await page.waitFor(100);
    await program.tap({
      x: 10,
      y: windowInfo.safeAreaInsets.top + 44 + 10
    });
    await page.waitFor(500);
    if (!isIOS && !isHarmony && !isAndroid) {
      expect(await page.data('data.isTouchEnable')).toBe(false);
    }
    await setPageData({
      pointerEvents: 'auto'
    });
  });

  it('test event loading load', async () => {
    await page.callMethod('reload');
    start = Date.now();
    await page.waitFor(async () => {
      return (await page.data('data.eventLoading')) || (Date.now() - start > 500);
    });
    if (isIOS) {
      const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
      if (
        platformInfo.indexOf('14.5') != -1 ||
        platformInfo.indexOf('13.7') != -1 ||
        platformInfo.indexOf('12.4') != -1
      ) {
        expect(1).toBe(1)
        return
      }
      expect(await page.data('data.eventLoading')).toEqual({
        "tagName": "WEB-VIEW",
        type: 'loading',
        src: 'https://www.dcloud.io/'
      });
    } else {
      expect(await page.data('data.eventLoading')).toEqual({
        tagName: 'WEB-VIEW',
        type: 'loading',
        src: 'https://www.dcloud.io/'
      });
    }
    start = Date.now();
    await page.waitFor(async () => {
      return (await page.data('data.eventLoad')) || (Date.now() - start > 5000);
    });
    expect(await page.data('data.eventLoad')).toEqual({
      tagName: 'WEB-VIEW',
      type: 'load',
      src: 'https://www.dcloud.io/',
      url: 'https://www.dcloud.io/'
    });
  });

  it('test event contentheightchange', async () => {
    if (!isAndroid && !isIOS && !isHarmony) {
      expect(1).toBe(1);
      return;
    }
    expect(await page.callMethod('getContentHeight')).toBeGreaterThan(0);
    start = Date.now();
    await page.waitFor(async () => {
      return (await page.data('data.eventContentHeightChange')) || (Date.now() - start > 500);
    });
    expect(await page.data('data.eventContentHeightChange')).toEqual({
      tagName: 'WEB-VIEW',
      type: 'contentheightchange',
      isValidHeight: true
    });
  });

  it('test event error', async () => {
    const infos = process.env.uniTestPlatformInfo.split(' ');
    const version = parseInt(infos[infos.length - 1]);
    if (isAndroid && version > 5) {
      await setPageData({
        src: 'https://www.dclou.io/uni-app-x'
      });
      start = Date.now();
      await page.waitFor(async () => {
        return (await page.data('data.eventError')) || (Date.now() - start > 5000);
      });
      expect(await page.data('data.eventError')).toEqual({
        tagName: 'WEB-VIEW',
        type: 'error',
        errCode: 100002,
        errMsg: 'page error',
        url: 'https://www.dclou.io',
        fullUrl: 'https://www.dclou.io/uni-app-x',
        src: 'https://www.dclou.io/uni-app-x'
      });
    }
    await setPageData({
      autoTest: false
    });
  });

  it('checkNativeWebView', async () => {
    const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
    if (
      platformInfo.indexOf('14.5') != -1 ||
      platformInfo.indexOf('13.7') != -1 ||
      platformInfo.indexOf('12.4') != -1
    ) {
      expect(1).toBe(1)
      return
    }
    await page.waitFor(300);
    const has = await page.callMethod('checkNativeWebView')
    expect(has).toBe(true)
  })

  it('checkLoadingCount', async () => {
    if (
      platformInfo.indexOf('14.5') != -1 ||
      platformInfo.indexOf('13.7') != -1 ||
      platformInfo.indexOf('12.4') != -1
    ) {
      expect(1).toBe(1)
      return
    }
    await page.callMethod('checkLoadingCount')
    await page.waitFor(300);
    const has = await page.callMethod('checkNativeWebView')
    if (has) {
      expect(await page.data('data.loadingCount')).toBe(1);
    } else {
      expect(await page.data('data.loadingCount')).toBe(0);
    }
  })

  it('test lodaData', async () => {
    await page.callMethod('loadData');
    await page.waitFor(1000);
    const image = await program.screenshot({ fullPage: true });
    expect(image).toSaveImageSnapshot();
  });

  it('test half screen toggle', async () => {
    // 点击宽窄屏切换按钮
    const toggleButton = await page.$('#half-screen-toggle');
    expect(toggleButton).toBeTruthy();

    await toggleButton.tap();
    await page.waitFor(500);

    // 点击后截图
    const image = await program.screenshot({
      fullPage: true,
    });
    expect(image).toSaveImageSnapshot();

    // 截图点击恢复
    await page.waitFor(200);
    await toggleButton.tap();

  });
});
