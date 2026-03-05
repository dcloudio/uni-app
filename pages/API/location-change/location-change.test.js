const PAGE_PATH = "/pages/API/location-change/location-change";
const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroid = platformInfo.startsWith('android')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isHarmonySimulator = isHarmony && platformInfo.includes('模拟器')
const isWeb = platformInfo.startsWith('web')
const isMP = platformInfo.startsWith('mp')

describe("location-change", () => {
  if (isMP || isWeb || isHarmonySimulator) {
    // 微信、web harmony 上会有权限弹框，暂时屏蔽测试
    it('not support', async () => {
      expect(1).toBe(1)
    })
    return
  }
  let page;
  beforeAll(async () => {
    page = await program.reLaunch(PAGE_PATH)
    await page.waitFor(600)
  });

  // 测试辅助函数
  async function setPageData(newData) {
    return await page.setData({ data: newData });
  }

  it("system+type=wgs84+success", async () => {
  if (isAndroid) {
    await program.adbCommand(
      'pm grant io.dcloud.uniappx android.permission.ACCESS_FINE_LOCATION');
    await program.adbCommand(
      'pm grant io.dcloud.uniappx android.permission.ACCESS_COARSE_LOCATION');
    await program.adbCommand(
      'pm grant io.dcloud.uniappx android.permission.ACCESS_BACKGROUND_LOCATION');
  }
    await setPageData({
      currentSelectedProvider: 0,
      currentSelectedType: 0,
      startSuccess: false,
      logAble: false
    })

    const stopLocationUpdateBtn = await page.$('#stopLocationUpdate')
    await stopLocationUpdateBtn.tap()

    const startLocationUpdateBtn = await page.$('#startLocationUpdate')
    await startLocationUpdateBtn.tap()

    await page.waitFor(500)

    let data = await page.data('data')
    let startSuccess = data['startSuccess']
    expect(startSuccess).toEqual(true);

    if (!isHarmony) {
      // NOTE 鸿蒙上需要在设置中允许，屏蔽该测试
      await setPageData({
        startSuccess: false
      })

      const startLocationUpdateBackgroundBtn = await page.$('#startLocationUpdateBackground')
      await startLocationUpdateBackgroundBtn.tap()

      data = await page.data('data')
      startSuccess = data['startSuccess']
      expect(startSuccess).toEqual(true);
    }
  });

  it(`system+type=gcj02+${isHarmony ? 'success' : 'fail'}`, async () => {

    await setPageData({
      currentSelectedProvider: 0,
      currentSelectedType: 1,
      startSuccess: false,
      errCode: 0,
      logAble: false
    })

    const stopLocationUpdateBtn = await page.$('#stopLocationUpdate')
    await stopLocationUpdateBtn.tap()

    const startLocationUpdateBtn = await page.$('#startLocationUpdate')
    await startLocationUpdateBtn.tap()

    await page.waitFor(1000)

    let data = await page.data('data')
    let startSuccess = data['startSuccess']
    if (!isHarmony) {
      let errCode = data['errCode']
      expect(startSuccess).toEqual(false);
      expect(errCode).toEqual(1505601);
    } else {
      expect(startSuccess).toEqual(true);
    }

    if (!isHarmony) {
      // NOTE 鸿蒙上需要在设置中允许，屏蔽该测试
      await setPageData({
        currentSelectedProvider: 0,
        currentSelectedType: 1,
        startSuccess: false,
        errCode: 0
      })

      const startLocationUpdateBackgroundBtn = await page.$('#startLocationUpdateBackground')
      await startLocationUpdateBackgroundBtn.tap()
      await page.waitFor(1000)
      data = await page.data('data')
      startSuccess = data['startSuccess']
      errCode = data['errCode']
      expect(startSuccess).toEqual(false);
      expect(errCode).toEqual(1505601);
    }
  });

  if (!isHarmony) {
    it("tencent+type=wgs84+fail", async () => {
      await setPageData({
        logAble: false,
        currentSelectedProvider: 1,
        currentSelectedType: 0,
        startSuccess: false,
        errCode: 0
      })

      await setPageData({
        currentSelectedType: 0
      })

      const stopLocationUpdateBtn = await page.$('#stopLocationUpdate')
      await stopLocationUpdateBtn.tap()

      const startLocationUpdateBtn = await page.$('#startLocationUpdate')
      await startLocationUpdateBtn.tap()

      let data = await page.data('data')
      let startSuccess = data['startSuccess']
      let errCode = data['errCode']
      expect(startSuccess).toEqual(false);
      expect(errCode).toEqual(1505607);

      await setPageData({
        currentSelectedProvider: 1,
        currentSelectedType: 0,
        startSuccess: false,
        errCode: 0
      })

      const startLocationUpdateBackgroundBtn = await page.$('#startLocationUpdateBackground')
      await startLocationUpdateBackgroundBtn.tap()
      data = await page.data('data')
      startSuccess = data['startSuccess']
      errCode = data['errCode']
      expect(startSuccess).toEqual(false);
      expect(errCode).toEqual(1505607);
    });

    it("tencent+type=gcj02+success", async () => {
      await setPageData({
        currentSelectedProvider: 1,
        currentSelectedType: 1,
        startSuccess: false,
        errCode: 0,
        logAble: false
      })

      const stopLocationUpdateBtn = await page.$('#stopLocationUpdate')
      await stopLocationUpdateBtn.tap()

      const startLocationUpdateBtn = await page.$('#startLocationUpdate')
      await startLocationUpdateBtn.tap()

      let data = await page.data('data')
      let startSuccess = data['startSuccess']
      expect(startSuccess).toEqual(true);

      await setPageData({
        currentSelectedProvider: 1,
        currentSelectedType: 1,
        startSuccess: false,
        errCode: 0
      })

      const startLocationUpdateBackgroundBtn = await page.$('#startLocationUpdateBackground')
      await startLocationUpdateBackgroundBtn.tap()
      data = await page.data('data')
      startSuccess = data['startSuccess']
      expect(startSuccess).toEqual(true);
    });

    it("tencent+system+fail", async () => {
      await setPageData({
        currentSelectedProvider: 1,
        currentSelectedType: 1,
        startSuccess: false,
        errCode: 0,
        logAble: false
      })

      const stopLocationUpdateBtn = await page.$('#stopLocationUpdate')
      await stopLocationUpdateBtn.tap()

      const startLocationUpdateBtn = await page.$('#startLocationUpdate')
      await startLocationUpdateBtn.tap()

      let data = await page.data('data')
      let startSuccess = data['startSuccess']
      expect(startSuccess).toEqual(true);

      await setPageData({
        currentSelectedProvider: 0,
        currentSelectedType: 0,
        startSuccess: false,
        errCode: 0
      })

      await startLocationUpdateBtn.tap()

      data = await page.data('data')
      startSuccess = data['startSuccess']
      let errCode = data['errCode']
      expect(startSuccess).toEqual(false);
      expect(errCode).toEqual(1505608);

      await stopLocationUpdateBtn.tap()

      await setPageData({
        currentSelectedProvider: 0,
        currentSelectedType: 0,
        startSuccess: false,
        errCode: 0
      })

      await startLocationUpdateBtn.tap()

      data = await page.data('data')
      startSuccess = data['startSuccess']
      expect(startSuccess).toEqual(true);

      await setPageData({
        currentSelectedProvider: 1,
        currentSelectedType: 1,
        startSuccess: false,
        errCode: 0
      })

      await startLocationUpdateBtn.tap()
      data = await page.data('data')
      startSuccess = data['startSuccess']
      errCode = data['errCode']
      expect(startSuccess).toEqual(false);
      expect(errCode).toEqual(1505608);
    });
  }

  it("stopLocationUpdate", async () => {
    await setPageData({
      stopSuccess: false,
      logAble: true
    })

    await page.callMethod('stopLocationUpdate')

    let data = await page.data('data')
    let stopSuccess = data['stopSuccess']
    expect(stopSuccess).toEqual(true);
  })
});
