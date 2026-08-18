const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'

const OPTIONS_PAGE_PATH = '/pages/error/runtime-error/runtime-error-options'
const COMPOSITION_PAGE_PATH = '/pages/error/runtime-error/runtime-error-composition'
const HOME_PAGE = '/pages/index/index'

describe('运行时异常', () => {
  const test = async (pagePath) => {
    let page = await program.reLaunch(pagePath)
    await page.waitFor(1000)
    expect(page.path).toBe(pagePath.substring(1))
    page = await program.navigateTo(HOME_PAGE)
    await page.waitFor(1000)
    expect(page.path).toBe(HOME_PAGE.substring(1))
  }
  if (!isDom2) {
    it('数组下标越位 options API', async () => {
      await test(OPTIONS_PAGE_PATH)
    })
  }
	it('数组下标越位 composition API', async () => {
    await test(COMPOSITION_PAGE_PATH)
	})
})
