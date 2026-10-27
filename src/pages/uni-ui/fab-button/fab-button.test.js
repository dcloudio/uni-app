const PAGE_PATH = '/pages/uni-ui/fab-button/fab-button'

describe('fab-button', () => {
	let page

	beforeEach(async () => {
		page = await program.reLaunch(PAGE_PATH)
		await page.waitFor('view')
	})

	it('fab-button snapshot', async () => {
		const image = await program.screenshot({
			fullPage: true,
		})
		expect(image).toSaveImageSnapshot()
	})

	it('fab-button movable example swipe', async () => {
		await page.waitFor(500)

		const startLeft = await page.data('data.left')
		const startTop = await page.data('data.top')
		const startX = startLeft + 22
		const startY = startTop + 22
		const endX = startX + 80
		const endY = startY + 60
		const el = await page.$('#move-fab')
		await el.touchstart({
			touches: [
				{
					identifier: 1,
					pageX: startX,
					pageY: startY,
					clientX: startX,
					clientY: startY,
					screenX: startX,
					screenY: startY,
				},
			],
			changedTouches: [
				{
					identifier: 1,
					pageX: startX,
					pageY: startY,
					clientX: startX,
					clientY: startY,
					screenX: startX,
					screenY: startY,
				},
			],
		})
		await page.waitFor(100)
		await el.touchmove({
			touches: [
				{
					identifier: 1,
					pageX: endX,
					pageY: endY,
					clientX: endX,
					clientY: endY,
					screenX: endX,
					screenY: endY,
				},
			],
			changedTouches: [
				{
					identifier: 1,
					pageX: endX,
					pageY: endY,
					clientX: endX,
					clientY: endY,
					screenX: endX,
					screenY: endY,
				},
			],
		})
		await page.waitFor(100)
		await el.touchend({
			touches: [
				{
					identifier: 1,
					pageX: endX,
					pageY: endY,
					clientX: endX,
					clientY: endY,
					screenX: endX,
					screenY: endY,
				},
			],
			changedTouches: [
				{
					identifier: 1,
					pageX: endX,
					pageY: endY,
					clientX: endX,
					clientY: endY,
					screenX: endX,
					screenY: endY,
				},
			],
		})

		await page.waitFor(100)
		const endLeft = await page.data('data.left')
		const endTop = await page.data('data.top')
		expect(Math.abs(endLeft - (startLeft + 80))).toBeLessThanOrEqual(2)
		expect(Math.abs(endTop - (startTop + 60))).toBeLessThanOrEqual(2)
	})
})
