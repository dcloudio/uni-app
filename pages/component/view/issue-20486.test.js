const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')

describe('issue-20486', () => {
	if (isMP || isWeb) {
		it('skip', () => {
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
		page = await program.reLaunch('/pages/component/view/issue-20486')
		await page.waitFor(600)
	})

	it('issue20486', async () => {

		let testViewY = await page.callMethod('getTestViewY')

    console.log("testViewY: ",testViewY)

		await program.tap({
			x: 50,
			y: testViewY + 10,
			duration: 100
		})

		await page.waitFor(500)

		const image = await program.screenshot({ fullPage: true });
		expect(image).toSaveImageSnapshot();
	})
})
