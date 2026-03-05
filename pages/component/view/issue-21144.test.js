const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')
const isWeb = platformInfo.startsWith('web')

describe('issue-21144', () => {
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
		page = await program.reLaunch('/pages/component/view/issue-21144')
		await page.waitFor(600)
	})

	it('issue21144', async () => {

    await page.setData({data: {scrollTop: 100}})
		let ret = await page.callMethod('checkTestView')
    expect(ret).toBe(true)

	})
})
