const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isAndroidOrIOS = platformInfo.startsWith('android') || platformInfo.startsWith('ios')
const isApp = isAndroidOrIOS || platformInfo.startsWith('harmony')
const isSafari = platformInfo.indexOf('safari') > -1
const isMP = platformInfo.startsWith('mp')
const isVapor = process.env.UNI_APP_X_DOM2 === "true"

describe('API-intersection-observer-multi-root', () => {
	// App 端仅在 Android 和 iOS 蒸汽模式运行，Safari 和小程序跳过
	if ((isApp && !(isAndroidOrIOS && isVapor)) || isSafari || isMP) {
		it('not support', () => {
			expect(1).toBe(1)
		})
		return
	}

	// 页面滚动内容布局（逻辑像素）：
	// 外层 scroll-view：nested-scroll-header（约 350px，含头部被观察元素） + nested-scroll-body（内层 scroll-view）
	// 内层 scroll-view：列表项 0~800，被观察元素 800~950，列表项 950~1750
	let page
	let outerScroll
	let innerScroll

	beforeAll(async () => {
		page = await program.reLaunch('/pages/API/create-intersection-observer/intersection-observer-multi-root')
		await page.waitFor('#mr-outer')
		outerScroll = await page.$('#mr-outer')
		innerScroll = await page.$('#mr-inner')
		await page.waitFor(1000)
	})

	async function textOf(selector) {
		const el = await page.$(selector)
		return await el.text()
	}

	// 滚动与 IO 回调为异步链路，轮询等待状态文本更新，避免固定等待时长导致的偶发失败
	async function waitStatusText(selector, expected, timeout = 3000) {
		const start = Date.now()
		while (Date.now() - start < timeout) {
			const text = await textOf(selector)
			if (text.includes(expected)) {
				return text
			}
			await page.waitFor(100)
		}
		return await textOf(selector)
	}

	it('初始状态：头部元素显示', async () => {
		await outerScroll.scrollTo(0, 0)
		await innerScroll.scrollTo(0, 0)
		expect(await waitStatusText('#mr-status-header', '显示')).toContain('显示')
	})

	it('外层滚动后：头部元素隐藏', async () => {
		await outerScroll.scrollTo(0, 500)
		expect(await waitStatusText('#mr-status-header', '隐藏')).toContain('隐藏')
	})

	it('内层滚动：被观察元素进入内层根显示、滚过头隐藏', async () => {
		// 外层先滚到底，让内层完整出现在外层可视区
		await outerScroll.scrollTo(0, 500)
		await page.waitFor(300)

		await innerScroll.scrollTo(0, 700)
		expect(await waitStatusText('#mr-status-inner', '相对内层滚动区：显示')).toContain('相对内层滚动区：显示')

		await innerScroll.scrollTo(0, 1600)
		expect(await waitStatusText('#mr-status-inner', '相对内层滚动区：隐藏')).toContain('相对内层滚动区：隐藏')
	})

	it('嵌套滚动后：页面视口观察同步正确', async () => {
		await outerScroll.scrollTo(0, 500)
		await page.waitFor(300)

		await innerScroll.scrollTo(0, 700)
		expect(await waitStatusText('#mr-status-viewport', '显示')).toContain('显示')

		await innerScroll.scrollTo(0, 1600)
		expect(await waitStatusText('#mr-status-viewport', '隐藏')).toContain('隐藏')
	})
})
