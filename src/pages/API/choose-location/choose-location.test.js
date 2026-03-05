const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony')
const isAppWebView = process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true'

describe('dialog page', () => {
  if (isAppWebView || isMP) {
  	it('skip not support', () => {
  		expect(1).toBe(1)
  	})
  	return
  }

	let page;
	let originLifeCycleNum;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/API/choose-location/choose-location')
		await page.waitFor('view');

		originLifeCycleNum = await page.callMethod('getLifeCycleNum')

		await page.callMethod('chooseLocation')

		if (isHarmony) {
			await program.tap({ x: 100, y: 525 })
			await page.waitFor(1000)
			await program.tap({x: 100, y: 525})
			await page.waitFor(1000)
		}

		await page.waitFor(1000)
  });

  it('dialogPage should empty', async () => {
		const dialogPagesNum = await page.data('data.dialogPagesNum')
    console.log('dialogPagesNum',dialogPagesNum)
		expect(dialogPagesNum).toBe(0)
	})

	it('should trigger parent hide', async () => {
		const lifecycleNum = await page.callMethod('getLifeCycleNum')
		expect(lifecycleNum).toBe(originLifeCycleNum - 1)
	})

  it('screenshot', async () => {
    await page.waitFor(5000)
    const windowInfo = await program.callUniMethod('getWindowInfo');
    const topSafeArea = windowInfo.safeAreaInsets.top;
    deviceShotOptions = {
      deviceShot: true,
      area: {
        x: 0,
        y: topSafeArea + 44,
      },
    };
    const image = await program.screenshot(deviceShotOptions);
    expect(image).toSaveImageSnapshot();
  });

	if (isIos) {
		// 15以下的模拟器所对应的xcode不能编译自定义插件，大于15是因为某台设备，会用xcode14.1跑15.5的设备
    let version = process.env.uniTestPlatformInfo
    let split = version.split(" ")
		version = parseInt(split[split.length - 1])
		if (version > 15) {
			it('call chooseLocation in uts plugin', async () => {
				page = await program.reLaunch('/pages/API/choose-location/choose-location')
				await page.waitFor('view');
				await page.callMethod('chooseLocationByPlugin')
				await page.waitFor(1000)
				const lifecycleNum = await page.callMethod('getLifeCycleNum')
				expect(lifecycleNum).toBe(originLifeCycleNum - 1)
			})
		}
	}

	afterAll(async () => {
		await page.callMethod('setLifeCycleNumFunc', originLifeCycleNum)
  });
})
