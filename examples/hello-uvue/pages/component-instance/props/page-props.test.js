const isDom2 = process.env.UNI_APP_X_DOM2 === 'true'

const platformInfo = process.env.uniTestPlatformInfo.toLocaleLowerCase()
const isMP = platformInfo.startsWith('mp')

const HOME_PAGE_PATH = '/pages/index/index'
const MAIN_PAGE_PATH = '/pages/component-instance/props/page-props?name=page-props'
const OPTIONS_PAGE_PATH = '/pages/component-instance/props/page-props-options'
const COMPOSITION_PAGE_PATH = '/pages/component-instance/props/page-props-composition'

describe('page props', () => {
	let page, originLifecycleNum
	it('page as component', async () => {
		page = await program.reLaunch(HOME_PAGE_PATH)
		page.waitFor('view')
		originLifecycleNum = await page.callMethod('pageGetLifeCycleNum')
		await page.callMethod('pageSetLifeCycleNum', 0)

    page = await program.reLaunch(MAIN_PAGE_PATH)
		page.waitFor('view')

		if (!isDom2) {
			const optionsPage = await page.$('.page-props-options-component')

			const optionsTitle =  await optionsPage.$('#page-props-options-title');
			expect(await optionsTitle.text()).toBe('page-props-options')

			const optionsFrom =  await optionsPage.$('#page-props-options-from');
			expect(await optionsFrom.text()).toBe('page')

			const optionsNumber =  await optionsPage.$('#page-props-options-number');
			expect(await optionsNumber.text()).toBe('10')

			const optionsBoolean =  await optionsPage.$('#page-props-options-boolean');
			expect(await optionsBoolean.text()).toBe('true')

			const optionsObject =  await optionsPage.$('#page-props-options-object');
			expect(await optionsObject.text()).toBe('{"c":10,"d":20}')

			const optionsArray =  await optionsPage.$('#page-props-options-array');
			expect(await optionsArray.text()).toBe('[4,5,6]')
		}

		const compositionPage = await page.$('.page-props-composition-component')

		const compositionTitle =  await compositionPage.$('#page-props-composition-title');
		expect(await compositionTitle.text()).toBe('page-props-composition')

		const compositionFrom =  await compositionPage.$('#page-props-composition-from');
		expect(await compositionFrom.text()).toBe('page')

		const compositionNumber =  await compositionPage.$('#page-props-composition-number');
		expect(await compositionNumber.text()).toBe('10')

		const compositionBoolean =  await compositionPage.$('#page-props-composition-boolean');
		expect(await compositionBoolean.text()).toBe('true')

		const compositionObject =  await compositionPage.$('#page-props-composition-object');
		expect(await compositionObject.text()).toBe('{"c":10,"d":20}')

		const compositionArray =  await compositionPage.$('#page-props-composition-array');
		expect(await compositionArray.text()).toBe('[4,5,6]')

		const lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')
		if (isMP) {
			// options before create 1
			// options created 1
			// options before mount 1
			// options mounted 1
			// composition before mount 1
			// composition mounted 1
			// composition onLoad 15
			// composition onPageShow 10
			// composition onPageReady 10
			expect(lifeCycleNum).toBe(isDom2 ? 37 : 41)
		} else {
			// options before create 1
			// options created 1
			// options before mount 1
			// options mounted 1
			// composition before mount 1
			// composition mounted 1
			// composition onLoad 15
			// composition onPageShow 10
			// composition onPageReady 未触发
			expect(lifeCycleNum).toBe(isDom2 ? 27 : 31)
		}

		await page.callMethod('pageSetLifeCycleNum', 0)
	})

	const test = async (pageType) => {
		const goOptionsPageBtn = await page.$(`#go-${pageType}-page`)
		await goOptionsPageBtn.tap()
		await page.waitFor(1000)
		page = await program.currentPage()
		page.waitFor('view')

		const optionsTitle =  await page.$(`#page-props-${pageType}-title`);
		expect(await optionsTitle.text()).toBe(`page-props-${pageType}`)

		const optionsFrom =  await page.$(`#page-props-${pageType}-from`);
		expect(await optionsFrom.text()).toBe('page-navigateTo')

		const optionsNumber =  await page.$(`#page-props-${pageType}-number`);
		expect(await optionsNumber.text()).toBe('1')

		const optionsBoolean =  await page.$(`#page-props-${pageType}-boolean`);
		expect(await optionsBoolean.text()).toBe('false')

		const optionsObject =  await page.$(`#page-props-${pageType}-object`);
		expect(await optionsObject.text()).toBe(pageType == 'options' ? '{"a":1,"b":2}' : '{"a":"a","b":"b"}')

		const optionsArray =  await page.$(`#page-props-${pageType}-array`);
		expect(await optionsArray.text()).toBe(pageType == 'options' ? '[1,2,3]' : '["a","b","c"]')

		let lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')

		// composition onHide 10
			// options before create 1
			// options created 1
			// options before mount 1
			// options mounted 1
			// options onLoad 10
			// options onShow 10
			// options onReady 10
			expect(lifeCycleNum).toBe(pageType == 'options' ? 44 : 42)

			await page.callMethod('pageSetLifeCycleNum', 0)

			page = await program.navigateBack()
			await page.waitFor('view')

			lifeCycleNum = await page.callMethod('pageGetLifeCycleNum')
			// options before unmount 1
			// options unmounted 1
			// options onUnload 10
			// composition onShow 10
			expect(lifeCycleNum).toBe(22)
			await page.callMethod('pageSetLifeCycleNum', 0)
	}
	if (!isDom2) {
		it('page props 选项式 API', async () => {
			await test('options')
		})
	}
	it('page props 组合式 API', async () => {
		await test('composition')
	})

	afterAll(async () => {
		page = await program.reLaunch(HOME_PAGE_PATH)
		await page.waitFor('view')

		await page.callMethod('pageSetLifeCycleNum', originLifecycleNum)
	})
})
