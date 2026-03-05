jest.setTimeout(50000)
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'
const isAndroid = platformInfo.startsWith('android')
const isWeb = platformInfo.startsWith('web')

describe('component-native-image', () => {
  const screenshotParams = { fullPage: true }
  let page;
  let start = 0;

  beforeAll(async () => {
    page = await program.reLaunch('/pages/component/image/image');
    await page.waitFor('view');
    await page.waitFor(isWeb ? 4000 : 100);
  });

  async function setPageData(newData) {
    return await page.setData({ data: newData });
  }

  it('screenshot', async () => {
    const image = await program.screenshot({fullPage: true});
    expect(image).toSaveImageSnapshot()
  });

  it('check_image_load', async () => {
    expect(await page.data('data.loadError')).toBe(false)
  });

  it('check_image_load_url', async () => {
    await setPageData({
      loadError: false,
      imageSrc: 'https://request.dcloud.net.cn/api/http/contentType/image/png'
    })
    await page.waitFor(300);
    expect(await page.data('data.loadError')).toBe(false)
  })

  if(process.env.uniTestPlatformInfo.toLowerCase().startsWith('ios')) {
    it('check_qurey_url', async () => {
      await setPageData({
        loadError: false,
        imageSrc: '/static/test-image/logo.png?t=11234'
      })
      await page.waitFor(300);
      expect(await page.data('data.loadError')).toBe(false)
    })
  };

  it('check_image_load_error', async () => {
    await setPageData({
      loadError: false,
      imageSrc: 'testerror.jpg'
    })
    await page.waitFor(300);
    expect(await page.data('data.loadError')).toBe(true)
  })

  if (isAndroid && !isAppWebView) {
    it('check-cookie', async () => {
      await setPageData({
        autoTest: true,
        setCookieImage: 'https://cdn.dcloud.net.cn/img/shadow-grey.png'
      });
      await page.waitFor(1000);
      await setPageData({
        loadError: false,
        verifyCookieImage: 'https://request.dcloud.net.cn/img/shadow-grey.png'
      });
      await page.waitFor(1000);
      expect(await page.data('data.loadError')).toBe(false);
      await setPageData({
        autoTest: false
      });
    })
  }

  it('test event load', async () => {
    await setPageData({
      autoTest: true,
      imageSrc: 'https://request.dcloud.net.cn/api/http/contentType/image/png'
    });
    start = Date.now();
    await page.waitFor(async () => {
      return (await page.data('data.eventLoad')) || (Date.now() - start > 1000);
    });
    expect(await page.data('data.eventLoad')).toEqual({
      tagName: isMP ? '' : 'IMAGE',
      type: 'load',
      width: 10,
      height: 10
    });
  });

  it('test event error', async () => {
    await setPageData({
      imageSrc: 'https://request.dcloud.net.cn/api/http/contentType/404.png'
    });
    start = Date.now();
    await page.waitFor(async () => {
      return (await page.data('data.eventError')) || (Date.now() - start > 1000);
    });
    expect(await page.data('data.eventError')).toEqual({
      tagName: isMP ? '' : 'IMAGE',
      type: 'error'
    });

    await setPageData({
      autoTest: false
    });
  });

  if(isMP) {
    // TODO 整理小程序、web支持的类型，页面上进行条件编译展示
    return
  }
  // app web 存在差异
  if (!isAppWebView) {
    it('path-screenshot', async () => {
      const page = await program.navigateTo('/pages/component/image/image-path');
      await page.waitFor(3000);
      const image = await program.screenshot(screenshotParams)
      expect(image).toSaveImageSnapshot()
    });
  }

  it('mode-screenshot', async () => {
    if (process.env.android_cpu_type === 'x86_64') return
    const page = await program.navigateTo('/pages/component/image/image-mode');
    await page.waitFor(1000);
    const image = await program.screenshot(screenshotParams)
    expect(image).toSaveImageSnapshot()
  });

  it('long-path-screenshot', async() => {
    if (isAndroid) {
       const infos = process.env.uniTestPlatformInfo.split(' ');
       const version = parseInt(infos[infos.length - 1]);
       if (version < 8) {
         console.log("安卓版本小于8设备 测试image-long 模拟器会出现内存不足错误 影响后续测试")
         expect(1).toBe(1)
         return
       }
    }
    const page = await program.navigateTo('/pages/component/image/image-long');
    await page.waitFor(3000);
    const image = await program.screenshot(screenshotParams)
    expect(image).toSaveImageSnapshot()
  })

  it('test all button clicks', async () => {
    page = await program.reLaunch('/pages/component/image/image');
    await page.waitFor('view');
    await page.waitFor(isWeb ? 4000 : 100);
    // 获取所有按钮元素
    const buttons = await page.$$('.uni-btn');
    const buttonCount = buttons.length;
    console.log('buttonCount',buttonCount)
    // 循环点击每个按钮
    for (let i = 0; i < buttonCount; i++) {
      // 重新获取按钮（因为返回后页面可能重新渲染）
      const currentButtons = await page.$$('.uni-btn');
      const button = currentButtons[i];
      console.log('button',button)
      // 点击按钮
      await button.tap();
      // 等待页面跳转完成,返回上一页
      await page.waitFor(isWeb ? 1000 : 500);
      await program.navigateBack();
      await page.waitFor(300);
    }
    // 验证所有按钮都点击成功（通过没有抛出异常来验证）
    expect(buttonCount).toBeGreaterThan(0);
  });
});
