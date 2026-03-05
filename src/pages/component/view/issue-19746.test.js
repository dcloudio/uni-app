const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')

describe('issue-19746', () => {
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
		page = await program.reLaunch('/pages/component/view/issue-19746')
		await page.waitFor(600)
	})

	it('issue19746', async () => {

		await program.tap({
			x: 50,
			y: 130,
			duration: 100
		})

		await page.waitFor(300)
		var count = await page.callMethod('getClickCount')
    console.log('count: ',count)
		expect(count).toBe(0)

		await page.callMethod('setPointEventAuto')
		await page.waitFor(300)

		await program.tap({
			x: 50,
			y: 130,
			duration: 100
		})

		await page.waitFor(300)
		count = await page.callMethod('getClickCount')
    console.log('count: ',count)
		expect(count).toBe(1)

	})
})
