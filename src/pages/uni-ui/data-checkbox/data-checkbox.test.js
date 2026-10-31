const PAGE_PATH = '/pages/uni-ui/data-checkbox/data-checkbox'

describe('data-checkbox', () => {
	let page

	beforeEach(async () => {
		page = await program.reLaunch(PAGE_PATH)
		await page.waitFor('.test-zero-selected')
	})

	it('selects a numeric zero model value', async () => {
		const selected = await page.$('.test-zero-selected')
		expect(selected).not.toBeNull()
		expect(await selected.text()).toBe('男')
	})

	it('allows an external empty array to clear source defaults', async () => {
		expect(await page.$('.test-default-selected')).not.toBeNull()

		await page.callMethod('clearDisabledValues')
		await page.waitFor(100)

		expect(await page.$('.test-default-selected')).toBeNull()
	})

	it('reacts to nested localdata updates', async () => {
		const texts = await page.$$('.test-dynamic-text')
		expect(await texts[0].text()).toBe('足球')

		await page.callMethod('updateFirstHobby')
		await page.waitFor(100)

		const updatedTexts = await page.$$('.test-dynamic-text')
		expect(await updatedTexts[0].text()).toBe('足球（已更新）')
	})

	it('rebuilds normalized data when map changes', async () => {
		const texts = await page.$$('.test-map-text')
		expect(await texts[0].text()).toBe('流行')

		await page.callMethod('useAlternateMap')
		await page.waitFor(100)

		const updatedTexts = await page.$$('.test-map-text')
		expect(await updatedTexts[0].text()).toBe('POP')
	})
})
