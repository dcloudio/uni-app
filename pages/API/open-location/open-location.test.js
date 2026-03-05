const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isIos = platformInfo.startsWith('ios')
const isHarmony = platformInfo.startsWith('harmony');

describe('dialog page', () => {
  if (process.env.UNI_AUTOMATOR_APP_WEBVIEW == 'true' || isMP) {
  	it('skip', () => {
  		expect(1).toBe(1)
  	})
  	return
	}
	
	if (
		isIos &&
		(
			platformInfo.indexOf('14.5') != -1 ||
			platformInfo.indexOf('13.7') != -1 ||
			platformInfo.indexOf('12.4') != -1
		)
	) {
		it('ios 14.5 及以下, xcode 版本太低, uts plugin compile fail', () => {
  		expect(1).toBe(1)
		})
		return
	}

	let page;
	let originLifeCycleNum;
  beforeAll(async () => {
    page = await program.reLaunch('/pages/API/open-location/open-location')
		await page.waitFor('view');

		originLifeCycleNum = await page.callMethod('getLifeCycleNum')
		await page.callMethod('openLocation')
		await page.waitFor(2000)
		if (isHarmony) {
			console.log('before harmony tap')
			await program.tap({ x: 100, y: 545 })
			await page.waitFor(1000)
		}
  });

  it('dialogPage should be opened', async () => {
		const dialogPagesNum = await page.data('data.dialogPagesNum')
		expect(dialogPagesNum).toBe(1)
	})

	afterAll(async () => {
		await page.callMethod('pageSetLifeCycleNum', originLifeCycleNum)
  });
})
