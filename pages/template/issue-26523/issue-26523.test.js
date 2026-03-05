const PAGE_PATH = '/pages/template/issue-26523/issue-26523'

describe(PAGE_PATH, () => {
  let page
	beforeAll(async () => {
		page = await program.reLaunch(PAGE_PATH)
		await page.waitFor('view')
	})
  it('toggle list view multiple times', async () => {
		await page.waitFor(500)
    await page.callMethod('toggleListView')
		await page.waitFor(500)
    await page.callMethod('toggleListView')
		await page.waitFor(500)
    await page.callMethod('toggleListView')
		await page.waitFor(500)
    await page.callMethod('toggleListView')
    await page.waitFor(500)
    const image = await program.screenshot({
      fullPage: true
    })
    expect(image).toSaveImageSnapshot()
	})
})
