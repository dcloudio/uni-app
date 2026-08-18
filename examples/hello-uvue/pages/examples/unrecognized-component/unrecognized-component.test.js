describe('/pages/examples/unrecognized-component/unrecognized-component', () => {
	it('unrecognized-component should be created as "view"', async () => {
		const page = await program.reLaunch('/pages/examples/unrecognized-component/unrecognized-component')
		await page.waitFor('text')
		const element = await page.$('text')
		expect(await element.text()).toBe('text in unrecognized component')
	})
});