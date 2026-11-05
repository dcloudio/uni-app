const PAGE_PATH = '/pages/uni-ui/backarrow-circle/backarrow-circle'

describe('backarrow-circle', () => {
	let page

	beforeEach(async () => {
		page = await program.reLaunch(PAGE_PATH)
		await page.waitFor('#default-back')
	})

	it('backarrow-circle snapshot', async () => {
		const image = await program.screenshot({ fullPage: true })
		expect(image).toSaveImageSnapshot()
	})

	it('custom arrow click updates event message', async () => {
		await (await page.$('#custom-blue')).tap()
		expect(await (await page.$('.event-result')).text()).toBe('自定义返回按钮触发了 click')
	})
})
