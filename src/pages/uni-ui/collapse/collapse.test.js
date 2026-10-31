const PAGE_PATH = '/pages/uni-ui/collapse/collapse'

describe('collapse', () => {
	let page

	beforeEach(async () => {
		page = await program.reLaunch(PAGE_PATH)
		await page.waitFor('view')
	})

	async function setPageData(newData) {
		return await page.setData({
			data: newData
		});
	}

	it('collapse accordion', async () => {
		expect(await page.data('data.lastEvent')).toBe('暂无交互')
		expect(await page.data('data.enableOpen')).toBe(true)

		await setPageData({
			enableOpen: false
		})
		expect(await page.data('data.enableOpen')).toBe(false)
	})

	it('collapse snapshot', async () => {
		const image = await program.screenshot({
			fullPage: true
		})
		expect(image).toSaveImageSnapshot()
	})
})
