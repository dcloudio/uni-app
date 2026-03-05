const PAGE_PATH = '/pages/template/issue-14765/issue-14765'
const isDom2 = process.env.UNI_APP_X_DOM2 === "true"

// TODO 此测试例本应放在hello-uvue内，但是目前hello-uvue测试时是关闭virtualHost的，暂时放在这里

describe(PAGE_PATH, () => {
	if (isDom2) {
    it('not support', () => {
      expect(1).toBe(1)
    })
    return
  }

  let page
	beforeAll(async () => {
		page = await program.reLaunch(PAGE_PATH)
		await page.waitFor('view')
	})
  it('basic bind id test', async () => {
		await page.waitFor(500)
    const testNode1 = await page.data('data.testNode1')
    const testNode2 = await page.data('data.testNode2')
    expect(testNode1).toBe(true)
    expect(testNode2).toBe(true)
	})
})
