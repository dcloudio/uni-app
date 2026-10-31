const PAGE_PATH = '/pages/uni-ui/number-box/number-box'

describe('number-box', () => {
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

	it('number-box model value', async () => {
		expect(await page.data('data.value1')).toBe(1)

		await setPageData({
			value1: 2
		})
		expect(await page.data('data.value1')).toBe(2)

		await setPageData({
			value1: 3
		})
		expect(await page.data('data.value1')).toBe(3)

		expect(await page.data('data.value2')).toBe(10)

		await setPageData({
			value2: 15
		})
		expect(await page.data('data.value2')).toBe(15)

		await setPageData({
			value2: 8
		})
		expect(await page.data('data.value2')).toBe(8)
	})

	it('number-box snapshot', async () => {
		const image = await program.screenshot({
			fullPage: true
		})
		expect(image).toSaveImageSnapshot()
	})
})
