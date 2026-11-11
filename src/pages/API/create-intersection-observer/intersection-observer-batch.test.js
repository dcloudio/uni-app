const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isApp = platformInfo.startsWith('android') || platformInfo.startsWith('ios') || platformInfo.startsWith('harmony')
const isSafari = platformInfo.indexOf('safari') > -1
const isMP = platformInfo.startsWith('mp')
const isVapor = process.env.UNI_APP_X_DOM2 === "true"

describe('API-intersection-observer-batch', () => {
	// App 端仅在蒸汽模式运行，Safari 和小程序跳过
	if ((isApp && !isVapor) || isSafari || isMP) {
		it('not support', () => {
			expect(1).toBe(1)
		})
		return
	}

	// 滚动内容布局（逻辑像素）：
	// 被观察元素A: 200~350；被观察元素B: 750~900
	// 被观察元素1: 900~1020；2: 1020~1180；3: 1180~1380；4: 1380~1620
	let page
	let scrollView

	beforeAll(async () => {
		page = await program.reLaunch('/pages/API/create-intersection-observer/intersection-observer-batch')
		await page.waitFor('#batch-root')
		scrollView = await page.$('#batch-root')
		await page.waitFor(1000)
	})

	async function scrollToAndWait(y) {
		await scrollView.scrollTo(0, y)
		await page.waitFor(600)
	}

	async function textOf(selector) {
		const el = await page.$(selector)
		return await el.text()
	}

	it('批量监听：列表项随滚动显示/隐藏', async () => {
		await scrollToAndWait(920)
		expect(await textOf('#result-a')).toContain('1 显示')

		await scrollToAndWait(1200)
		const text = await textOf('#result-a')
		expect(text).toContain('1 隐藏')
		expect(text).toContain('3 显示')
	})

	it('互不干扰：滚到被观察元素A 时观察者1、2 显示', async () => {
		await scrollToAndWait(200)
		expect(await textOf('#result-b1')).toContain('显示')
		expect(await textOf('#result-b2')).toContain('显示')
	})

	it('互不干扰：滚到被观察元素B 时观察者1、2 隐藏、观察者3 显示', async () => {
		await scrollToAndWait(820)
		expect(await textOf('#result-b1')).toContain('隐藏')
		expect(await textOf('#result-b2')).toContain('隐藏')
		expect(await textOf('#result-b3')).toContain('显示')
	})

	it('同一实例多次 observe：两个回调各自更新', async () => {
		await scrollToAndWait(820)
		expect(await textOf('#result-c1')).toContain('隐藏')
		expect(await textOf('#result-c2')).toContain('显示')

		await scrollToAndWait(200)
		expect(await textOf('#result-c1')).toContain('显示')
	})
})
