jest.setTimeout(30000)

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

describe('API-theme-change', () => {
  let page;
  let originalTheme;
  let deviceShotOptions = {};
  if (!(isAndroid || isIos || isHarmony) || isAppWebView) {
    it('dummyTest', () => {
      expect(1).toBe(1)
    })
    return
  }

  beforeAll(async () => {
    page = await program.reLaunch('/pages/API/theme-change/theme-change')
    await page.waitFor('view');
    originalTheme = await page.data('data.originalTheme')

    const windowInfo = await program.callUniMethod('getWindowInfo');
    deviceShotOptions = {
      deviceShot: true,
      area: {
        x: 0,
        y: windowInfo.safeAreaInsets.top + 44,
        width: windowInfo.safeArea.width - 8,
        // 规避底部手势导航栏的影响
        height: windowInfo.safeArea.height - 40
      },
    };
  });

  it("check-set-app-theme", async () => {
    await page.callMethod('setAppTheme', "dark")
    await page.waitFor(300)
    expect(await page.data('data.appTheme')).toBe("dark")
    const image = await program.screenshot(deviceShotOptions);
    expect(image).toSaveImageSnapshot();
  })

  it("check-set-app-theme-effect-on-opened-tabbar-page", async () => {
    // originalTheme 可能为 light、dark、auto（auto 时实际生效主题跟随 osTheme），
    // 固定按 light -> dark 的顺序：light 下保存基线截图，二级页面切换 dark 后再次截图保存基线，供下次匹配
    const systemInfo = await program.callUniMethod('getSystemInfoSync')
    const effectiveTheme = systemInfo.appTheme == 'auto' ? systemInfo.osTheme : systemInfo.appTheme
    if (effectiveTheme != 'light') {
      await page.callMethod('setAppTheme', 'light')
      await page.waitFor(300)
      expect(await page.data('data.appTheme')).toBe('light')
    }

    // 打开 tabbar 页面（light 主题下渲染）并等待渲染完成
    page = await program.switchTab('/pages/tabBar/component')
    await page.waitFor(500)

    // 截取 light 主题下的 tabbar 页面内容（仅截取上半部分，规避底部原生 tabBar 的影响）
    const windowInfo = await program.callUniMethod('getWindowInfo')
    const tabBarShotOptions = {
      deviceShot: true,
      area: {
        x: 0,
        y: windowInfo.safeAreaInsets.top + 44,
        width: windowInfo.safeArea.width,
        height: Math.floor((windowInfo.safeArea.height - 44) / 2)
      },
    };
    const lightImage = await program.screenshot(tabBarShotOptions)
    expect(lightImage).toSaveImageSnapshot()

    // 跳转到二级页面（tabbar 页面保持打开状态），在二级页面切换 dark
    page = await program.navigateTo('/pages/API/theme-change/theme-change')
    await page.waitFor('view')
    await page.callMethod('setAppTheme', 'dark')
    await page.waitFor(300)
    expect(await page.data('data.appTheme')).toBe('dark')

    // 返回已打开的 tabbar 页面，截取 dark 主题下的页面内容并保存基线，供下次匹配
    await program.navigateBack()
    await page.waitFor(500)
    const darkImage = await program.screenshot(tabBarShotOptions)
    expect(darkImage).toSaveImageSnapshot()

    // 恢复现场：回到 theme-change 页面供 afterAll 恢复主题
    page = await program.reLaunch('/pages/API/theme-change/theme-change')
    await page.waitFor('view')
  })

  afterAll(async () => {
    await page.callMethod('setAppTheme', originalTheme)
    await page.waitFor(600)
  })
});
