const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isWeb = platformInfo.startsWith('web')
const isMP = platformInfo.startsWith('mp')

describe('component-native-list-view-refresh', () => {
  if (isWeb || isMP) {
    it('not support', async () => {
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

  let page
  beforeAll(async () => {
    //打开list-view测试页
    page = await program.reLaunch('/pages/component/list-view/list-view-refresh')
    await page.waitFor(600)
  })

  it('check_list_view_refresh', async () => {
    await page.waitFor(async () => {
      return await page.data('data.refresherTriggered') === false;
    });
    //等待下拉刷新结束
    await page.waitFor(500)
    const image = await program.screenshot({fullPage: true});
    expect(image).toSaveImageSnapshot();
    expect(await page.data('data.onRefresherpullingTest')).toBe('refresherpulling:Success')
    expect(await page.data('data.refresherrefreshTest')).toBe('refresherrefresh:Success')
    await page.waitFor(1000);
    expect(await page.data('data.onRefresherrestoreTest')).toBe('refresherrestore:Success')
  })

  it('check_refresherabort', async () => {
    //部分安卓设备需要延迟一段时间swipe才生效 此处暂时延迟1秒
    await page.waitFor(1500);
    // 仅App端支持手势下拉刷新
    await program.swipe({
      startPoint: {x: 100,y: 400},
      endPoint: {x: 100,y: 420},
      duration: 100
    })
    await page.waitFor(1500)
    expect(await page.data('data.onRefresherabortTest')).toBe('refresherabort:Success')
  });

})
