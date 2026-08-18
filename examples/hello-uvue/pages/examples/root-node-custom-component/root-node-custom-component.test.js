const PAGE_PATH = '/pages/examples/root-node-custom-component/root-node-custom-component'

describe(PAGE_PATH, () => {
  it('display normally', async () => {
		const page = await program.reLaunch(PAGE_PATH)
		await page.waitFor(2000)

    const text = await page.$('text')
    const textValue = await text.text()
    expect(textValue).toBe('this is component Bar')
	})
})