const INDEX_PATH = '/pages/API/unicloud/uni-id-router/index'

describe('uniIdRouter needLogin 拦截', () => {
	let page

	beforeEach(async () => {
		page = await program.reLaunch(INDEX_PATH)
		await page.waitFor('view')
		// 清除本地登录态，确保处于未登录状态（uniIdRouter 依据 storage 中的 token 判断登录状态）
		await program.callUniMethod('removeStorageSync', 'uni_id_token')
		await program.callUniMethod('removeStorageSync', 'uniIdToken')
		await program.callUniMethod('removeStorageSync', 'uni_id_token_expired')
	})

	it('未登录访问需要登录页面时跳转到登录页', async () => {
		const uniIdToken = await program.callUniMethod('getStorageSync', 'uni_id_token')
		const uniIdTokenDep = await program.callUniMethod('getStorageSync', 'uni_id_token')

		expect(uniIdToken).toBeFalsy()
		expect(uniIdTokenDep).toBeFalsy()

		const elementButton = await page.$('.need-login-btn')
		await elementButton.tap()
		await page.waitFor(1200)

		const currentPage = await program.currentPage()
		expect(currentPage.path).toBe('pages/API/unicloud/uni-id-router/login')
	})
})
